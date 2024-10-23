const Promise = require('bluebird');
const Config = require('./libs/config');
const memcached = require('./libs/memcached/memcachedPromises');

// Middleware для общего кода
module.exports.commonMW = async (req, res, next) => {

    // Если включено кеширование страниц
    if (Config.cachePages) {
        // Генерируем ключ для кеша на основе URL
        res.locals.templateKey = Config.memcached.templatePrefix + (req.originalUrl || req.url);

        try {
            // Пытаемся получить кешированную версию страницы
            res.locals.cachedBody = await memcached.prGet(res.locals.templateKey);

            // Если кеш найден, пропускаем дальше
            if (res.locals.cachedBody) {
                return next();
            }
        } catch (e) {
            // В случае ошибки в мемкеш — продолжаем без него
            console.error(e.stack);
        }
    }

    // Если кеша нет или он отключён — загружаем общие переменные
    await setCommonVars(res);

    // Продолжаем выполнение
    next();
};

// Функция для установки общих переменных
async function setCommonVars(res) {
    // Симуляция медленной операции (например, обращение к базе данных или API)
    await Promise.delay(500);

    // Установка общих переменных для всех страниц
    res.locals.page = '';
    res.locals.title = 'Error page';  // Это значение может быть переопределено в контроллере
    res.locals.fullYear = new Date().getFullYear();

    // Главное меню для навигации
    res.locals.mainMenu = [
        { page: 'main', url: '/', text: 'Home' },
        { page: 'about', url: '/about', text: 'About' },
        { page: 'notfound', url: '/notfound', text: 'Not found' },
        { page: 'error', url: '/error', text: 'Error' }
    ];
}

const Promise = require('bluebird');

exports.get = async (req, res, next) => {

    res.locals.page = 'main';
    res.locals.title = 'Memcached demo by #Blondiecode';
    // Определяем переменные, которые передаем в шаблон
    const buttons = [{ img: '/images/cat.jpg', alt: 'big cat' }];

    //Sloooow operation
    await Promise.delay(2000);
    res.render('./main', { buttons });
};

exports.post = async (req, res) => {
    res.send('Hello!');
};
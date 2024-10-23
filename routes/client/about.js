
const Promise = require('bluebird');

exports.get = async (req, res, next) => {

    res.locals.page = 'about';
    res.locals.title = 'About page';

    // Определяем переменные, которые передаем в шаблон
    const buttons = [
        {img: '/images/mad-1.jpg', alt: 'super cat'},
        {img: '/images/mad-2.jpg', alt: 'cute cat'}
    ];
    
    //Sloooow operation
    await Promise.delay(2000);

    // Передаем buttons напрямую через res.render
    res.render('./about', { buttons });
};
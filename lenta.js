const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');
const News = require('./models/News');
const router = express.Router()

const parseNewsLenta = (html, section) =>{
    let allNews =[];
    const $ = cheerio.load(html);
    const title = $('title').slice(2);//Заголовок новости
    const article = $('description').slice(1);//тело новости
    for(let i = 0; i< title.length; i++){
        const trimArticle =  article.eq(i).html().slice(16, -8)
        allNews.push(new News(section, title.eq(i).text(), trimArticle));
    }
    return allNews;
}


router.get('/science', (req, res, next)=>{
    
    axios.get('https://lenta.ru/rss/news/science.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsLenta(response.data, 'Наука и технологии')
        }
    })
    .then((parsedData)=>{
        res.status(200).send(parsedData)
    })
    .catch((err)=>{
        res.send(err)
    })

})

router.get('/sport', (req, res, next)=>{
    
    axios.get('https://lenta.ru/rss/news/sport.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsLenta(response.data, 'Спорт')
        }
    })
    .then((parsedData)=>{
        res.status(200).send(parsedData)
    })
    .catch((err)=>{
        res.send(err)
    })

})

router.get('/business', (req, res, next)=>{
    axios.get('https://lenta.ru/rss/news/economics')
    .then((response)=>{
        if(response.data){
            return parseNewsLenta(response.data, 'Бизнес')
        }
    })
    .then((parsedData)=>{
        res.status(200).send(parsedData)
    })
    .catch((err)=>{
        res.send(err)
    })

})

router.get('/main', (req, res, next)=>{
    axios.get('https://lenta.ru/rss/top7.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsLenta(response.data, 'Главное')
        }
    })
    .then((parsedData)=>{
        res.status(200).send(parsedData)
    })
    .catch((err)=>{
        res.send(err)
    })

})

module.exports = router;


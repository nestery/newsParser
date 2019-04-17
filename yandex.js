const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');
const News = require('./models/News');
const router = express.Router()

const parseNewsYandex = (html, section) =>{
    let allNews =[];
    const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            allNews.push(new News(section, title.eq(i).text(), article.eq(i).text()));
        }
    return allNews;
}



router.get('/science', (req, res, next)=>{
    
    axios.get('https://news.yandex.ru/science.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsYandex(response.data, 'Наука и технологии')
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
    
    axios.get('https://news.yandex.ru/sport.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsYandex(response.data, 'Спорт')
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
    
    axios.get('https://news.yandex.ru/business.rss')
    .then((response)=>{
        if(response.data){
            return parseNewsYandex(response.data, 'Бизнес')
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
    
    axios.get('https://news.yandex.ru/index.rss')
        .then((response)=>{
            if(response.data){
                return parseNewsYandex(response.data, 'Главное')
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



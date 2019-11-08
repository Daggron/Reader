const router = require('express').Router();
const Articles = require('../models/articles.models');

router.route('/:id',(req,res)=>{
    Articles.find({authorProfile:req.params.id})
    .then(article=>{
        
            return {
                id:article._id,
                author:article.author,
                title : article.title,
                description : article.description,
                authorProfile : article.authorProfile,
                Date : article.Date,
                likes : article.likes,
                category:article.category
            }
        
    })
    .then(articles=>{
        res.json(articles);
    })
    .catch(err=>{
        return res.json('Their was a glitch in the matrix'+err);
    })
});

module.exports = router;
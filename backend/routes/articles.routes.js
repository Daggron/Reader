const router = require('express').Router();
const Articles = require('../models/articles.models');
const { auth } = require('../routes/auth/isAuthenticated.routes');

router.route('/data').get(async (req,res)=>{
    let response = await Articles.find({});

    let articles = await response.map(article =>{
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
    });

    return res.json(articles);
});

router.route('/post').post(auth , (req,res)=>{
    let article = new Articles();
    article.title = req.body.title;
    article.description = req.body.description;
    article.author = res.locals.user.name;
    article.authorProfile = res.locals.user._id;
    article.category = req.body.category;

    Articles.create(article)
    .then(()=>{
        res.json('Article added successfully');
    })
    .catch(err=>{
        return res.status(401).json('Their was an error while posting the article '+err);
    })
});

router.route('id/:id').get((req,res)=>{
     Articles.findById(req.params.id)
     .then(response =>{
        res.json(response);
     })
     .catch(err=>{
         res.status(401).json('There was an error'+err);
     })
    
});

router.route('/category/:category').get((req,res)=>{
    Articles.find({category:req.params.category})
    .then(data=>data.map(article =>{
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
    }))
    .then(articles=>{
        return res.json(articles);
    })
    .catch(err=>{
        return res.status(401).json('There was an error'+err);
    })
});



module.exports = router;
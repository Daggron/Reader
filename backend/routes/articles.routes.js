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
    
    const regex = new RegExp(escapeRegex(req.params.category), 'gi');

    Articles.find({category:regex})
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



router.route('/delete/:id').delete((req,res)=>{
    Articles.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json('Article delted successfully');
    })
});

router.route('/edit/:id').post(async (req,res)=>{
    let article = await Articles.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.category = req.body.category;
    article.save();
    res.json('Article updated successfully');
});



// save user to req.session so that it can be used
// make category routes
// make push notification 
// make subscribe for news letters

const escapeRegex = (text)=> {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
const router = require('express').Router();
const Categories = require('../models/category.models');

router.route('/get').get(async (req,res)=>{
    Categories.find({})
    .then(category=>{
        res.json(category);
    })
    .catch(err=>{
        res.json(`Their was a glitch in the matrix ${err}`);
    });

});

router.route('/add').post(async (req,res)=>{
    let category = new Categories();
    category.name = req.body.name;
    Categories.create(category)
    .then(()=>{
        return res.json('Category added successfully')
    })
    .catch(err=>{
        return res.json('Their is a glitch in the matrix'+err);
    })
});

router.route('delete/:id').delete((req,res)=>{
    Categories.findByIdAndDelete(req.params.id)
    .then(()=>{
        return res.json(`Category deleted successfully`)
    })
    .catch(err=>{
        return res.json(`Their was a glitch in the matrix`);
    })
})

module.exports = router;
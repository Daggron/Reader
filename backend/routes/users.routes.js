const router = require('express').Router();

router.route('/').get((req,res)=>{
    res.json('Hello User i am working fine');
});

router.route('/get').get((req,res)=>{
    res.send("Hello This is professional level standard");
});

module.exports = router;
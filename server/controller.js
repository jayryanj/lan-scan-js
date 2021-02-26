const router = require('express').Router();
const { request, response } = require('express');
const scan = require('./scanner');


router.get('/' , (request, response) => {
    response.status(200).json({message: "Hello, thank you for using lan-scanner-js"});
});

router.get('/scan', (request, response) => {
    console.log("Entered /api/scan");
    scan()
    .then(results => {
        let alive = results.filter(obj => obj.status == 'fulfilled').map(obj => {return obj.value})
        console.log(alive);
        response.status(200).json({hosts: alive})
    })
    .catch(error => {console.log(error)})

    
});

module.exports = router;
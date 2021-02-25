const router = require('express').Router();
const { request, response } = require('express');
const scan = require('./scanner');


router.get('/' , (request, response) => {
    response.status(200).json({message: "Hello, thank you for using lan-scanner-js"});
});

router.get('/scan', (request, response) => {
    scan()
        .then(hosts => {
            response.status(200).json(hosts);
        })
});

module.exports = router;
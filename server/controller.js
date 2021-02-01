const router = require('express').Router();
const { request, response } = require('express');


router.get('/' , (request, response) => {
    response.status(200).json({message: "Hello, thank you for using lan-scanner-js"});
});

router.get('/scan', (request, response) => {
    // Call the scanner module
});

module.exports = router;
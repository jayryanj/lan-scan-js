/**
 *  There is no .env file for now. 
 *  process.env values are in case the project--for whatever reason--is deployed (but I doubt it)
 *  Otherwise, you may configure port here.
 */
module.exports = config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000
}


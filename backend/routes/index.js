const siteRouter = require('./site');

function route(app) {

    
    // Always final
    app.use('/', siteRouter);
}

module.exports = route;

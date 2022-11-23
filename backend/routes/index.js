const siteRouter = require('./site');
const componentRouter = require('./component');

function route(app) {
    
    app.use('/component', componentRouter);
    
    // Always final
    app.use('/', siteRouter);
}

module.exports = route;

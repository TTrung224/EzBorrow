const AccountRouter = require('./account');
const ComponentRouter = require('./component');
const RequestRouter = require('./request');

function route(app) {
    
    app.use('/component', ComponentRouter);
    app.use('/account', AccountRouter);
    app.use('/request', RequestRouter);
}

module.exports = route;

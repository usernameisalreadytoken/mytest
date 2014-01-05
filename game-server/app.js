var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatTest');

app.configure('development|production',function(){

    app.route('chat',function (session, msg, app, cb){
        var areas = app.getServersByType('chat');
        cb(null, areas[0].id);

    });

//    app.filter(pomelo.timeout());

    app.set('connectorConfig',{
        connector : pomelo.connectors.hybridconnector,
        useDict:true,
        useProtobuf:true
    });

    app.set('errorHandler',function (err,msg,resp,session,next){
        console.log(err, msg, resp, session);
        next();

    });
});
// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});

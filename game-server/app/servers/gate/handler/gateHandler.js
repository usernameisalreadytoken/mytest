/**
 * Created by root on 14-1-3.
 */

module.exports = function (app){
    return new Handler(app);
}

var Handler = function (app){
    this.app = app;
}


var handler = Handler.prototype;


handler.queryEntry = function (msg,sission,next){
    var uid = msg.uid;
    if(!uid) {
        next(null, {
            code: 500,
            message: '请先登陆再连接'
        });
        return;
    }

    var connectors = this.app.getServersByType('connector');
    if(!connectors || connectors.length == 0){
        next(null,{code:500,message:'没有可用的connector'});
        return;
    }
    var res = dispacth(msg.uid,connectors);
    next(null, {
        code:200,
        host:res.host,
        port:res.port

    });

}
var crc = require('crc');

var dispacth = function (uid,connectors){
    var index = Math.abs(crc.crc32(uid)) % connectors.length;
    return connectors[index];
}
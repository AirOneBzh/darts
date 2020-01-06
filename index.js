module.exports = function(server,con,path,fs,dir) {
    server.get('/', function (request, response) {
        response.sendFile(dir + '/index.html');
    });
};
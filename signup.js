module.exports = function(server,con,path,fs,dir) {

    server.get('/signup', function (req, res) {
        res.sendFile(dir + '/signup.html');
    });
};
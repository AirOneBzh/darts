module.exports = function(server,con,path,fs,dir) {

    server.get('/profile', function (req, res) {
        res.sendFile(dir + '/profile.html');
    });
};
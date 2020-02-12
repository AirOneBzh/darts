module.exports = function(server,con,path,fs,dir) {
    server.get('/game', function (req, res) {
        res.sendFile(dir+"/game.html")

    })
};

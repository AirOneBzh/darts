module.exports = function(server,con,path,fs,dir) {
    server.get('/games', function (req, res) {
        res.sendFile(dir+"/games.html")
    })

};
module.exports = function(server,con,path,fs,dir) {
    server.get('/newgame', function (req, res) {
        res.sendFile(dir + '/newgame.html');
    });

    server.post('/newgame', function (req, res) {
        var arr = req.body;
        console.log(arr);
        for (var prop in arr) {
            if(prop !="name" && prop !="gamemode"){
                res.write("Joueur "+prop+" rejoint  ;\n")
            }
            else{
                res.write(prop + " " + arr[prop])
            }
        }

        res.end();
    });
};
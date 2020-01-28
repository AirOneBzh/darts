module.exports = function(server,con,path,fs,dir) {
    server.get('/newgame', function (req, res) {
        res.sendFile(dir + '/newgame.html');
    });

    server.post('/newgame', function (req, res) {
        var arr = req.body;
        var name;
        var players = [];
        var gamemode;
        console.log(arr);
        for (var prop in arr) {
            if (prop != "name" && prop != "gamemode") {
                res.write("Joueure " + prop + " rejoint  ;\n")
                players.push(prop)
            } else if (prop == "name") {
                res.write(prop + " " + arr[prop])
                name = arr[prop];
            } else if (prop == "gamemode") {
                res.write(prop + " " + arr[prop])
                gamemode = arr[prop];
            } else {
                res.write("non reconnu, " + prop + ":" + arr[prop])

            }

        }

        var sql = "SELECT id from (SELECT id,group_concat(player) as players from playerSet group by id) v1 where players ='" + players.toString() + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("PlayerSet #1 " + result[0].id);
            if (result.length == 1) {
                var sql = "INSERT INTO game (name, id_playerSet,id_gamemode) VALUES ('" + name + "'," + result[0].id + "," + gamemode + ")";
                con.query(sql, function (err, result) {
                    if (err) throw err
                    var sql = "SELECT LAST_INSERT_ID() as last";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("Create game #1 " + result[0].last)
                        res.redirect("/game/"+result[0].last)
                    });
                });
            } else {
                var sql = "SELECT Max(id) as max from playerSet ;";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("NewPlayerSet = " + (result[0].max + 1))
                    var sql = "INSERT INTO playerSet (id,player) VALUES (" + (result[0].max + 1) + ",?)";
                    players.forEach((element) => {
                        con.query(sql, element, function (err, result) {
                            if (err) throw err;
                            var sql = "SELECT id from (SELECT id,group_concat(player) as players from playerSet group by id) v1 where players ='" + players.toString() + "';";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("PlayerSet #2 " + result);
                                if (result.length == 1) {
                                    var sql = "INSERT INTO game (name, id_playerSet,id_gamemode) VALUES ('" + name + "'," + result[0].id + "," + gamemode + ")";
                                    console.log(sql)
                                    con.query(sql, function (err, result) {
                                        if (err) throw err;
                                        var sql = "SELECT LAST_INSERT_ID() as last";
                                        con.query(sql, function (err, result) {
                                            if (err) throw err;
                                            console.log("Create game #2 " + result[0].last)
                                            res.redirect("/game/"+result[0].last)
                                        });
                                    });
                                }
                            });
                        })
                    });
                });
            }
        });
    })
};

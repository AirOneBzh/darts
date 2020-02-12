module.exports = function(server,con,path,fs,dir) {


    function imgExi(id, ext) {
        return fs.existsSync(__dirname + "/html/images/" + id + "." + ext);
    }
    server.get('/api/players', (req, res) => {

        con.query('SELECT id,name,email from users;', null, function (err, result) {
            res.contentType('application/json');
            res.end(JSON.stringify(result))
        });
    });
    server.get('/api/player/:id/', (req, res) => {
        let id = req.params.id;
        let url = 'SELECT id,name,email from users where id=' + id + ';';
        con.query(url, null, function (err, result) {
            res.contentType('application/json');
            let r = JSON.stringify(result[0]);
            res.end(r)
        });
    });

    server.get('/api/check/playername/:name/', (req, res) => {
        let name = req.params.name;
        console.log(name)
        let url = 'SELECT count(id) as ans from users where name="' + name + '";';
        con.query(url, null, function (err, result) {
            res.contentType('application/json');
            let r = JSON.stringify(result[0]);
            res.end(r)
        });
    });
    server.get('/api/check/playermail/:mail/', (req, res) => {
        let mail = req.params.mail;
        console.log(mail)

        let url = 'SELECT count(id) as ans from users where email="' + mail + '";';
        con.query(url, null, function (err, result) {
            res.contentType('application/json');
            let r = JSON.stringify(result[0]);
            res.end(r)
        });
    });

    server.get('/api/player/:id/name', (req, res) => {
        let id = req.params.id;
        con.query('SELECT name from users where id=' + id + ';', null, function (err, result) {
            res.end(result[0].name)
        });
    });

    server.get('/api/games', (req, res) => {
        let id = req.params.id;
        con.query("SELECT concat('[',GROUP_CONCAT(concat('{`game_id`:',game_id,',`game_name`:`',game_name,'`,`gamemode`:`',gamemode,'`,`players`:[',players,']}')),']') as json from (SELECT game.id as 'game_id', game.name as 'game_name', gamemode.name as 'gamemode', group_concat(concat('{`id`:`',users.id,'`,`name`:`',users.name,'`}')) players from users, game, gamemode, playerSet where game.id_gamemode = gamemode.id and game.id_playerSet = playerSet.id and users.id = playerSet.player group by game_id order by game_id asc) as j", null, function (err, result) {
            res.contentType('application/json');

            if(result[0].json!=null) {
                res.write(JSON.stringify(JSON.parse(result[0].json.replace(/`/g, '"'))));
            }else{
                console.log(result[0]);
            }
            console.log("games");
            res.end()
        });
    });

    server.get('/api/game/:id', (req, res) => {
        let id = req.params.id;
        con.query("SELECT\n" +
            "                    CONCAT('[',\n" +
            "                            GROUP_CONCAT('{`game_id`:',\n" +
            "                                `darts4`.`game_id`,\n" +
            "                                ',`game_name`:`',\n" +
            "                                `darts4`.`game_name`,\n" +
            "                                '`,`gamemode`:`',\n" +
            "                                `darts4`.`gamemode`,\n" +
            "                                '`,`status`:`',\n" +
            "                                `darts4`.`status`,\n" +
            "                                '`,`players`:',\n" +
            "                                `darts4`.`players`,\n" +
            "                                '}'\n" +
            "                                ORDER BY `darts4`.`game_id` ASC\n" +
            "                                SEPARATOR ','),\n" +
            "                            ']') AS `json`\n" +
            "                FROM\n" +
            "                    (SELECT\n" +
            "                    `darts3`.`game_id` AS `game_id`,\n" +
            "                    `darts3`.`game_name` AS `game_name`,\n" +
            "                    `darts3`.`gamemode` AS `gamemode`,\n" +
            "                    `darts3`.`status` AS `status`,\n" +
            "                    CONCAT('[',\n" +
            "                            GROUP_CONCAT('{`user_id`:',\n" +
            "                                `darts3`.`user_id`,\n" +
            "                                ',`user_name`:`',\n" +
            "                                `darts3`.`user_name`,\n" +
            "                                '`,`rounds`:',\n" +
            "                                `darts3`.`rounds`,\n" +
            "                                '}'\n" +
            "                                ORDER BY `darts3`.`user_id` ASC\n" +
            "                                SEPARATOR ','),\n" +
            "                            ']') AS `players`\n" +
            "                FROM\n" +
            "                    (SELECT\n" +
            "                    `darts2`.`game_id` AS `game_id`,\n" +
            "                    `darts2`.`game_name` AS `game_name`,\n" +
            "                    `darts2`.`gamemode` AS `gamemode`,\n" +
            "                    `darts2`.`status` AS `status`,\n" +
            "                    `darts2`.`user_id` AS `user_id`,\n" +
            "                    `darts2`.`user_name` AS `user_name`,\n" +
            "                    CONCAT('[',\n" +
            "                            GROUP_CONCAT('{`round_id`:',\n" +
            "                                `darts2`.`round_id`,\n" +
            "                                ',`round_pts`:',\n" +
            "                                `darts2`.`round_pts`,\n" +
            "                                ',`coups`:',\n" +
            "                                `darts2`.`coups`,\n" +
            "                                '}'\n" +
            "                                ORDER BY `darts2`.`round_id` ASC\n" +
            "                                SEPARATOR ','),\n" +
            "                            ']') AS `rounds`\n" +
            "                FROM\n" +
            "                    (SELECT\n" +
            "                    `darts1`.`game_id` AS `game_id`,\n" +
            "                    `darts1`.`game_name` AS `game_name`,\n" +
            "                    `darts1`.`gamemode` AS `gamemode`,\n" +
            "                    `darts1`.`status` AS `status`,\n" +
            "                    `darts1`.`user_id` AS `user_id`,\n" +
            "                    `darts1`.`user_name` AS `user_name`,\n" +
            "                    `darts1`.`round_id` AS `round_id`,\n" +
            "                    `darts1`.`round_pts` AS `round_pts`,\n" +
            "                    CONCAT('[',\n" +
            "                            GROUP_CONCAT('{`id_coup`:',\n" +
            "                                `darts1`.`id_coup`,\n" +
            "                                ',`zone`:',\n" +
            "                                `darts1`.`zone`,\n" +
            "                                ',`mult`:',\n" +
            "                                `darts1`.`mult`,\n" +
            "                                '}'\n" +
            "                                ORDER BY `darts1`.`id_coup` ASC\n" +
            "                                SEPARATOR ','),\n" +
            "                            ']') AS `coups`\n" +
            "                FROM\n" +
            "                    (SELECT\n" +
            "                    `game`.`id` AS `game_id`,\n" +
            "                    `game`.`name` AS `game_name`,\n" +
            "                    `gamemode`.`name` AS `gamemode`,\n" +
            "                    `game`.`status` AS `status`,\n" +
            "                    `users`.`id` AS `user_id`,\n" +
            "                    `users`.`name` AS `user_name`,\n" +
            "                    `round`.`id` AS `round_id`,\n" +
            "                    `round`.`pts` AS `round_pts`,\n" +
            "                    `round`.`dart` AS `round_dart`,\n" +
            "                    `dartzones`.`id_coup` AS `id_coup`,\n" +
            "                    `dartzones`.`zone` AS `zone`,\n" +
            "                    `dartzones`.`mult` AS `mult`\n" +
            "                FROM\n" +
            "                    (((((`dartzones`\n" +
            "                    JOIN `gamemode`)\n" +
            "                    JOIN `game`)\n" +
            "                    JOIN `users`)\n" +
            "                    JOIN `round`)\n" +
            "                    JOIN `playerSet`)\n" +
            "                WHERE\n" +
            "                    `game`.`id` = `round`.`id_game`\n" +
            "                        AND `round`.`player` = `users`.`id`\n" +
            "                        AND `round`.`id` = `dartzones`.`id`\n" +
            "                        AND `game`.`id_gamemode` = `gamemode`.`id`\n" +
            "                        AND `game`.`id_playerSet` = `playerSet`.`id`\n" +
            "                        AND `users`.`id` = `playerSet`.`player`\n" +
            "                        AND `game`.`id` = ?\n" +
            "                ORDER BY `game`.`id` , `users`.`id` , `round`.`id` , `dartzones`.`id_coup`) darts1\n" +
            "                GROUP BY `darts1`.`game_id` , `darts1`.`user_id` , `darts1`.`round_id`\n" +
            "                ORDER BY `darts1`.`game_id` , `darts1`.`user_id` , `darts1`.`round_id`) darts2\n" +
            "                GROUP BY `darts2`.`game_id` , `darts2`.`user_id`\n" +
            "                ORDER BY `darts2`.`game_id` , `darts2`.`user_id`) darts3\n" +
            "                GROUP BY `darts3`.`game_id`\n" +
            "                ORDER BY `darts3`.`game_id`) darts4",id,(err,resfin)=>{
            res.contentType('application/json');
            if(err)throw err;
            console.log(resfin[0].json)
            if(resfin[0].json!=null) {
                res.write(JSON.stringify(JSON.parse(resfin[0].json.replace(/`/g, '"'))));
            }
            res.end()
        })
    });

    server.get('/api/gamemodes/', (req, res) => {
        con.query("SELECT * from gamemode;",null, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            res.write(JSON.stringify(result));
            res.end()
        });
    });

    server.get('/api/game/:id/players', (req, res) => {
        let id = req.params.id;
        con.query("SELECT users.id,users.name from users,playerSet,game where playerSet.player = users.id and playerSet.id = game.id_playerSet and game.id = ?;",id, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            res.write(JSON.stringify(result));
            res.end()
        });
    });

    server.get('/api/game/:id/player/:player', (req, res) => {
        let id = req.params.id;
        let player = req.params.player;
        con.query("SELECT round.id,round.pts,round.dart from round where id_game = "+id+" and player = "+player+";",null, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            res.write(JSON.stringify(result));
            res.end()
        });
    });

    server.get('/api/game/:id/player/:player/round/:round', (req, res) => {
        let id = req.params.id;
        let player = req.params.player;
        let round = req.params.round;

        con.query("SELECT id_coup,zone,mult from dartzones,round where id_game = "+id+" and player = "+player+" and dartzones.id = round.dart and round.id = "+round+";",{id,player,round}, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            res.write(JSON.stringify(result));
            res.end()
        });
    });


    server.get('/api/stats/zone/:id/player', (req, res) => {
        let id = req.params.id;
        con.query("SELECT concat('[',group_concat('{`user_id`:',user_id,',`user_name`:`',user_name,'`,`data`:[',json,']}' order by user_id),']') as json from (SELECT  user_id, user_name, group_concat('{`game_id`: ',game_id,',`rounds`:[' ,rounds,']}') json from (SELECT player as 'user_id',users.name as 'user_name',id_game as 'game_id', group_concat('',round.id,'' order by id_game,round.id ) as rounds from round,users where player= users.id and dart = ? group by id_game ,dart) rounds group by user_id) rounds",id, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            if(result[0].json!=null) {
                res.write(JSON.stringify(JSON.parse(result[0].json.replace(/`/g, '"'))));
            }
            res.end()
        });
    });

    server.get('/api/game/:id/player/:pid/points', (req, res) => {
        let id = req.params.id;
        let pid = req.params.pid;
        con.query("SELECT id_game,player,sum(pts) as pts from round where id_game = "+id+" and player = "+pid+";",id, function (err, result) {
            if(err)throw err;
            res.end(JSON.stringify(result[0].pts));
        });
    });

    server.get('/api/game/:id/player/:pid/round', (req, res) => {
        let id = req.params.id;
        let pid = req.params.pid;
        con.query("SELECT id_game,player,max(id) as maxR from round where id_game = "+id+" and player = "+pid+";",id, function (err, result) {
            if(err)throw err;
            res.end(JSON.stringify(result[0].maxR));
        });
    });

    //Stats
    server.get('/api/stats/zone/game', (req, res) => {
        con.query("SELECT * from users;",null, function (err, result) {
            res.contentType('application/json');
            if(err)throw err;
            res.write(JSON.stringify(result[0]));
            res.end()
        });
    });

    server.post("/api/signup",(req,res)=>{

    })

    server.get('/avatar/:id', function (req, res) {
        let id = req.params.id;
        if(id==0){
            res.sendFile(__dirname + "/html/images/default.png");
        }
        else {
            con.query("SELECT count(*) as count from users where id = ?;", id, function (err, result) {
                if (err) throw err;

                if (result[0].count == "1") {
                    if (imgExi(id, "jpg"))
                        res.sendFile(__dirname + "/html/images/" + id + ".jpg");
                    else if (imgExi(id, "png"))
                        res.sendFile(__dirname + "/html/images/" + id + ".png");
                    else if (imgExi(id, "jpeg"))
                        res.sendFile(__dirname + "/html/images/" + id + ".jpeg");
                    else res.sendFile(__dirname + "/html/images/default.png");
                } else {
                    res.sendStatus(404);
                }
            })
        }
    });

};
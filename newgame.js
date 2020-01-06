module.exports = function(server,con,path,fs,dir) {
    server.get('/newgame', function (req, res) {
        con.query("SELECT id,name from users;", null, (err, result) => {
            con.query("SELECT * from gamemode;", null, (err, result2) => {
                res.write('<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '\n' +
                    '<head>\n' +
                    '  <meta charset="utf-8">\n' +
                    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                    '  <!-- PAGE settings -->\n' +
                    '  <title>NewGame</title>\n' +
                    '  <!-- CSS dependencies -->\n' +
                    '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">\n' +
                    '  <link rel="stylesheet" href="colorful.css">\n' +
                    '  <link rel="stylesheet" href="assets/css/main.css">\n' +
                    '</head>\n' +
                    '\n' +
                    '<body>\n' +
                    '  <nav class="navbar navbar-dark bg-dark" style="opacity : 1;">\n' +
                    '    <div class="container d-flex justify-content-center"> <a class="navbar-brand" href="http://home.airone.ovh:88/">\n' +
                    '        <i class="fa d-inline fa-lg fa-circle-o"></i>\n' +
                    '        <b> Darts</b>\n' +
                    '      </a> </div>\n' +
                    '  </nav>\n' +
                    '  <div class="py-5 text-center">\n' +
                    '    <div class="container">\n' +
                    '      <div class="row">\n' +
                    '        <div class="mx-auto col-lg-8">\n' +
                    '          <h1>New game</h1>\n' +
                    '          <p class="mb-4">Une nouvelle partie?</p>\n' +
                    '          <form action="newgame" method="post" >\n' +
                    '            <div class="input-group" style="text-align: center">' +
                    '           <input type="name" class="input--style-3" name="name" style="text-align: center;background-color: #444;padding-left: 2%;border-radius: 5px;text-align: left;" id="name" placeholder="Nom"> </div>\n' +
                    '\n' +
                    '            <div class="input-group">\n' +
                    '                            <div class="rs-select2 js-select-simple select--no-search" style="width: 100%">\n' +
                    '                                <select name="gamemode">\n');
                result2.forEach((element, index) => {
                    res.write('<option value="'+element.id+'">'+element.name+'</option>')
                });
                res.write('</select>\n' +
                    '                                <div class="select-dropdown"></div>\n' +
                    '                            </div>\n' +
                    '                        </div>' +
                    '<div class="input-group">\n'              +
                    '            <div class="input-group">\n' +
                    '              <ul>\n');
                result.forEach((element, index) => {
                    res.write('<li>\n' +
                        '                  <input type="checkbox" name="' + element.id + '" id="cb' + element.id + '">\n' +
                        '                  <label for="cb' + element.id + '"> <figure><img src="avatar/' + element.id + '" title="' + element.name + '"><figcaption>' + element.name + '</figcaption></figure></label>\n' +
                        '                </li>')
                });

                res.write('\n' +
                    '              </ul>\n' +
                    '<button class="btn btn--pill btn--green" type="submit">Envoyer</button>\n' +
                    '            </div>\n' +
                    '          </form>\n' +
                    '        </div>\n' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="py-3">\n' +
                    '    <div class="container">\n' +
                    '      <div class="row">\n' +
                    '        <div class="col-md-12 text-center d-md-flex justify-content-between align-items-center">\n' +
                    '          <ul class="nav d-flex justify-content-center">\n' +
                    '            <li class="nav-item"> <a class="nav-link active" href="#">Home</a> </li>\n' +
                    '            <li class="nav-item"> <a class="nav-link" href="#">Features</a> </li>\n' +
                    '            <li class="nav-item"> <a class="nav-link" href="#">Pricing</a> </li>\n' +
                    '            <li class="nav-item"> <a class="nav-link" href="#">About</a> </li>\n' +
                    '          </ul>\n' +
                    '          <p class="mb-0 py-1">© 2014-2018 Pingendo. All rights reserved</p>\n' +
                    '        </div>\n' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  </body>\n' +
                    '\n' +
                    '</html>');
                res.end();
            })
        })
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
module.exports = function(server,con,path,fs,dir) {
    server.get('/newgame', function (req, res) {
        con.query("SELECT id,name from users;", null, (err, result) => {

            res.write('<!DOCTYPE html>\n' +
                '<html>\n' +
                '\n' +
                '<head>\n' +
                '  <meta charset="utf-8">\n' +
                '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                '  <!-- PAGE settings -->\n' +
                '  <link rel="icon" href="https://templates.pingendo.com/assets/Pingendo_favicon.ico">\n' +
                '  <title>NewGame</title>\n' +
                '  <meta name="description" content="Free Bootstrap 4 Pingendo Smke template single landing page team">\n' +
                '  <meta name="keywords" content="Pingendo smke free template bootstrap 4">\n' +
                '  <!-- CSS dependencies -->\n' +
                '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">\n' +
                '  <link rel="stylesheet" href="colorful.css">\n' +
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
                '          <form action="submit" method="post" >\n' +
                '            <div class="form-group" style="text-align: center"> <input type="name" class="myform" name="form7" id="form7" placeholder="Nom"> </div>\n' +
                '\n' +
                '            <div class="form-group">\n' +
                '              <select name="gamemode" class="form-control">\n' +
                '                <option class="" value="1">301</option>\n' +
                '                <option>Set auto fill options with db</option>\n' +
                '              </select>\n' +
                '            </div>\n' +
                '            <div class="form-group">\n' +
                '              <ul>\n')
            result.forEach((element, index) => {
                res.write('<li>\n' +
                    '                  <input type="checkbox" name="' + element.id + '" id="cb' + element.id + '">\n' +
                    '                  <label for="cb' + element.id + '"> <figure><img src="avatar/' + element.id + '" title="' + element.name + '"><figcaption>' + element.name + '</figcaption></figure></label>\n' +
                    '                </li>')
            })

            res.write('\n' +
                '              </ul>\n' +
                '\n' +
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
                '</html>')
            res.end();
        })

    });
}
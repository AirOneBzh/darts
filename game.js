module.exports = function(server,con,path,fs,dir) {
    server.get('/game/:id', function (req, res) {
            let id = req.params.id;
             res.write('<!DOCTYPE html>\n' +
                '<html>\n' +
                '\n' +
                '<head>\n' +
                '  <meta charset="utf-8">\n' +
                '  <title></title>\n' +
                '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">\n' +
                '  <link rel="stylesheet" href="https://static.pingendo.com/bootstrap/bootstrap-4.3.1.css">\n' +
                '  <link rel="stylesheet" href="/colorful.css">\n' +
                '  <script src="https://kit.fontawesome.com/3c23a7afa3.js" crossorigin="anonymous"></script>\n' +
                '  <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Comfortaa" />\n' +
                '</head>\n' +
                '\n' +
                '<body>\n' +
                '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >\n' +
                 '    <div class="container"> <a class="navbar-brand" href="/">\n' +
                 '        <i class="fa d-inline fa-lg fa-circle-o"></i>\n' +
                 '        <b> Darts</b>\n' +
                 '      </a> <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar11">\n' +
                 '        <span class="navbar-toggler-icon"></span>\n' +
                 '      </button>\n' +
                 '      <div class="collapse navbar-collapse" id="navbar11">\n' +
                 '        <ul class="navbar-nav mr-auto">\n' +
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">ID: </span><span id="navid">'+id+'</span> </li>\n' +
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">Name: </span><span id="navname"></span> </li>\n' +
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">Mode: </span><span id="navgamemode"></span> </li>\n' +
                 '        </ul>\n' +
                 '        <ul class="navbar-nav ml-auto">\n' +
                 '          <li class="nav-item m-1">' +
                 '              <a href="/api/game/1" id="asJSON"> As JSON' +
                 '              </a>' +
                 '          </li>\n' +
                 '          <li class="nav-item m-1">' +
                 '              <a href="#" onclick="refresh('+id+')"> Refresh' +
                 '              </a>' +
                 '          </li>\n' +
                 '        </ul>\n' +
                 '      </div>\n' +
                 '    </div>\n' +
                 '  </nav>' +
                 '<div class="text-center align-items-center d-flex" >\n' +
                 '<div class="container py-1" id="tab">\n ');

            res.write('</div>\n' +
                '      </div>\n' +
                '      </div>\n' +
                '  </div>');
            res.write('<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>\n' +
                '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>\n' +
                '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>\n' +
                '</body>\n' +
                '\n' +
                '</html>');

            res.write('<script src="/js/gameAsync.js"></script>');
            res.end();
        })



};

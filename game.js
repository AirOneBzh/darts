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
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">ID: </span><span id="navid"></span> </li>\n' +
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">Name: </span><span id="navname"></span> </li>\n' +
                 '          <li class="nav-item m-1" > <span style="color:#AAAAAA;font-size: 13px">Mode: </span><span id="navgamemode"></span> </li>\n' +
                 '        </ul>\n' +
                 '        <ul class="navbar-nav ml-auto">\n' +
                 '          <li class="nav-item m-1">' +
                 '              <a href="/api/game/1" id="asJSON"> As JSON' +
                 '              </a>' +
                 '          </li>\n' +
                 '          <li class="nav-item m-1">' +
                 '              <a href="" onclick="refresh()"> Refresh' +
                 '              </a>' +
                 '          </li>\n' +
                 '        </ul>\n' +
                 '      </div>\n' +
                 '    </div>\n' +
                 '  </nav>');
            res.write('<div class="py-5 text-center align-items-center d-flex" >\n' +
                '    <div class="container py-1" id="tab">\n' +
                '       <div class="row" style="border: 2px solid #bbb; border-radius: 10px;padding:20px ">' +
                '           <div class="game1" style="height: 100%;padding:0"><img src="/avatar/1" style="border-radius: 3px" height="100%" width="100%"> </div>' +
                '           <div class="game1"><h4 style="font-family: Multicolore;font-size: xx-large">Total</h4><span style="font-family: Multicolore;font-size: large">301</span></div>' +
                '           <div class="game1"><h4 style="font-family: Multicolore;font-size: xx-large">Round</h4><span style="font-family: Multicolore;font-size: large">1</span></div>' +
                '       ' +
                '               <div class="game2"><table><tr><td rowspan="2">p1</td><td>z1</td></tr><tr><td>m1</td></tr></table></div>' +
                '               <div class="game2"><table><tr><td rowspan="2">p2</td><td>z2</td></tr><tr><td>m2</td></tr></table></div>' +
                '               <div class="game2"><table><tr><td rowspan="2">p3</td><td>z3</td></tr><tr><td>m3</td></tr></table></div>' +
                '       </div>' );
            res.write('</div>\n' +
                '      </div>\n' +
                '  </div>')
            res.write('\n' +
                '\n' +
                '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>\n' +
                '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>\n' +
                '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>\n' +
                '</body>\n' +
                '\n' +
                '</html>');
            res.write('<script>document.title="Loading...";\n' +
                'function refresh() {\n' +
                '    var myRequest = new XMLHttpRequest();\n' +
                '    myRequest.open(\'GET\', \'/api/game/'+id+'\');\n' +
                '    myRequest.send(null);\n' +
                '    myRequest.onreadystatechange = function () { \n' +
                '    if (myRequest.readyState === 4) {\n' +
                '       let t = JSON.parse(myRequest.responseText)[0]\n' +
                '       let r ="";\n' +
                '       document.title="Darts: "+t.game_name;\n' +
                '       $("#navid").html(t.game_id);\n' +
                '       console.log(t.game_id);console.log(t);' +
                '       $("#navname").html(t.game_name); \n' +
                '       $("#navgamemode").html(t.gamemode); \n' +
                '      t.players.forEach((element)=>{' +
                '       r+=\'\';' +
                '       });\n' +
                '   }\n' +
                '}\n' +
                '}\n' +
                'refresh();\n' +
                '</script>');
            res.end();
        })



}

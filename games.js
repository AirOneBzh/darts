module.exports = function(server,con,path,fs,dir) {
    server.get('/games', function (req, res) {

        let head = fs.readFileSync(path.join(__dirname, path.join("html", "headdef.html")), {encoding: 'utf-8'});
        let foot = fs.readFileSync(path.join(__dirname, path.join("html", "footdef.html")), {encoding: 'utf-8'});
        res.write(head);
        res.write('<div class="py-5 text-center align-items-center d-flex" >\n' +
            '    <div class="container py-5" id="tab">\n');
        res.write('</div>\n' +
            '      </div>\n' +
            '  </div>');
        res.write(foot);
        res.write('<script>document.title="Last Games";' +
            '    $("#tab").html("Loading...");\n' +
            '    var myRequest = new XMLHttpRequest();\n' +
            '    myRequest.open(\'GET\', \'/api/games/\');\n' +
            '    myRequest.send(null);\n' +
            '    myRequest.onreadystatechange = function () { \n' +
            '       let r ="";\n' +
            '    if (myRequest.readyState === 4) {\n' +
            '       if(myRequest.responseText != ""){\n' +
            '       let t = JSON.parse(myRequest.responseText)\n' +

            '       t.forEach((element,index)=>{\n' +
            '           r+="<div class=\'row games\' style=\'padding: 10px 0px;margin-bottom: 10px;margin-top: 10px;\' onclick=\'document.location.href=\\\"/game/"+element.game_id+"\\\"\' >' +
            '           <div class=\'col-md-1\'>"+ element.game_id+"</div>' +
            '           <div class=\'col-md-1\'>"+ element.game_name+"</div>' +
            '           <div class=\'col-md-3\'>"+element.gamemode +"</div>' +
            '           <div class=\'col-md-4\'>"+ writePlayers(element.players)+"</div>' +
            '       </div>";\n' +
            '       }) \n' +
            '       console.log(r) \n' +
            '       } \n' +
            '    $("#tab").html(r);' +
            '}\n}\n' +
            'function writePlayers(players){\n' +
            '        let r= \'<ul style=\\\'padding:px;margin:0px\\\'>\';\n' +
            '        players.forEach((element,index)=>{\n' +
            '            r+= \'<li>\' +\n' +
            '                \'   <a  href="profile?id=\' + element.id + \'" >\' +\n' +
            '                \'       <label style=\\\"padding:0px;margin:0px;\\\"><img style=\\\'width:30px;height:30px;\\\' src="avatar/\' + element.id + \'" title="\' + element.name + \'">\' +\n' +
            '                \'   </a>\\n\' +\n' +
            '                \'</li>\'\n' +
            '        })\n' +
            '        return r+\'</ul>\';\n' +
            '    }' +
            '</script>');
        res.end();
    })


};
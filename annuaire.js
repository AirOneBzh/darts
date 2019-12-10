module.exports = function(server,con,path,fs,dir) {
    /*server.post('/submit',function(req,res){
        if(req.body.which == "player" ) {
            var p1 = req.body.name;
            var p2 = req.body.email;
            var p3 = req.body.password;
            newUser(p1,p2,p3);
        }else{
            var p1 = req.body.form7;
            console.log(p1);
        }
        res.sendFile(dir+'/profile.html');
    });
    */
    server.get('/annuaire', function (req, res) {
        con.query("SELECT * FROM users;", function (err, rows, fields) {
            if (err) {
                throw err;
            }
            let data = rows;
            let head = fs.readFileSync(path.join(__dirname, path.join("html", "headdef.html")), {encoding: 'utf-8'});
            let foot = fs.readFileSync(path.join(__dirname, path.join("html", "footdef.html")), {encoding: 'utf-8'});
            res.write(head);
            res.write('<div class="py-5 text-center align-items-center d-flex" >\n' +
                '    <div class="container py-5">\n' +
                '      <div class="row">\n' +
                '        <div class="col-md-8 mx-auto"> ');

            res.write("<ul>")
            rows.forEach((element, index) => {
                res.write('<li>' +
                    '   <a  href="profile?id=' + element.id + '" >' +
                    '       <figure style="text-align: center">' +
                    '           <label><img src="avatar/' + element.id + '" title="' + element.name + '">' +
                    '           <figcaption>' + element.name + '<br>Parties<br>Gagnées</figcaption></label>' +
                    '       </figure>' +
                    '   </a>\n' +
                    '</li>');
            })
            res.write('</div>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>')
            res.write(foot);
            res.write("</ul>")
            res.write(foot);
            res.end();
        });
    });
}
module.exports = function(server,con,path,fs,dir) {

    server.get('/profile', function (req, res) {
        let id = req.query.id;
        let head = fs.readFileSync(path.join(__dirname, path.join("html", "headdef.html")), {encoding: 'utf-8'});
        let foot = fs.readFileSync(path.join(__dirname, path.join("html", "footdef.html")), {encoding: 'utf-8'});
        res.write(head);
        res.write('<div class="py-5 text-center align-items-center d-flex" >\n' +
            '    <div class="container py-1">\n' +
            '      <div class="row">\n' +
            '        <div class="col-md-8 mx-auto"> ');
        res.write('<img class="avatar" width="20%" height="auto" src="avatar/' + id + '">');
        res.write('<h1 class="display-3 mb-4" id="name"></h1>');
        res.write('</div>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>')
        res.write(foot);
        res.write('<script>\n' +
            '    $("#name").html("Loading...");\n' +
            '    var myRequest = new XMLHttpRequest();\n' +
            '    myRequest.open(\'GET\', \'/api/player/' + id + '/name\');\n' +
            '    myRequest.send(null);' +
            '    myRequest.onreadystatechange = function () { \n' +
            '    if (myRequest.readyState === 4) {\n' +
            '        $("#name").html(myRequest.responseText)\n' +
            '    }\n}\n' +
            '</script>\n')
        res.end();
    });
}
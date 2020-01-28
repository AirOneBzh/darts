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
    server.get('/book', function (req, res) {
        res.sendFile(dir+"/book.html")
    });
};
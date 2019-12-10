module.exports = function(server,con,path,fs,dir) {

    var upload = multer({dest: 'html/'});

    server.post(
        "/submit",
        upload.single("file" /* name attribute of <file> element in your form */),
        (req, res) => {
            const name = req.body.name;
            const pass = req.body.password;
            const mail = req.body.email;


            let sql = "SELECT Count(id) as cid from users where email='" + mail + "'";
            con.query(sql, null, function (err, result, field) {
                if (err) throw err;
                nb = parseInt(result[0].cid);
                if (0 == nb) {
                    sql = "INSERT INTO users (name, email, password) VALUES ('" + name + "','" + mail + "','" + pass + "')";
                    con.query(sql, null, function (err, result) {
                        if (err) throw err;
                        console.log("1 user inserted");
                        sql = "SELECT id from users where email='" + mail + "'";
                        con.query(sql, null, function (err, result) {
                            if (err) throw err;
                            console.log(result);

                            if(req.file != undefined) {
                                const tempPath = req.file.path;
                                const targetPath = path.join(dir, path.join("images", result[0].id + path.extname(req.file.originalname).toLowerCase()));

                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpeg" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);

                                        res
                                            .status(200)
                                            .contentType("text/plain")
                                            .redirect("profile?id=" + result.id)
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err) return handleError(err, res);

                                        res
                                            .status(200)
                                            .contentType("text/plain")
                                            .end("Only .png and .jpeg files are allowed!" + req.file.originalname);
                                    });
                                }
                            }
                            else{
                                const targetPath = path.join(dir, path.join("images", result[0].id + '.png'));
                                fs.copyFile( path.join(dir, path.join("images",'default.png')), targetPath,(err)=>{
                                    if(err) throw err;
                                    console.log("file copied" + result[0].id)
                                })
                                res.redirect("profile?id=" + result[0].id)
                            }
                        })
                    });
                } else {
                    sql = "SELECT id from users where email='" + mail + "'";
                    con.query(sql, null, function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        res.redirect("profile?id=" + result[0].id);
                    })

                }
            });
        }
    );
}
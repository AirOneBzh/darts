function sendData(){
    encrypt()
    if($("#name").attr("border") === "red solid 1px"){
        console.log("Name wrong")
    }else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/signup");
        xhr.onload = function (event) {
            if (xhr.responseText === "0") {
                $("#msg").html( "Cet utilisateur existe déjà");
                $("#msg").attr("style","color:red")

            } else {
                window.location.replace("/profile?id=" + xhr.responseText);
            }
        };
        var formData = new FormData(document.getElementById("signup"));
        xhr.send(formData);
    }
}

function checkname(){
    let valid = 1
    if($('#name')[0].value === ""){
        $("#name").css("border","none")
    }else {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/check/playername/" + $('#name')[0].value, true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                let r = JSON.parse(xhr.responseText)

                if (r.ans === 1) {
                    valid = 0;
                }
                if (!valid) {
                    $("#name").css("border", "1px solid red")
                } else {
                    $("#name").css("border", "1px solid green")
                }
            }
        }
        xhr.send(null);
    }
}

function checkmail(){
    let valid = 1
    if($('#email')[0].value == ""){
        $("#email").css("border","none")

    }else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        valid = re.test(String($('#email')[0].value).toLowerCase());

        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/check/playermail/" + $('#email')[0].value, true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let r = JSON.parse(xhr.responseText)

                if (r.ans == 1) {
                    valid = 0;
                }
                if (!valid) {
                    $("#email").css("border", "1px solid red")
                } else {
                    $("#email").css("border", "1px solid green")
                }
            }
        }
        xhr.send(null);
    }
}

function validate() {
    checkmail()
    checkname()
    encrypt()
}

function encrypt()
{
    var pass=document.getElementById('password').value;
    var hide=document.getElementById('hide').value;
    if(pass=="")
    {
        $('#password').css("border","1px solid red")
        return false;
    }
    else
    {
        var hash = CryptoJS.MD5(pass);
        document.getElementById('hide').value=hash;
        return true;
    }
}


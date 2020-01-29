function sendData(img){
    encrypt()
    var xhr = new XMLHttpRequest();
    var url = "/api/signup"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(JSON.stringify(
        {
            name:$('#name')[0].value,email:$('#email')[0].value,password:$('#hide')[0].value,image:img
        }
    ));
}

function checkname(){
    let valid = 1
    if($('#name')[0].value == ""){
        $("#name").css("border","none")
    }else {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/check/playername/" + $('#name')[0].value, true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText)
                let r = JSON.parse(xhr.responseText)
                console.log(r.ans)
                if (r.ans == 1) {
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
        console.log("none")
    }else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        valid = re.test(String($('#email')[0].value).toLowerCase());
        console.log(re.test(String($('#email')[0].value).toLowerCase()))
        console.log(valid)
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/check/playermail/" + $('#email')[0].value, true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let r = JSON.parse(xhr.responseText)
                console.log(r.ans)
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
    Crop.result().then(function(res){document.getElementById("base").setAttribute(
        'src', res
    );})
}

function encrypt()
{
    console.log(document.getElementById('password').value)
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
        hide.value=hash;
        return true;
    }
}


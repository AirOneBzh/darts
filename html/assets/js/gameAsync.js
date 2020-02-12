document.title="Loading...";

function setup(id) {
    console.log(id)
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', '/api/game/'+id);
    myRequest.send(null);
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4) {
            let t = JSON.parse(myRequest.responseText)[0]

            document.title="Darts: "+t.game_name;
            $("#navid").html(t.game_id);
            console.log(t.game_id);console.log(t);
            $("#navname").html(t.game_name);
            $("#navgamemode").html(t.gamemode);
            var myRequest2 = new XMLHttpRequest();
            myRequest2.open('GET', '/api/game/'+id+'/players');
            myRequest2.send(null);
            myRequest2.onreadystatechange = function () {
                if (myRequest2.readyState === 4) {
                    let r ="";
                    let t = JSON.parse(myRequest2.responseText)
                    t.forEach((element,index)=>{
                        r+='       <div class="row" style="border: 1px solid #bbb; border-radius: 10px;padding:5px;margin: 15px 7px">' +
                            '           <div class="game1" style="height: 100%;padding:0">' +
                            '<a  href="/profile?id=' + element.id + '" >\n' +
                            '       <figure style="text-align: center"  style="border-radius: 3px" height="100%" width="100%">\n' +
                            '           <label style="border: none"><img src="/avatar/' + element.id + '">\n' +
                            '           <figcaption>' + element.name + '</figcaption></label>\n' +
                            '       </figure>\n' +
                            '  </a>' +
                            '</div>' +
                            '           <div class="game1"><h4 style="font-family: Multicolore;font-size: xx-large">Total</h4><span style="font-family: Multicolore;font-size: large" id="total'+element.id+'">301</span></div>' +
                            '           <div class="game1"><h4 style="font-family: Multicolore;font-size: xx-large">Round</h4><span style="font-family: Multicolore;font-size: large" id="round'+element.id+'">1</span></div>' +
                            '               <div class="game2"><table><tr><td rowspan="2" id="p'+element.id+'1">p1</td><td id="z'+element.id+'1">z1</td></tr><tr><td id="m'+element.id+'1">m1</td></tr></table></div>' +
                            '               <div class="game2"><table><tr><td rowspan="2" id="p'+element.id+'2">p2</td><td id="z'+element.id+'2">z2</td></tr><tr><td id="m'+element.id+'2">m2</td></tr></table></div>' +
                            '               <div class="game2"><table><tr><td rowspan="2" id="p'+element.id+'3">p3</td><td id="z'+element.id+'3">z3</td></tr><tr><td id="m'+element.id+'3">m3</td></tr></table></div>' +
                            '      </div>';
                    })
                    $("#tab").html(r);
                }
            }
        }
    }
}
function refresh(){
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', '/api/game/'+id+'/players');
    myRequest.send(null);
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4) {
            if (myRequest.responseText === "") {

            } else
            {
                let t = JSON.parse(myRequest.responseText)
                t.forEach((element) => {
                    var myRequest2 = new XMLHttpRequest();
                    myRequest2.open('GET', '/api/game/' + id + '/player/' + element.id + '/points');
                    myRequest2.send(null);
                    myRequest2.onreadystatechange = function () {
                        if (myRequest2.readyState === 4) {
                            console.log(myRequest2.responseText)
                            let rt;
                            if (myRequest2.responseText == 'null') {
                                rt = 0;
                            } else {
                                rt = myRequest2.responseText;
                            }
                            $("#total" + element.id).html(rt)
                            var myRequest3 = new XMLHttpRequest();
                            myRequest3.open('GET', '/api/game/' + id + '/player/' + element.id + '/round');
                            myRequest3.send(null);
                            myRequest3.onreadystatechange = function () {
                                if (myRequest3.readyState === 4) {
                                    let rr;
                                    if (myRequest3.responseText == 'null') {
                                        rr = 0;
                                    } else {
                                        rr = myRequest3.responseText;
                                    }
                                    $("#round" + element.id).html(rr)
                                    var myRequest4 = new XMLHttpRequest();
                                    myRequest4.open('GET', '/api/game/' + id + '/player/' + element.id + '/round/' + rr);
                                    myRequest4.send(null);
                                    myRequest4.onreadystatechange = function () {
                                        if (myRequest4.readyState === 4) {
                                            let tt = JSON.parse(myRequest4.responseText);
                                            $("#z" + element.id + "1").html(tt[0].zone)
                                            $("#m" + element.id + "1").html(tt[0].mult)
                                            $("#p" + element.id + "1").html(tt[0].zone * tt[0].mult)

                                            $("#z" + element.id + "2").html(tt[1].zone)
                                            $("#m" + element.id + "2").html(tt[1].mult)
                                            $("#p" + element.id + "2").html(tt[1].zone * tt[0].mult)

                                            $("#z" + element.id + "3").html(tt[2].zone)
                                            $("#m" + element.id + "3").html(tt[2].mult)
                                            $("#p" + element.id + "3").html(tt[2].zone * tt[2].mult)
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    }
}

let ida = $("#navid").html();
setup(ida)
refresh()


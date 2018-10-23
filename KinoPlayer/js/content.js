
var code = getCode(window.location.href);
function getCode(url) {
        var id = url.match(/[\d]+(?=\/$)/g)[0];
        if (/^\d+$/.test(id) == false) {
            return null;
        }
        var new_url = "https://cors.io/?http://moonwalk.cc/api/videos.json?kinopoisk_id="+id+"&api_token=6eb82f15e2d7c6cbb2fdcebd05a197a2"
        var xhr = new XMLHttpRequest();
        xhr.open('GET', new_url, false);
        xhr.send();
        if (xhr.status == 200) {
        	var data = JSON.parse(xhr.responseText);
        	// console.log(xhr.responseText);
            return data[0]['token'];
        }
        else{
        	return null;
        }
}

function buildPlayer(code) {
    console.log(chrome.extension.getURL("pages/player.html"));
    $.get(chrome.extension.getURL("pages/player.html"), function(data) {
        document.getElementsByTagName('html')[0].innerHTML=data.replace("videocode", code);
    });
}

window.onload = function() {
    $("#headerFilm h1").css("display","inline")
    var active = chrome.extension.getURL("icons/active.png");
    var inactive = chrome.extension.getURL("icons/inactive.png");
    if(code != null){
        var r= $('<a id="show_player" style="float: left; margin-right:10px;cursor: pointer;"><img src="'+active+'" align="middle" alt="Смотреть онлайн" style="width:32px;height:32px;"></a>');
        $("#headerFilm").append(r);
        $("#show_player").click(function(){buildPlayer(code);});
    }else{
        var r= $('<a id="show_player" style="float: left; margin-right:10px;cursor: pointer;"><img src="'+inactive+'" align="middle" alt="Фильм не найден" style="width:32px;height:32px;"></a>');
        $("#headerFilm").append(r);
        $("#show_player").click(function(){alert("Фильм не найден");});
    }
};
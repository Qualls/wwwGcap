
var level = 1;
var elementsCount = level;
var gamePosition = "#midle";
var timerId = "#timer";
var levelSec = 5;//10
var levelTime;//calculated
var interval;//fix
var acc = false;//quest accept, fix
var loses = 0;//current losses, fix
var ll = 3;//count losses to completely lose
var q = "%u041F%u043E%u043F%u0440%u043E%u0431%u043E%u0432%u0430%u0442%u044C%20%u0435%u0449%u0435%20%u0440%u0430%u0437%3F";


$(document).ready(function () {
    increaseLevel();
});

function updateElementsCount() {
    elementsCount = level;
}

function updateLevelTime() {
    levelTime = (levelSec + level) * 1000;
}

function increaseLevel() {
    level++;
    updateLevelTime();
    updateElementsCount();
    startLevel();
}

function startLevel() {
    $("#tab").remove();

    makeTableButtons(elementsCount, gamePosition);
    createTimer(level);

}

function makeTableButtons(count, positionId) {
    var rowLen = count;
    var tab = document.createElement("TABLE");
    tab.setAttribute("id", "tab");

    for (var i = 0; i < rowLen; i++) {
        var row = tab.insertRow();
        for (var j = 0; j < rowLen; j++) {
            var btnNum = j + i * rowLen + 1;
            var cell = row.insertCell();
            cell.innerHTML = '<button id="b' + btnNum + '" class = "unpr"></button>';
        }
    }

    $(positionId).append(tab);
    setBtnBehavior();
}

function setBtnBehavior() {
    $(".unpr").fastClick(function () {
        $(this).addClass("pr")
            .removeClass("unpr");
        // toggleClass("pr unpr");
        var win = checkWin();
        if (win) {
            clearInterval(interval);
            increaseLevel();
        }
    });

    function checkWin() {
        var prSize = $(".pr").length;
        return prSize == elementsCount * elementsCount;
    }
}
//timer
function createTimer(level) {

    var delay = 100;
    var val = levelTime;
    interval = setInterval(function () {
        val -= delay;
        var timerValue = Math.round(val / 1000);
        $(timerId).text(timerValue);
        if (timerValue == 0) {
            clearInterval(interval);
            if (loses >= ll) {

                 q = "%u0422%u044B%20%u0432%u044B%u0439%u0434%u0435" +
                     "%u0448%u044C%20%u0437%u0430%20%u043C%u0435" +
                     "%u043D%u044F%20%u0437%u0430%20%u043C%u0443%u0436%3F";
                acc = true;
                dialog(q);

            }
            else {
                dialog(q);
                loses++;
            }
        }
    }, delay);

}

function dialog(text) {
    text = unescape(text);
    $('<div></div>').appendTo(gamePosition)
        .html('<div><h6>' + text + '</h6></div>')
        .dialog({
            modal: true,
            width: 300,
            title: 'Время вышло',
            zIndex: 10000,
            autoOpen: true,
            resizable: false,
            buttons: {
                Да: function () {
                    doFunctionForYes(this);

                }
            },
            closeOnEscape: false,
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
            }
        });

    function doFunctionForYes(pointer) {
        if (acc) {
            $(".ui-dialog-buttonset")
                .find(".ui-button:first")
                .addClass("AccBtnStyle")
                .removeClass("ui-button")
        }
        else {
            startLevel();
            $(pointer).dialog("close");
        }
    }


}


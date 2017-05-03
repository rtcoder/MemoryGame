var memory = {
    size: 16, //the number of cards
    dataId: [], //array contain id's pairs
};
var i, remained = 0;//variable for remaining cardsvar

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function newgame() {
    $("#board, #win").hide();
    init(memory.size);
    $("#board").fadeIn();
}

function win() {
    $("#board").hide();
    $("#win").show();
}

function init(ile) {
    $("#board").removeAttr("class").addClass("x" + ile);

    var tmpArray = [];

    for (var i = 1; i <= ile / 2; i++) {
        tmpArray.push(i);
        tmpArray.push(i);
    }

    $("#board").empty();

    for (var i = 1; i <= ile; i++) {
        var randomKey = getRandomInt(0, tmpArray.length);

        $("#board").append('<div class="card shown" data-id="' + tmpArray[randomKey] + '"><div class="front" style="background-image:url(\'photos/' + tmpArray[randomKey] + '.png\')"></div><div class="back"></div></div>');

        tmpArray.splice(randomKey, 1);
    }

    $(".card").click(function () {
        $(this).toggleClass("current");

        i = $(".current").length;

        setTimeout(function () {
            if (i === 2) {//if are 2 opened cards
                $(".card.current").each(function () {
                    memory.dataId.push($(this).attr("data-id"));
                });

                if (memory.dataId[0] === memory.dataId[1]) {//checking if opened cards are the same
                    $(".current").addClass("hidden").removeClass("shown");
                }

                $(".card").removeClass("current");

                memory.dataId = [];
            } else if (i > 2) {
                $(".card").removeClass("current");
            }

            remained = $(".card.shown").length;

            if (remained === 0)
                win();
        }, 300);
    });
}
$(document).ready(function () {
    newgame();

    $("#newgame").click(newgame);
    $("select").change(function () {//select dificulty
        memory.size = $(this).val();
        newgame();
    });
})
        .bind("contextmenu", function (e) {//disable right click
            e.preventDefault();
        });

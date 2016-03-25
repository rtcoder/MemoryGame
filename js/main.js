var memory = {
	size       : 16,//the number of cards
	dataId     : [],//array contain id's pairs of cards
	ids        : []
};
var i;
var remained = 0;//variable for remaining cardsvar
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function newgame(){
	$("#board, #win").hide();
	$("#win").hide();
	init(memory.size);
	$("#board").fadeIn();
}
function win(){
	$("#board").hide();
	$("#win").show();
}
//initialize app
function init(ile){
	$("#board").removeClass("x16").removeClass("x24").removeClass("x30").addClass("x"+ile);
	memory.ids = [];
	for(var i=1;i<=ile/2;i++){
		memory.ids.push(i);
		memory.ids.push(i);
	}
	$("#board").empty();
	for(var i=1;i<=ile;i++){
		var dlugosc = memory.ids.length,
			losowyIndex = getRandomInt(0, dlugosc);

		$("#board").append('<div class="card shown" data-id="'+memory.ids[losowyIndex]+'"><div class="front" style="background:url(\'photos/'+memory.ids[losowyIndex]+'.png\')"></div><div class="back"></div></div>');

		memory.ids.splice(losowyIndex, 1);
	}
	$(".card").click(function(){
		i=0;
		$(this).toggleClass("current");
		$(".current").each(function(){//countig opened cards (max 2)
			i++;
		});
		setTimeout(function(){
			if(i === 2){//if are 2 opened cards
				$(".card.current").each(function(){
					memory.dataId.push($(this).attr("data-id"));
				});
				if(memory.dataId[0] === memory.dataId[1]){//checking if opened cards are the same
					$(".current").addClass("hidden").removeClass("shown");
				}
				$(".card").removeClass("current");
				memory.dataId = [];
			}else if(i>2){
				$(".card").removeClass("current");
			}
			remained = 0;
			$(".card.shown").each(function(){remained++;});//Counting the remaining cards
			if(remained === 0){
				win();
			}
		},300);
	});
}
$(document).ready(function(){
	newgame();

	$("#newgame").click(newgame);

	$("select").change(function(){//select dificulty
		memory.size = $(this).val();
		newgame();
	});
})
.bind("contextmenu", function(e){//disable right click
	e.preventDefault();
});

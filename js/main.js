var memory = {
	isPlay     : false,//bolean value game is started
	size       : 16,//the number of cards
	dataId     : [],//array contain id's pairs of cards
	ids        : [],
	countClick : 0,//number of mouse click on ".card"
	timeGame   : 0,//time of game [in seconds]
	pauseGame  : false//bolean value game is paused
};
var i;//auxiliary variable
var remained = 0;//variable for remaining cardsvar 
var timeOfGame;
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function resizer(){
	$("html, body, header, #gameField").css({ "width" : $(window).width() })
	$("html, body").css({ "height" : $(window).height() })
	$("#gameField").css({ "height" : $(window).height() - 50 })
	$("#Hello, #win").css({ "margin-left" : ($(window).width() - 440) / 2 + "px" })
	$("#board").css({ "margin-left" : ($(window).width() - $("#board").width()) / 2 + "px" })
}
function startCountingTime(){
	timeOfGame = setInterval(function(){
		if(!memory.pauseGame){
			memory.timeGame++
			$("#timeCounter .value").text( memory.timeGame )
		}
	},1000)
}
function stopCountingTime(){
	clearInterval(timeOfGame)//clear increase
}
function incClick(){
	if(!memory.pauseGame){
		memory.countClick++
		$("#clickCounter .value").text(memory.countClick)
	}
}
function resetTimeClick(){
	memory.timeGame = 0;//setting time to zero
	memory.countClick=0//setting number of clicks to zero
	$("#timeCounter .value").text(memory.timeGame)
	$("#clickCounter .value").text(memory.countClick)
}
function newgame(){
	memory.isPlay = true;//setting started game to true
	startCountingTime()
	resetTimeClick()
	$("#board, #stopgame, #pausegame").show()
	$("#Hello, #win, #newgame").hide()
	init(memory.size)
	resizer()
}
function stopgame(){
	resetTimeClick()
	memory.isPlay = false;//setting started game to true
	stopCountingTime()
	$("#board, #win, #stopgame, #pausegame, #resumegame").hide()
	$("#Hello, #newgame").show()
}
function pausegame(){
	memory.pauseGame=true;
	$(".back").css({ "background" : "url(\'photos/pause.png\')" })
	$("#resumegame").show()
	$("#pausegame").hide()
}
function resumegame(){
	memory.pauseGame=false;
	$(".back").css({ "background" : "url(\'photos/front.png\')" })
	$("#resumegame").hide()
	$("#pausegame").show()
}
function win(){
	memory.isPlay = false;
	$("#board, #Hello, #stopgame, #pausegame, #resumegame").hide()
	$(" #win, #newgame").show()
	stopCountingTime()
}
//initialize app
function init(ile){
	if(ile == 16){
		$("#board").css("width","440px")
	}else{
		$("#board").css("width","660px")
	}
	memory.ids = [];
	for(var i=1;i<=ile/2;i++){
		memory.ids.push(i);
		memory.ids.push(i);
	}
	$("#board").empty()
	for(var i=1;i<=ile;i++){
		var dlugosc = memory.ids.length,
			losowyIndex = getRandomInt(0, dlugosc);
			
		$("#board").append('<div class="card shown" data-id="'+memory.ids[losowyIndex]+'"><div class="front" style="background:url(\'photos/'+memory.ids[losowyIndex]+'.png\')"></div><div class="back"></div></div>')
		
		memory.ids.splice(losowyIndex, 1);
	}
	$(".card").click(function(){
		if(!memory.pauseGame){
			incClick()
			i=0;
			$(this).toggleClass("current");
			$(".current").each(function(){//countig opened cards (max 2)
				i++;
			})
			setTimeout(function(){
				if(i == 2){//if are 2 opened cards
					$(".card.current").each(function(){
						memory.dataId.push($(this).attr("data-id"))
					})
					if(memory.dataId[0] == memory.dataId[1]){//checking if opened cards are the same
						$(".current").addClass("hidden").removeClass("shown")
					}
					$(".card").removeClass("current")
					memory.dataId = [];
				}else if(i>2){
					$(".card").removeClass("current")
				}
				remained = 0;
				$(".card.shown").each(function(){remained++})//Counting the remaining cards
				if(remained == 0){
					win()
				}
			},300)
		}
	})
}
$(window).resize(function(){//resize app elements
	resizer()
})
$(document).ready(function(){
	resizer()
	$("#options").click(function(){
		$("#hiddenOptions").slideToggle(100)
		$(this).toggleClass("opened")
	})
	$("#newgame").click(function(){//start game button
		newgame()
	})
	$("#stopgame").click(function(){//stop game button
		stopgame()
	})
	$("#resumegame").click(function(){//resume game button
		resumegame()
	})
	$("#pausegame").click(function(){//pause game button
		pausegame()
	})
	$("select#difficulty").change(function(){//select dificulty
		memory.size = $(this).val()
		if(memory.isPlay){
			stopgame();
			newgame();
		}else{
			stopgame()
		}
	})
	$("input#showGameTime").change(function(){//show/hide time of game
		if($(this).is(":checked")){
			$("#timeCounter").show()
		}else{
			$("#timeCounter").hide()
		}
	})
	$("input#showClickNumber").change(function(){//show/hide clicks number
		if($(this).is(":checked")){
			$("#clickCounter").show()
		}else{
			$("#clickCounter").hide()
		}
	})
})
.bind("contextmenu", function(e){//disable right click
	e.preventDefault()
})

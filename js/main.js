const memory = {
    dataId: [], //array contain id's pairs
};
const icons = [
    'fab fa-angellist',
    'fas fa-baseball-ball',
    'fab fa-bitcoin',
    'fab fa-centos',
    'fab fa-battle-net',
    'fab fa-gripfire',
    'far fa-grin-alt',
    'far fa-heart'
];
let stars = 0;
const generateStars = container => {
    container = container || $('.stars');
    container.empty();
    if (stars < 0) {
        stars = 0;
    }
    if (stars > 4) {
        stars = 4;
    }
    for (let i = 1; i <= 4; i++) {
        let el;
        if (stars < i) {
            el = `<i class="far fa-star"></i>`
        } else {
            el = `<i class="fas fa-star"></i>`
        }
        container.append(el)
    }
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const newGame = () => {
    init();
    $("#gameField").removeClass('winner')
}
let timeout;
const win = () => {
    const classnames = ['', 'bronze', 'bronze', 'silver', 'gold'];

    $("#gameField").addClass(`winner ${classnames[stars]}`);
    generateStars($('.stars-container'));
}
const onResize = () => {
    let size;
    let boardWidth;
    const headerHeight = 30;
    if ($(this).width() < ($(this).height() - headerHeight)) {
        size = `calc(100vw / 4 - 30px)`;
        boardWidth = `100vw`;
    } else {
        size = `calc((100vh - ${headerHeight}px) / 4 - 30px)`;
        boardWidth = `calc(100vh - ${headerHeight}px)`;
    }
    $('.card').css({
        width: size,
        height: size,
    });
    $('#board').css({width: boardWidth})
}
const init = () => {
    const board = $("#board");

    const tmpArray = [];

    for (let icon of icons) {
        tmpArray.push(icon);
        tmpArray.push(icon);
    }

    board.empty();

    for (let i = 0; i < icons.length * 2; i++) {
        const random = getRandomInt(0, tmpArray.length);
        board.append(
            `<div class="card" data-id="${tmpArray[random]}">
                <i class="${tmpArray[random]} icon"></i>
                <i class="fas fa-question question"></i>
            </div>`
        );

        tmpArray.splice(random, 1);
    }

    $(".card").click(function () {
        if ($(this).hasClass('solved')) {
            return;
        }
        if ($('.current').length >= 2) {
            $('.card').removeClass('current');
            clearTimeout(timeout)
            memory.dataId = [];
        }

        clearTimeout(timeout)
        $(this).addClass('current');

        memory.dataId.push($(this).attr('data-id'));

        if ($('.current').length === 2) {//if are 2 opened cards
            if (memory.dataId[0] === memory.dataId[1]) {//checking if opened cards are the same
                $(`.card`).each((key, item) => {
                    if ($(item).attr('data-id') === memory.dataId[0]
                        || $(item).attr('data-id') === memory.dataId[1]) {
                        $(item).addClass('solved');
                    }
                })
                stars++;
            } else {
                stars--;
            }
            generateStars();
            timeout = setTimeout(() => {
                $('.card').removeClass('current');
            }, 500)
            memory.dataId = [];
        }
        if ($(".card:not(.solved)").length === 0) {
            win();
        }
    });
}

$(document).ready(() => {
    newGame();
    onResize();
    generateStars();
});

$(window).resize(onResize);


p1 = {
    score: 0,
    button: document.querySelector('#p1add'),
    TV: document.querySelector('#p1')
};
p2 = {
    score: 0,
    button: document.querySelector('#p2add'),
    TV: document.querySelector('#p2')
};
const resetBtn = document.querySelector('#reset');
const slct = document.querySelector('#playupto');
const img = document.querySelector('#pubgImg');

let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
    }
    if(player.score === winningScore){
        isGameOver = true;
        player.TV.classList.add('has-text-success');
        opponent.TV.classList.add('has-text-danger');
        player.button.disabled = true;
        opponent.button.disabled = true;
        img.src = 'pubg2.jpg';
        setTimeout(function () {
            confetti.start();
        }, 1000);
    }
    player.TV.textContent = player.score;
}

p1.button.addEventListener('click', function () {
    updateScores(p1, p2);
});
p2.button.addEventListener('click', function () {
    updateScores(p2,p1);
});

slct.addEventListener('change', function () {
    const value = parseInt(this.value);
    winningScore = value;
    reset();
});

function reset() {
    setTimeout(function () {
        confetti.stop();
    }, 1000);
    img.src = 'pubg3.jpg';
    isGameOver = false;
    for (p of [p1, p2]) {
        p.score = 0;
        p.TV.textContent = p.score;
        p.button.disabled = false;
        p.TV.classList.remove('has-text-success', 'has-text-danger');
    }
}

resetBtn.addEventListener('click', reset);

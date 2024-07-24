const section = document.querySelector('section');
const scoreCount = document.querySelector('.scoreCount');
const highScoreCount = document.querySelector('.highscore');
let score = 0
let highScore = 0;
highScoreCount.textContent = highScore;
scoreCount.textContent = score;

const getData = () => [
    {imgSrc: 'img/alice.jpeg', name: 'alice'},
    {imgSrc: 'img/alice.jpeg', name: 'alice'},
    {imgSrc: 'img/bella.jpeg', name: 'bella'},
    {imgSrc: 'img/bella.jpeg', name: 'bella'},
    {imgSrc: 'img/carlise.jpeg', name: 'carlise'},
    {imgSrc: 'img/carlise.jpeg', name: 'carlise'},
    {imgSrc: 'img/charlie.jpeg', name: 'charlie'},
    {imgSrc: 'img/charlie.jpeg', name: 'charlie'},
    {imgSrc: 'img/edward.jpeg', name: 'edward'},
    {imgSrc: 'img/edward.jpeg', name: 'edward'},
    {imgSrc: 'img/jacob.jpeg', name: 'jacob'},
    {imgSrc: 'img/jacob.jpeg', name: 'jacob'},
    {imgSrc: 'img/emmet Small.jpeg', name: 'emmet'},
    {imgSrc: 'img/emmet Small.jpeg', name: 'emmet'},
    {imgSrc: 'img/esme.jpeg', name: 'esme'},
    {imgSrc: 'img/esme.jpeg', name: 'esme'},
    {imgSrc: 'img/rosalie.jpeg', name: 'rosalie'},
    {imgSrc: 'img/rosalie.jpeg', name: 'rosalie'},
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);   
    return cardData; 
};

const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.src = item.imgSrc;
        card.setAttribute('name', item.name)

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e)
        });
    });
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute('name') ===
        flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none';
            });
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            });
        };
        score++
    };
   scoreCount.textContent = score;

    if(toggleCard.length === 18){
        if(score > highScore){
            setTimeout(() => {
            restart(`YOU WON!! YOUR NEW HIGH SCORE IS ${score}!`)
        }, 1000);
        store();
        } else {
            setTimeout(() => {
                restart(`YOU WON!! YOUR SCORE IS ${score}`)
            }, 1000);
        };
    };
};

const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        cards[index].style.pointerEvents = 'all';
        faces[index].src = item.imgSrc;
        cards[index].setAttribute('name', item.name)
    });
    score = 0
    scoreCount.textContent = score;

    setTimeout(() => window.alert(text), 100)
};

const restartbtn = document.querySelector('.restartbtn');

restartbtn.addEventListener('click', () => {
    restart('You restarted the game');
});

const store = () => {
    localStorage.setItem('highscore', score);
    console.log(localStorage.getItem('highscore'));
    highScoreCount.textContent = localStorage.getItem('highscore');
};

const startbtn = document.querySelector('.startbtn');
startbtn.addEventListener('click', () => {
    cardGenerator();

})

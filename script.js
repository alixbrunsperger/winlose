let state = {
    numbersChecked:[],
    isPlayable: true
};

function updateFeedback(text, customClass){
    document.querySelector('.feedback-container').innerHTML = `<span class='${customClass}'>${text}</span>`;
}

function refreshButtonDisplay(){
    let button = document.querySelector('.button-play');
    (state.numbersChecked.length >0 ? button.classList.remove('novalid') : button.classList.add('novalid'));
}

function refreshNumbersDisplay(){
    if(state.numbersChecked.length === 0){
        for(let number of document.querySelectorAll('[class*="number-"]')){
            number.classList.remove('noselect');
        }
    } else {
        for(let number of document.querySelectorAll('[class*="number-"]')){
            number.classList.add('noselect');
        }

        for(let number of document.querySelectorAll('[class*="number-"]')){
            if(state.numbersChecked.includes(parseInt(number.getAttribute('data-value')))){
                number.classList.remove('noselect');
            }
        }
    }
}

function updateCheckedNumbers(element){
    if(state.isPlayable){
        let number = parseInt(element.getAttribute('data-value'));
        if(state.numbersChecked.includes(number)){
            document.querySelector('.audio-check').play();
            state.numbersChecked.splice(state.numbersChecked.findIndex((value) => value === number),1);
        } else if(state.numbersChecked.length < 5){
            document.querySelector('.audio-check').play();
            state.numbersChecked.push(number);
        } else {
            document.querySelector('.wrong').classList.remove('hidden');
            document.querySelector('.audio-wrong').play();
        }
        refreshNumbersDisplay();
        refreshButtonDisplay();
    }
}

function submit(){
    if(state.isPlayable){
        state.isPlayable = false;
        let outcome =  Math.floor(Math.random() * Math.floor(9)) + 1;
        let outcomeDisplay = document.querySelector('.front');
        outcomeDisplay.classList.add('number','fade-in');
        outcomeDisplay.src= `./images/${outcome}.png`;
        if(state.numbersChecked.includes(outcome)) {
            setTimeout(() => {
                    document.querySelector('.audio-win').play();
                    updateFeedback('&nbsp;&nbsp;<img src="images/nyan.gif" /> &nbsp;That\'s a big win !', 'win');
                }
                , 1500);
        } else {
            setTimeout(() => {
                    document.querySelector('.audio-lose').play();
                    updateFeedback('mmmmh No! Try again', 'lose')
                }
                , 1500);

        }
    }
}


function initGame(){
    document.querySelector('.audio-ambiant').volume=0.2;
    document.querySelector('.audio-ambiant').play();
    document.querySelector('.game').classList.add('fade-in');
}

function reinitBoard(){
    state.isPlayable= true;
    let outcomeDisplay = document.querySelector('.front');
    outcomeDisplay.classList.remove('number');
    outcomeDisplay.src= './images/mystery.png';
    document.querySelector('.wrong').classList.add('hidden');
    state.numbersChecked = [];
    refreshNumbersDisplay();
    refreshButtonDisplay();
    updateFeedback('','');
}
let state = {
    numbersChecked:[]
};

function updateFeedback(text, customClass){
    document.querySelector('.feedback-container').innerHTML = `<span class='${customClass}'>${text}</span>`;
}

function refreshButtonDisplay(){
    let button = document.querySelector('.button');
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
    let number = parseInt(element.getAttribute('data-value'));
    if(state.numbersChecked.includes(number)){
        state.numbersChecked.splice(state.numbersChecked.findIndex((value) => value === number),1);
    } else {
        (state.numbersChecked.length < 5 ? state.numbersChecked.push(number) : "");
    }
    refreshNumbersDisplay();
    refreshButtonDisplay();
}

function submit(){
    let outcome =  Math.floor(Math.random() * Math.floor(9)) + 1;
    let outcomeDisplay = document.querySelector('.front');
    outcomeDisplay.classList.add('number');
    outcomeDisplay.src= `/images/sym${outcome}.png`;
    (state.numbersChecked.includes(outcome) ?
            updateFeedback('That\'s a win ! Wonderful !', 'win')
        :
            updateFeedback('mmmmh No! Try again', 'lose')
    );
}

function reinitBoard(){
    let outcomeDisplay = document.querySelector('.front');
    outcomeDisplay.classList.remove('number');
    console.log(outcomeDisplay);
    outcomeDisplay.src= '/images/mystery.png';
    console.log(outcomeDisplay);
    state.numbersChecked = [];
    refreshNumbersDisplay();
    refreshButtonDisplay();
    updateFeedback('','');
}
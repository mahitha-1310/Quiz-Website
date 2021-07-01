
const quiz=[
    {
        q:'HTML stands for -',
        option:['HighText Machine Language','HyperText and links Markup Language','HyperText Markup Language','None of these'],
        answer:2
    },
    {
        q:'Which of the following tag is used for inserting the largest heading in HTML?',
        option:['< h3 >','< h1 >','< h5 >','< h6 >'],
        answer:1
    },
    {
        q:'< input > is -',
        option:['a format tag.','an empty tag','none of the above'],
        answer:1
    },
    {
        q:'CSS stands for -',
        option:['Cascade style sheets','Color and style sheets','Cascading style sheets','None of the above'],
        answer:2
    },
    {
        q:'An HTML program is saved by using the ____ extension.',
        option:['.html','.ht','.hml','none of the above'],
        answer:0
    },

]

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers=0;
let attempt=0;

homeBox.querySelector(".total-questions").innerHTML= quiz.length;

function startQuiz(){
    
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestions();
    answersIndicator();
    
}

function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }   
}

function getNewQuestions(){
     
    questionNumber.innerHTML = "Question " + (questionCounter+1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion= questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1= availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    
    const optionLen= currentQuestion.option.length;
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML='';
    for(let i=0; i<optionLen;i++){
        const optionIndex= availableOptions[Math.floor(Math.random()*availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        const option= document.createElement("div");
        option.innerHTML = currentQuestion.option[optionIndex];
        option.id=optionIndex;
        option.className="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++;
     
}

function getResult(element){
    const id=parseInt(element.id);
    if(id===currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen=optionContainer.children.length;
    for(let i=0; i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion= quiz.length;
    for(let i=0;i<totalQuestion;i++){
        const indicator= document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){  
    
    if ( questionCounter === quiz.length){
        quizOver();
        
    }
    else{
        getNewQuestions();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const totalPercentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = totalPercentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function resetQuiz(){
    questionCounter = 0;
    attempt=0;
    correctAnswers=0;
}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}
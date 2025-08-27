// Array of quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest animal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: "Blue Whale"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        answer: "Vatican City"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        answer: "Au"
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["South Africa", "Brazil", "Australia", "India"],
        answer: "Australia"
    }
];

// Global variables to manage quiz state
let currentQuestionIndex = 0;
let score = 0;

// Get references to all the HTML elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const totalQuestionsDisplay = document.getElementById('total-questions-display');
const restartBtn = document.getElementById('restart-btn');

// Function to start the quiz
function startQuiz() {
    // Hide the start screen and show the quiz screen
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Function to display the current question
function showQuestion() {
    // Reset state for the new question
    nextBtn.style.display = 'none';
    optionsContainer.innerHTML = '';
    
    // Get the current question from the array
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        optionsContainer.appendChild(button);

        // Add a click event listener to each option button
        button.addEventListener('click', () => checkAnswer(option));
    });
}

// Function to check the user's answer
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const allOptions = optionsContainer.querySelectorAll('.option-btn');
    
    // Check if the selected option is correct
    if (selectedOption === currentQuestion.answer) {
        score++;
        // Add 'correct' class to the correct button
        allOptions.forEach(btn => {
            if (btn.textContent === selectedOption) {
                btn.classList.add('correct');
            }
        });
    } else {
        // Add 'incorrect' class to the selected button and 'correct' to the actual answer
        allOptions.forEach(btn => {
            if (btn.textContent === selectedOption) {
                btn.classList.add('incorrect');
            }
            if (btn.textContent === currentQuestion.answer) {
                btn.classList.add('correct');
            }
        });
    }

    // Disable all option buttons after an answer is selected
    allOptions.forEach(btn => btn.disabled = true);
    nextBtn.style.display = 'block'; // Show the next button
}

// Function to move to the next question or show results
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Function to show the final results screen
function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = questions.length;
}

// Function to restart the quiz
function restartQuiz() {
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// Add event listeners to the main buttons
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

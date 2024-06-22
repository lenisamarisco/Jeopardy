document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    const modal = document.getElementById('question-modal');
    const closeModal = modal.querySelector('.close');
    const questionText = modal.querySelector('#question-text');
    const answerInput = modal.querySelector('#answer-input');
    const submitButton = modal.querySelector('#submit-answer');
    const resultText = modal.querySelector('#result');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    // Define your questions and correct answers here
    const answers = {
        'Question 1 ($100)': 'Answer 1',
        'Question 2 ($100)': 'Answer 2',
        'Question 3 ($100)': 'Answer 3',
        'Question 4 ($100)': 'Answer 4',
        'Question 5 ($100)': 'Answer 5',
        'Question 6 ($100)': 'Answer 6',
        'Question 1 ($200)': 'Answer 7',
        'Question 2 ($200)': 'Answer 8',
        'Question 3 ($200)': 'Answer 9',
        'Question 4 ($200)': 'Answer 10',
        'Question 5 ($200)': 'Answer 11',
        'Question 6 ($200)': 'Answer 12'
        // Add more questions and answers as needed
    };

    let currentQuestion = null;

    // Start button event listener
    startBtn.addEventListener('click', function() {
        startGame();
    });

    // Restart button event listener
    restartBtn.addEventListener('click', function() {
        restartGame();
    });

    // Show modal when question is clicked
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const category = question.getAttribute('data-category');
            const points = question.getAttribute('data-points');
            const questionTextContent = question.textContent;

            questionText.textContent = `${questionTextContent} - Category ${category} ($${points})`;
            answerInput.value = '';
            resultText.textContent = '';
            currentQuestion = question;

            modal.style.display = 'block';
        });
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Handle answer submission
    submitButton.addEventListener('click', function() {
        const userAnswer = answerInput.value.trim();
        const question = currentQuestion.textContent.trim();

        if (answers.hasOwnProperty(question)) {
            const correctAnswer = answers[question];

            if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
                resultText.textContent = 'Correct!';
                // Additional logic after correct answer, if needed
            } else {
                resultText.textContent = 'Incorrect. Try again!';
            }
        } else {
            resultText.textContent = 'Answer not found for this question.';
        }
    });

    // Function to start the game
    function startGame() {
        // Logic to start the game goes here
        startBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
    }

    // Function to restart the game
    function restartGame() {
        // Logic to restart the game goes here
        startBtn.style.display = 'inline-block';
        restartBtn.style.display = 'none';
        // Additional reset logic as needed
    }
});

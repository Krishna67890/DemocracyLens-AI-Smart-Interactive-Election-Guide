import { quizQuestions } from '../data/electionData.js';
import { gameState } from '../services/GameState.js';

export class QuizEngine {
    constructor() {
        this.container = document.getElementById('quiz-content');
        this.currentQuestion = 0;
        this.score = 0;
    }

    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.renderQuestion();
    }

    renderQuestion() {
        const q = quizQuestions[this.currentQuestion];
        this.container.innerHTML = `
            <div class="quiz-step">
                <h3>Question ${this.currentQuestion + 1}/${quizQuestions.length}</h3>
                <p class="question-text">${q.q}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="btn-neon quiz-opt" data-index="${i}">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(parseInt(e.target.dataset.index)));
        });
    }

    handleAnswer(idx) {
        if (idx === quizQuestions[this.currentQuestion].correct) {
            this.score++;
            gameState.addXP(50);
        }

        this.currentQuestion++;
        if (this.currentQuestion < quizQuestions.length) {
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const percentage = (this.score / quizQuestions.length) * 100;
        this.container.innerHTML = `
            <div class="quiz-results">
                <h3>Quiz Completed!</h3>
                <div class="score-circle">
                    <span>${this.score}/${quizQuestions.length}</span>
                </div>
                <p>${percentage === 100 ? "Amazing! You're an Election Expert! 🧠" : "Good job! Keep learning to master the process."}</p>
                <button class="btn-neon" id="retry-quiz">Retry Quiz</button>
            </div>
        `;

        document.getElementById('retry-quiz').addEventListener('click', () => this.start());

        if (percentage === 100) {
            gameState.unlockBadge('expert', '🧠', 'Election Expert');
        }
    }
}

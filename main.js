// State Management
const state = {
    xp: 0,
    level: 1,
    badges: [],
    mode: 'advanced', // 'basic' or 'advanced'
    quizScore: 0,
    isFirstTime: true
};

// Data Structures
const chatbotResponses = {
    greetings: ["Hello! I'm your ElectionVerse AI mentor. How can I guide you today?", "Welcome! Ready to learn about the power of your vote?", "Hi there! Ask me anything about elections."],
    voting_process: "The voting process involves 6 key steps: Registration, Verification, Reaching the Polling Station, Identification, Inking, and casting your vote on the EVM.",
    documents: "You'll typically need your Voter ID (EPIC card). If you don't have it, other government IDs like Aadhaar, PAN card, or Passport are often accepted.",
    evm: "EVM stands for Electronic Voting Machine. It's a secure device with two units: a Control Unit and a Balloting Unit. It's designed to be tamper-proof and works without internet.",
    eligibility: "To vote, you must be a citizen of the country and at least 18 years old on the qualifying date.",
    default: "That's a great question! I'm still learning, but you can try asking about 'voting process', 'EVM', or 'documents required'."
};

const quizQuestions = [
    {
        q: "What is the minimum age to vote in most democracies?",
        options: ["16", "18", "21", "25"],
        correct: 1
    },
    {
        q: "What does EVM stand for?",
        options: ["Electronic Voter Method", "Election Verification Model", "Electronic Voting Machine", "Efficient Voting Medium"],
        correct: 2
    },
    {
        q: "Which unit of the EVM does the voter use to cast their vote?",
        options: ["Control Unit", "Balloting Unit", "VVPAT Unit", "Main Unit"],
        correct: 1
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    initScrollAnimations();
    initCursorEffect();
    updateXP(0);
    setupEventListeners();

    if (state.isFirstTime) {
        setTimeout(startDemoMode, 2000);
    }
});

function initCursorEffect() {
    const glow = document.querySelector('.bg-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 210, 255, 0.15) 0%, transparent 50%)`;
    });
}

function startDemoMode() {
    addChatMessage('ai', "Welcome to ElectionVerse AI! 👋 I see it's your first time here. Let me show you around.");

    setTimeout(() => {
        const heroBtn = document.querySelector('.btn-cta');
        heroBtn.classList.add('glow-pulse');
        addChatMessage('ai', "You can start your interactive journey by clicking 'Start Your Journey'.");

        setTimeout(() => {
            document.getElementById('chatbot').classList.add('highlight-chat');
            addChatMessage('ai', "I'm always here at the bottom-right to answer any questions about voting or the election process!");
            state.isFirstTime = false;
        }, 3000);
    }, 3000);
}

function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        addChatMessage('ai', `Environment changed to ${isLight ? 'Light' : 'Cyber'} mode.`);
    });

    // Mode Toggle
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        state.mode = state.mode === 'advanced' ? 'basic' : 'advanced';
        document.getElementById('mode-text').innerText = state.mode.charAt(0).toUpperCase() + state.mode.slice(1) + " Mode";
        addChatMessage('ai', `Switched to ${state.mode} mode. I'll now provide ${state.mode === 'basic' ? 'simpler' : 'more detailed'} explanations.`);
    });

    // Chatbot Input
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (text) {
            addChatMessage('user', text);
            processChatInput(text);
            chatInput.value = '';
        }
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });

    // Voice Input
    const voiceBtn = document.getElementById('voice-btn');
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.classList.add('active');
        });

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            chatInput.value = text;
            handleSend();
            voiceBtn.classList.remove('active');
        };

        recognition.onerror = () => voiceBtn.classList.remove('active');
    } else {
        voiceBtn.style.display = 'none';
    }

    // Chatbot Minimize
    document.getElementById('chat-minimize').addEventListener('click', () => {
        document.getElementById('chatbot').classList.toggle('minimized');
    });

    // Suggestion Tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const text = tag.innerText;
            addChatMessage('user', text);
            processChatInput(text);
        });
    });
}

// Chatbot Logic
function initChatbot() {
    setTimeout(() => {
        addChatMessage('ai', chatbotResponses.greetings[0]);
    }, 1000);
}

function addChatMessage(type, text) {
    const container = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.innerText = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;

    if (type === 'user') {
        const typing = document.createElement('div');
        typing.className = 'message ai typing';
        typing.innerText = '...';
        typing.id = 'temp-typing';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }
}

function processChatInput(input) {
    const text = input.toLowerCase();
    let reply = chatbotResponses.default;

    if (text.includes('hello') || text.includes('hi')) reply = chatbotResponses.greetings[1];
    else if (text.includes('process') || text.includes('how to vote')) reply = chatbotResponses.voting_process;
    else if (text.includes('document') || text.includes('id')) reply = chatbotResponses.documents;
    else if (text.includes('evm')) reply = chatbotResponses.evm;
    else if (text.includes('eligible') || text.includes('age')) reply = chatbotResponses.eligibility;

    setTimeout(() => {
        const temp = document.getElementById('temp-typing');
        if (temp) temp.remove();
        addChatMessage('ai', reply);
        updateXP(10);
    }, 1000);
}

// XP & Gamification
function updateXP(amount) {
    state.xp += amount;
    const progress = (state.xp % 1000) / 10;
    document.getElementById('xp-progress').style.width = `${progress}%`;
    document.getElementById('xp-text').innerText = `${state.xp} / 1000 XP`;

    // Badge Unlocks
    if (state.xp >= 100 && !state.badges.includes('Learner')) unlockBadge('Learner', '🧠');
    if (state.xp >= 500 && !state.badges.includes('Expert')) unlockBadge('Expert', '🎓');
}

function unlockBadge(name, emoji) {
    state.badges.push(name);
    const container = document.getElementById('badges-container');
    const badge = document.createElement('div');
    badge.className = 'badge pulse';
    badge.title = name;
    badge.innerText = emoji;
    container.appendChild(badge);

    addChatMessage('ai', `🎉 Achievement Unlocked: ${name} Badge!`);
}

// Eligibility Checker
window.showEligibilityChecker = function() {
    const content = `
        <h3>Eligibility Checker</h3>
        <div class="form-group">
            <label>Your Age:</label>
            <input type="number" id="check-age" class="glass-input" placeholder="Enter age">
        </div>
        <div class="form-group">
            <label>Citizenship:</label>
            <select id="check-citizen" class="glass-input">
                <option value="yes">Citizen</option>
                <option value="no">Non-citizen</option>
            </select>
        </div>
        <button class="btn-neon" onclick="runEligibilityCheck()">Check Now</button>
        <div id="check-result" class="result-area"></div>
    `;
    showModal(content);
};

window.runEligibilityCheck = function() {
    const age = document.getElementById('check-age').value;
    const citizen = document.getElementById('check-citizen').value;
    const resultDiv = document.getElementById('check-result');

    if (age >= 18 && citizen === 'yes') {
        resultDiv.innerHTML = "<p class='success'>✅ You are eligible to vote! Unlock the 'Registered Voter' badge by completing the journey.</p>";
        updateXP(50);
    } else {
        resultDiv.innerHTML = "<p class='error'>❌ Eligibility criteria not met. " + (age < 18 ? "You must be 18+." : "Only citizens can vote.") + "</p>";
    }
};

// EVM Simulation
window.openEVMSimulator = function() {
    const candidates = [
        { name: "Progress Party", symbol: "🚀" },
        { name: "Green Future", symbol: "🌿" },
        { name: "Tech Unity", symbol: "💻" },
        { name: "Heritage League", symbol: "🏛️" }
    ];

    let content = `
        <h3>EVM Simulation Mode</h3>
        <p>Follow the light. Press the blue button next to your choice.</p>
        <div class="evm-machine glass-card">
            <div class="evm-header">ELECTRONIC VOTING MACHINE</div>
            <div class="evm-body">
                ${candidates.map((c, i) => `
                    <div class="candidate-row">
                        <span class="c-num">${i+1}</span>
                        <span class="c-name">${c.name}</span>
                        <span class="c-symbol">${c.symbol}</span>
                        <div class="vote-action">
                            <div class="beeper" id="beep-${i}"></div>
                            <button class="vote-btn" onclick="castSimVote(${i})"></button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div id="sim-feedback"></div>
    `;
    showModal(content);
};

window.castSimVote = function(index) {
    const beep = document.getElementById(`beep-${index}`);
    beep.classList.add('active');

    // Simulate the EVM Beep
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);

    document.getElementById('sim-feedback').innerHTML = "<h4>VOTE CAST SUCCESSFULLY!</h4><p>The VVPAT slip would now show your choice for 7 seconds.</p>";

    setTimeout(() => {
        closeModal();
        addChatMessage('ai', "Excellent! You've experienced casting a vote. You've earned the 'First Vote Cast' badge! 🗳️");
        unlockBadge('First Vote Cast', '🗳️');
        updateXP(100);
    }, 3000);
};

// Quiz Logic
let currentQuestion = 0;
window.startQuiz = function() {
    currentQuestion = 0;
    state.quizScore = 0;
    renderQuestion();
};

function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    const content = `
        <div class="quiz-step">
            <h3>Question ${currentQuestion + 1}/${quizQuestions.length}</h3>
            <p>${q.q}</p>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="btn-neon quiz-opt" onclick="checkAnswer(${i})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('quiz-content').innerHTML = content;
}

window.checkAnswer = function(idx) {
    if (idx === quizQuestions[currentQuestion].correct) {
        state.quizScore++;
        updateXP(50);
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        renderQuestion();
    } else {
        showQuizResults();
    }
};

function showQuizResults() {
    const percentage = (state.quizScore / quizQuestions.length) * 100;
    document.getElementById('quiz-content').innerHTML = `
        <h3>Quiz Completed!</h3>
        <p>Your Score: ${state.quizScore} / ${quizQuestions.length}</p>
        <p>${percentage === 100 ? "Amazing! You're an Election Expert! 🧠" : "Good job! Keep learning to master the process."}</p>
        <button class="btn-neon" onclick="startQuiz()">Retry</button>
    `;
    if (percentage === 100) unlockBadge('Election Expert', '🧠');
}

// UI Helpers
function showModal(content) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    const existingClose = '<button class="close-btn" onclick="closeModal()">&times;</button>';
    body.innerHTML = existingClose + content;
    overlay.classList.remove('hidden');
}

window.closeModal = function() {
    document.getElementById('modal-overlay').classList.add('hidden');
};

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.journey-step, .glass-card').forEach(el => {
        el.classList.add('animate-in');
        observer.observe(el);
    });
}

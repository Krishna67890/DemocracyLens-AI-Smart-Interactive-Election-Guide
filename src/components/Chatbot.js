import { chatbotResponses } from '../data/electionData.js';
import { gameState } from '../services/GameState.js';

export class Chatbot {
    constructor() {
        this.container = document.getElementById('chatbot');
        this.messagesContainer = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.voiceBtn = document.getElementById('voice-btn');
        this.minimizeBtn = document.getElementById('chat-minimize');
        this.suggestions = document.getElementById('chat-suggestions');

        this.init();
    }

    init() {
        this.setupEventListeners();
        setTimeout(() => this.addMessage('ai', chatbotResponses.greetings[0]), 1000);
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        this.minimizeBtn.addEventListener('click', () => {
            this.container.classList.toggle('minimized');
        });

        this.suggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                this.handleInput(e.target.innerText);
            }
        });

        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            this.voiceBtn.addEventListener('click', () => {
                recognition.start();
                this.voiceBtn.classList.add('active');
            });
            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                this.handleInput(text);
                this.voiceBtn.classList.remove('active');
            };
        }
    }

    handleSend() {
        const text = this.input.value.trim();
        if (text) {
            this.handleInput(text);
            this.input.value = '';
        }
    }

    handleInput(text) {
        this.addMessage('user', text);
        this.processAIResponse(text);
    }

    addMessage(type, text) {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.innerText = text;
        this.messagesContainer.appendChild(msg);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        if (type === 'user') {
            const typing = document.createElement('div');
            typing.className = 'message ai typing';
            typing.innerText = '...';
            typing.id = 'temp-typing';
            this.messagesContainer.appendChild(typing);
        }
    }

    processAIResponse(input) {
        const text = input.toLowerCase();
        let reply = chatbotResponses.default;

        if (text.includes('process') || text.includes('how to vote')) reply = chatbotResponses.voting_process;
        else if (text.includes('document')) reply = chatbotResponses.documents;
        else if (text.includes('evm')) reply = chatbotResponses.evm;
        else if (text.includes('eligible')) reply = chatbotResponses.eligibility;

        setTimeout(() => {
            const temp = document.getElementById('temp-typing');
            if (temp) temp.remove();
            this.addMessage('ai', reply);
            gameState.addXP(10);
        }, 1000);
    }
}

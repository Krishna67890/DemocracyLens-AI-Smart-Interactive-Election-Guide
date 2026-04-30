export class GameState {
    constructor() {
        this.xp = 0;
        this.level = 1;
        this.badges = [];
        this.mode = 'advanced';
        this.quizScore = 0;
        this.completedSteps = new Set();
        this.listeners = [];
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this));
    }

    addXP(amount) {
        this.xp += amount;
        this.checkLevel();
        this.notify();
    }

    checkLevel() {
        this.level = Math.floor(this.xp / 1000) + 1;
    }

    unlockBadge(badgeId, emoji, name) {
        if (!this.badges.find(b => b.id === badgeId)) {
            this.badges.push({ id: badgeId, emoji, name });
            this.addXP(100);
            this.notify();
            return true;
        }
        return false;
    }

    completeStep(stepId) {
        this.completedSteps.add(stepId);
        this.addXP(50);
        this.notify();
    }

    setMode(mode) {
        this.mode = mode;
        this.notify();
    }
}

export const gameState = new GameState();

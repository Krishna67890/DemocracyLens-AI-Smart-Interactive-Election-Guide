export class ModalController {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.body = document.getElementById('modal-body');
        this.closeBtn = document.getElementById('modal-close-btn');

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
    }

    show(content) {
        this.body.innerHTML = content;
        this.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

class SkriptIDE {
    constructor() {
        this.state = {
            syntax: true,
            indent: true,
            theme: 'dark'
        };
        this.editor = document.getElementById('main-editor');
        this.display = document.getElementById('highlight-layer');
        this.gutter = document.getElementById('line-gutter');
    }

    // Sync the scrolling of the textarea with the display layer
    syncScroll() {
        this.display.scrollTop = this.editor.scrollTop;
        this.display.scrollLeft = this.editor.scrollLeft;
    }

    // The core parser
    process() {
        let code = this.editor.value;

        // 1. Handle Line Numbers
        const lines = code.split('\n').length;
        this.gutter.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');

        // 2. Handle Syntax Highlighting (if enabled)
        if (this.state.syntax) {
            this.display.innerHTML = this.highlight(code);
        } else {
            this.display.innerText = code;
        }
    }

    highlight(text) {
        return text
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            // Event Highlighting (on join, on death, etc)
            .replace(/^(on\s+.*:)/gm, '<span class="sk-event">$1</span>')
            // Command Definitions
            .replace(/^(command\s+.*:)/gm, '<span class="sk-cmd">$1</span>')
            // Effects
            .replace(/\b(send|broadcast|give|cancel event|teleport)\b/g, '<span class="sk-effect">$1</span>')
            // Variables {like.this}
            .replace(/\{([\w\.]+)\}/g, '<span class="sk-var">{$1}</span>')
            // Options {@option}
            .replace(/\{@([\w\.]+)\}/g, '<span class="sk-opt">{@$1}</span>')
            // Strings
            .replace(/"([^"]*)"/g, '<span class="sk-string">"$1"</span>')
            // Comments
            .replace(/#.*/g, '<span class="sk-comment">$&</span>');
    }

    toggleFeature(feature) {
        this.state[feature] = !this.state[feature];
        this.process(); // Refresh
        console.log(`${feature} is now ${this.state[feature]}`);
    }
}

const ide = new SkriptIDE();
document.getElementById('main-editor').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        // Put caret in correct position
        this.selectionStart = this.selectionEnd = start + 1;
        ide.process();
    }
});

const settings = {
    highlighting: true,
    lineNumbers: true
};

function updateEditor() {
    const code = document.getElementById('editing-area').value;
    const highlightArea = document.getElementById('highlight-area');
    
    if (!settings.highlighting) {
        highlightArea.innerText = code;
        return;
    }

    let formatted = code
        .replace(/&/g, "&amp;").replace(/</g, "&lt;") // Escape HTML
        .replace(/\b(on join|on quit|on break|command|trigger)\b/g, '<span class="event">$1</span>')
        .replace(/\b(send|message|give|cancel event|set)\b/g, '<span class="effect">$1</span>')
        .replace(/\{([^}]+)\}/g, '<span class="variable">{$1}</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/#.*/g, '<span class="comment">$&</span>');

    highlightArea.innerHTML = formatted + "\n";
    updateLineNumbers(code);
}

function updateLineNumbers(code) {
    const lines = code.split('\n').length;
    const lineNumDiv = document.getElementById('line-numbers');
    lineNumDiv.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
}

:root {
    --bg: #282a36;
    --fg: #f8f8f2;
    --sidebar: #21222c;
    --accent: #bd93f9;
}

body { background: #1e1e1e; font-family: 'Segoe UI', sans-serif; }

.ide-frame {
    display: flex;
    height: 90vh;
    margin: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

#main-editor, #highlight-layer {
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
    tab-size: 4;
    padding: 10px;
}

/* The Secret: Overlaying the two layers */
.textarea-wrapper {
    position: relative;
    flex-grow: 1;
}

#main-editor {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: transparent;
    color: transparent; /* Text is invisible, we see the layer below */
    caret-color: white; /* Keep the cursor visible! */
    resize: none;
    border: none;
    outline: none;
    z-index: 2;
}

#highlight-layer {
    position: absolute;
    top: 0; left: 0;
    margin: 0;
    z-index: 1;
    white-space: pre-wrap;
    word-wrap: break-word;
}

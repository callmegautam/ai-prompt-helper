console.log("content running");

function getChatInput() {
    return document.querySelector('[contenteditable="true"]');
}

function setInputValue(text) {
    const editable = getChatInput();
    if (!editable) return;

    editable.innerHTML = text;

    const event = new InputEvent("input", { bubbles: true, inputType: "insertText" });
    editable.dispatchEvent(event);
}

function loadPrompts(callback) {
    // chrome.storage.sync.get(["prompts"], (data) => {
    //     callback(
    //         data.prompts || [
    //             "Explain this in simpler words.",
    //             "Summarize in bullet points.",
    //             "Rewrite this professionally.",
    //         ]
    //     );
    // });

    callback([
        "Explain this in simpler words.",
        "Summarize in bullet points.",
        "Rewrite this professionally.",
    ]);
}

function insertUI() {
    const check = setInterval(() => {
        const input = document.querySelector("textarea");
        if (!input) return;
        clearInterval(check);

        loadPrompts((prompts) => initUI(input, prompts));
    }, 500);
}

function initUI(input, prompts) {
    const btn = document.createElement("button");
    btn.textContent = "AI";
    btn.className = "helper-btn";
    const target = document.getElementsByClassName("[grid-area:trailing]")[0]; // FIXED selector
    setTimeout(() => target.appendChild(btn), 1000);

    const modal = document.createElement("div");
    modal.className = "helper-modal hidden";

    prompts.forEach((p) => {
        const item = document.createElement("div");
        item.className = "helper-item";
        item.textContent = p;

        item.onclick = () => {
            setInputValue(p);
            modal.classList.add("hidden");
            input.focus();
        };

        modal.appendChild(item);
    });

    document.body.appendChild(modal);

    btn.onclick = () => modal.classList.toggle("hidden");

    document.addEventListener("click", (e) => {
        if (!modal.contains(e.target) && !btn.contains(e.target)) {
            modal.classList.add("hidden");
        }
    });
}

function appendWhenReady(btn, tries = 0) {}

insertUI();

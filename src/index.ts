console.log("AI prompt helper extension is running");

function getChatInput() {
    return document.querySelector('[contenteditable="true"]');
}

function setInputValue(text: string) {
    const editable = getChatInput();
    if (!editable) return;

    editable.innerHTML = text;

    const event = new InputEvent("input", { bubbles: true, inputType: "insertText" });
    editable.dispatchEvent(event);
}

function loadPrompts(callback: (prompts: string[]) => void) {
    // chrome.storage.sync.get(["prompts"], (data) => {
    //     callback(
    //         data.prompts as string[] | undefined || [
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

function initUI(input: HTMLTextAreaElement, prompts: string[]) {
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
        if (!modal.contains(e.target as Node) && !btn.contains(e.target as Node)) {
            modal.classList.add("hidden");
        }
    });
}

insertUI();

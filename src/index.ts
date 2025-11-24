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
    // btn.textContent = "AI";
    btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>
    `;
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

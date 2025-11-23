console.log("content running");

function loadPrompts(callback) {
    chrome.storage.sync.get(["prompts"], (data) => {
        callback(
            data.prompts || [
                "Explain this in simpler words.",
                "Summarize in bullet points.",
                "Rewrite this professionally.",
            ]
        );
    });
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
    btn.textContent = "Prompts";
    btn.className = "helper-btn";
    input.parentElement.appendChild(btn);

    const modal = document.createElement("div");
    modal.className = "helper-modal hidden";

    prompts.forEach((p) => {
        const item = document.createElement("div");
        item.className = "helper-item";
        item.textContent = p;

        item.onclick = () => {
            input.value = p;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            modal.classList.add("hidden");
            input.focus();
        };

        modal.appendChild(item);
    });

    document.body.appendChild(modal);

    btn.onclick = () => modal.classList.toggle("hidden");

    // btn.onclick = () => {
    //     console.log("Button clicked");
    // };

    document.addEventListener("click", (e) => {
        if (!modal.contains(e.target) && !btn.contains(e.target)) {
            modal.classList.add("hidden");
        }
    });
}

insertUI();

const list = document.getElementById("list") as HTMLUListElement;
const newPrompt = document.getElementById("newPrompt") as HTMLTextAreaElement;
const addPromptBtn = document.getElementById("addBtn") as HTMLButtonElement;

function render(prompts: string[]) {
    list.innerHTML = "";

    prompts.forEach((prompt: string, i: number) => {
        const li = document.createElement("li");
        li.textContent = prompt;

        const del = document.createElement("button");
        del.textContent = "x";
        del.style.marginLeft = "10px";
        del.onclick = () => {
            prompts.splice(i, 1);
            save(prompts);
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

function save(prompts: string[]) {
    chrome.storage.sync.set({ prompts }, () => {
        render(prompts);
    });
}

addPromptBtn.onclick = () => {
    const text = newPrompt.value.trim();
    if (!text) return;
    load((prompts) => {
        prompts.push(text);
        save(prompts);
        newPrompt.value = "";
    });
};

function load(cb: (prompts: string[]) => void) {
    chrome.storage.sync.get(["prompts"], (res) => {
        const prompts = (res.prompts as string[] | undefined) || [];
        cb(prompts);
    });
}

load(render);

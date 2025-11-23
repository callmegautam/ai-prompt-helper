const list = document.getElementById("list");
const newPrompt = document.getElementById("newPrompt");
const addBtn = document.getElementById("addBtn");

function render(prompts) {
    list.innerHTML = "";

    prompts.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = p;

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

function save(prompts) {
    chrome.storage.sync.set({ prompts }, () => {
        render(prompts);
    });
}

addBtn.onclick = () => {
    const text = newPrompt.value.trim();
    if (!text) return;
    load((prompts) => {
        prompts.push(text);
        save(prompts);
        newPrompt.value = "";
    });
};

function load(cb) {
    chrome.storage.sync.get(["prompts"], (res) => {
        cb(res.prompts || []);
    });
}

load(render);

import { defaultPrompts, type Prompt } from "../core/prompts";

const STYLE = `
.ai-helper-btn {
  margin-left: 8px;
  padding: 6px 12px;
  background: #0b74ff;
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}
.ai-helper-modal {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 260px;
  max-height: 220px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  z-index: 999999;
  padding: 10px;
  overflow-y: auto;
}
.ai-helper-modal.hidden {
  display: none;
}
.ai-helper-header {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.ai-helper-prompt-item {
  padding: 8px;
  border-radius: 6px;
  background: #f4f4f5;
  cursor: pointer;
  margin-bottom: 6px;
  font-size: 13px;
}
.ai-helper-prompt-item:hover {
  background: #e4e4e7;
}
`;

function injectStyles() {
    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);
}

function waitForTextarea(): Promise<HTMLTextAreaElement> {
    return new Promise((resolve) => {
        const tryFind = () => {
            const el = document.querySelector("textarea") as HTMLTextAreaElement | null;
            if (el) {
                resolve(el);
            } else {
                requestAnimationFrame(tryFind);
            }
        };
        tryFind();
    });
}

function createModal(prompts: Prompt[], input: HTMLTextAreaElement): HTMLDivElement {
    const modal = document.createElement("div");
    modal.className = "ai-helper-modal hidden";

    const header = document.createElement("div");
    header.className = "ai-helper-header";
    header.textContent = "Quick Prompts";

    modal.appendChild(header);

    prompts.forEach((p) => {
        const item = document.createElement("div");
        item.className = "ai-helper-prompt-item";
        item.dataset.id = p.id;
        item.textContent = p.text;

        item.addEventListener("click", () => {
            input.value = p.text;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            modal.classList.add("hidden");
            input.focus();
        });

        modal.appendChild(item);
    });

    document.body.appendChild(modal);
    return modal;
}

(async function main() {
    injectStyles();
    const input = await waitForTextarea();

    const container = input.parentElement;
    if (!container) return;

    const btn = document.createElement("button");
    btn.textContent = "Prompts";
    btn.className = "ai-helper-btn";

    container.appendChild(btn);

    const modal = createModal(defaultPrompts, input);

    btn.addEventListener("click", () => {
        modal.classList.toggle("hidden");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        const target = e.target as Node;
        if (modal.contains(target) || btn.contains(target)) return;
        modal.classList.add("hidden");
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.add("hidden");
        }
    });
})();

import type { Prompt } from "./prompts";

const KEY = "prompts";

export async function loadPrompts(): Promise<Prompt[]> {
    return new Promise((resolve) => {
        chrome.storage.sync.get([KEY], (result) => {
            const stored = result[KEY] as Prompt[] | undefined;
            resolve(stored ?? []);
        });
    });
}

export async function savePrompts(prompts: Prompt[]): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ [KEY]: prompts }, () => resolve());
    });
}

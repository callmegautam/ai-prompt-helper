export interface Prompt {
    id: string;
    text: string;
}

export const defaultPrompts: Prompt[] = [
    { id: "1", text: "Summarize the above in bullet points." },
    { id: "2", text: "Explain this step-by-step with examples." },
    { id: "3", text: "Refactor and optimize the above code." },
    { id: "4", text: "Rewrite this in a more professional tone." },
];

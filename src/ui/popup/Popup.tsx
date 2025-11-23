import React, { useEffect, useState } from "react";
import type { Prompt } from "../../core/prompts";
import { defaultPrompts } from "../../core/prompts";
import { loadPrompts, savePrompts } from "../../core/storage";

export default function Popup() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [newText, setNewText] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        (async () => {
            const stored = await loadPrompts();
            if (stored.length === 0) {
                setPrompts(defaultPrompts);
            } else {
                setPrompts(stored);
            }
        })();
    }, []);

    async function persist(next: Prompt[]) {
        setSaving(true);
        setPrompts(next);
        await savePrompts(next);
        setSaving(false);
    }

    function handleAdd() {
        const text = newText.trim();
        if (!text) return;
        const next: Prompt[] = [...prompts, { id: crypto.randomUUID(), text }];
        setNewText("");
        void persist(next);
    }

    function handleDelete(id: string) {
        const next = prompts.filter((p) => p.id !== id);
        void persist(next);
    }

    return (
        <div style={{ padding: 12, width: 320, fontFamily: "system-ui, sans-serif" }}>
            <h3 style={{ margin: "0 0 8px" }}>AI Prompt Helper</h3>
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "#555" }}>
                Manage your quick prompts. Changes are synced to your account.
            </p>

            <div style={{ marginBottom: 10 }}>
                <textarea
                    rows={2}
                    placeholder="New prompt..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    style={{
                        width: "100%",
                        boxSizing: "border-box",
                        fontSize: 13,
                        padding: 6,
                        resize: "vertical",
                    }}
                />
                <button
                    onClick={handleAdd}
                    disabled={!newText.trim() || saving}
                    style={{
                        marginTop: 6,
                        padding: "6px 10px",
                        fontSize: 13,
                        borderRadius: 4,
                        border: "none",
                        background: "#0b74ff",
                        color: "#fff",
                        cursor: "pointer",
                        opacity: !newText.trim() || saving ? 0.6 : 1,
                    }}
                >
                    {saving ? "Saving..." : "Add prompt"}
                </button>
            </div>

            <div
                style={{
                    maxHeight: 220,
                    overflowY: "auto",
                    borderTop: "1px solid #ddd",
                    paddingTop: 8,
                }}
            >
                {prompts.length === 0 ? (
                    <p style={{ fontSize: 12, color: "#666" }}>No prompts yet.</p>
                ) : (
                    prompts.map((p) => (
                        <div
                            key={p.id}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                gap: 6,
                                padding: 6,
                                marginBottom: 4,
                                borderRadius: 4,
                                background: "#f4f4f5",
                            }}
                        >
                            <div style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{p.text}</div>
                            <button
                                onClick={() => handleDelete(p.id)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#888",
                                    cursor: "pointer",
                                    fontSize: 12,
                                }}
                                title="Delete"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

console.log("Ai prompt activated");

const textArea = document.getElementsByName("prompt-textarea")[0];

console.log("Text area", textArea);

const aiButton = document.createElement("button");
aiButton.textContent = "AI";
textArea.parentNode.parentNode.appendChild(aiButton);
console.log("Parent ", textArea.parentNode);
aiButton.addEventListener("click", () => {
    alert("AI Button Clicked!");
});

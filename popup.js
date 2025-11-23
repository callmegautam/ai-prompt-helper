const changeParagraph = () => {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello, world!";
    document.body.appendChild(paragraph);
};

const addPromptBtn = document.querySelector("button");
addPromptBtn.addEventListener("click", changeParagraph);

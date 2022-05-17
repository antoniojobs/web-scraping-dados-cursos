let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#FFFFFF","#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// reage a um botão clique marcando o botão selecionado e salvando
// a seleção
function handleButtonClick(event) {
// Remova o estilo da cor selecionada anteriormente
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    // marque o botão como selecionado
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({
        color
    });
}

// Adicione um botão à página para cada cor fornecida
function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;
        // Para cada cor, recebemos…
        for (let buttonColor of buttonColors) {
            //… crie um botão com essa cor…
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            //… marque a cor atualmente selecionada…
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            //… e registre um ouvinte para quando esse botão é clicado
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    });
}

// Inicialize a página construindo as opções de cores
constructOptions(presetButtonColors);
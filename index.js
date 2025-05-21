const colorPickerForm = document.getElementById("color-picker-form");
const modal = document.getElementById("modal");
const modalAlert = document.getElementById("modal-alert");
const main = document.querySelector("main");

function renderColors(colorsArr) {
    let tempString = "";
    colorsArr.forEach(color => {
        tempString += `
            <div class="color-container">
                <div id="${color.hex.clean}" class="color pointer"></div>
                <div class="color-footer">
                    <p class="small">${color.hex.value}</p>
                </div>
            </div>
        `;
    });
    document.getElementById("color-scheme").innerHTML = tempString;
    colorsArr.forEach(color => {
        document.getElementById(color.hex.clean).style.backgroundColor = color.hex.value;
    });
}

colorPickerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const colorInputWithHashtag = document.getElementById("color-input").value;
    const colorSchemeMode = document.getElementById("color-scheme-mode").value;
    const colorInputWithoutHashtag = colorInputWithHashtag.substring(1);

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInputWithoutHashtag}&mode=${colorSchemeMode}&count=5`)
        .then(res => res.json())
        .then(scheme => renderColors(scheme.colors));
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("color")) {
        navigator.clipboard.writeText(`#${e.target.id}`);
        modal.style.display = "flex";
        modalAlert.textContent = `Hex value: #${e.target.id} copied to clipboard.`;
        main.style.opacity = "0.5";
    }
    if (e.target.id === "close-modal-btn") {
        modal.style.display = "none";
        main.style.opacity = "1";
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const consoleOutput = document.getElementById("consoleOutput");
  const consoleInputForm = document.querySelector("#consoleInputForm");
  const consoleInput = document.querySelector("#consoleInput");
  
  if (consoleOutput) {
    consoleOutput.addEventListener("contentadded", () => {
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    });
  } else {
    console.error("consoleOutput element not found");
  }
  
  if (consoleInputForm instanceof HTMLFormElement) {
    consoleInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (consoleInput instanceof HTMLInputElement) {
        const input = consoleInput.value.trim();
        processUserInput(input);
        consoleInput.value = "";
        displayAllTotals();
      } else {
        console.error("consoleInput element not found");
      }
    });
  } else {
    console.error("consoleInputForm element not found");
  }

  // HELP BUTTON SWITCHER (From ? to X)
  const helpButton = document.getElementById("helpButton");

  if (helpButton) {
    helpButton.addEventListener("click", function () {
      helpButton.textContent = helpButton.textContent === "?" ? "X" : "?";
    });
  } else {
    console.error("helpButton element not found");
  }
  displayAllTotals();
  
  // Nouveau gestionnaire d'événements pour les clics sur les entrées
  consoleOutput.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("entry")) {
    // Appeler la fonction entryClicked
    entryClicked(e.target.dataset.id);
  }});
});

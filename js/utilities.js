// ---------- ELEMENTS DU DOM

const consoleOutput = document.getElementById("consoleOutput");
const consoleInputForm = document.querySelector("#consoleInputForm");
const consoleInput = document.querySelector("#consoleInput");


const contentAddedEvent = new Event("contentadded");

let entryIdCounter = 0;
let fianza = 500; // Initialise fianza à 500



// ---------- GESTION DE L'AFFICHAGE

function writeToConsole(text, id = null) {
  if (consoleOutput) {
    let output = text;
    // Si un ID est fourni, crée un élément span cliquable avec l'ID en attribut de données
    if (id !== null) {
      output = `<span class="entry" data-id="${id}">${text}</span>`;
    } else {
      output += '<br>';  // Ajoute une instruction de saut de ligne pour les lignes de total
    }

    consoleOutput.innerHTML += output + " ";
    consoleOutput.dispatchEvent(contentAddedEvent);
  } else {
    console.error("consoleOutput element not found");
  }
}


function clearConsole() {
  if (consoleOutput) {
    consoleOutput.textContent = "";
  } else {
    console.error("consoleOutput element not found");
  }
}



// ---------- GESTION DE L'ENTREE UTILISATEUR

function processUserInput(input) {
  const inputArray = input.split(" ");
  let currentArray = null;

  inputArray.forEach(item => {
    if (item.indexOf('f') !== -1) {
      // Check if the fianza value needs to be updated
      const possibleFianza = parseFloat(item.slice(0, -1));
      if (!isNaN(possibleFianza)) {
        fianza = possibleFianza;
      }
    } else if (isNaN(item)) {
      const letter = item.slice(-1).toLowerCase();
      const number = parseFloat(item.slice(0, -1));
      const arrayPrefixes = ['v', 'c', 'h', 'tv', 'th'];

      if (arrayPrefixes.includes(letter)) {
        switch (letter) {
          case "v":
            if (item.slice(-2).toLowerCase() === "tv") {
              tipsVisaEntries.push(number);
              currentArray = tipsVisaEntries;
            } else {
              visaEntries.push(number);
              currentArray = visaEntries;
            }
            break;
          case "c":
            cashEntries.push(number);
            currentArray = cashEntries;
            break;
          case "h":
            if (item.slice(-2).toLowerCase() === "th") {
              tipsHotelEntries.push(number);
              currentArray = tipsHotelEntries;
            }
            break;
          default:
            console.log(`Unrecognised letter: ${letter}`);
        }
      } else if (item.includes('-')) {
        // If the item includes an ID (signified by '-'), update the corresponding entry
        const parts = item.split('-');
        const prefix = parts[0];
        const id = parseInt(parts[1], 10);
        const arrayToUpdate = getArrayFromPrefix(prefix);
        if (arrayToUpdate && arrayToUpdate[id] !== undefined) {
          if (parts.length === 2) {
            const newValue = parseFloat(inputArray[inputArray.indexOf(item) + 1]);
            if (newValue > 0) {
              // If the new value is above 0, update the entry
              arrayToUpdate[id] = newValue;
              console.log(`Entry ${item} updated to ${newValue}`);
            } else if (newValue === 0) {
              // If the new value is 0, delete the entry
              arrayToUpdate.splice(id, 1);
              console.log(`Entry ${item} deleted`);
            }
          } else {
            console.log(`Invalid entry format: ${item}`);
          }
        }
      } else {
        console.log("Invalid input");
      }
    } else {
      const number = parseFloat(item);
      if (currentArray !== null) {
        currentArray.push(number);
      } else {
        console.log("No array has been defined");
      }
    }
  });

  displayAllTotals();
  displayAdminInfo();
  
  setTimeout(() => {
    consoleInput.focus();
  }, 100);
}

// New function to handle clicking on an entry
function entryClicked(id) {
  consoleInput.value = id + " ";
  setTimeout(() => {
    consoleInput.focus();
    consoleInput.setSelectionRange(consoleInput.value.length, consoleInput.value.length);
  }, 100);
}


function getArrayFromPrefix(prefix) {
  switch (prefix) {
    case 'visa': return visaEntries;
    case 'cash': return cashEntries;
    case 'tipsh': return tipsHotelEntries;
    case 'tipsv': return tipsVisaEntries;
    default: return null;
  }
}



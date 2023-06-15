let visaEntries = [];
let cashEntries = [];
let tipsHotelEntries = [];
let tipsVisaEntries = [];

function displayAdminInfo() {
  const totalCash = cashEntries.reduce((a, b) => a + b, 0);
  const totalVisa = visaEntries.reduce((a, b) => a + b, 0);
  const totalTipsHotel = tipsHotelEntries.reduce((a, b) => a + b, 0);
  const totalTipsVisa = tipsVisaEntries.reduce((a, b) => a + b, 0);

  let cashToDeclare = totalCash - totalTipsHotel - totalTipsVisa + fianza;
  let visaToDeclare = totalVisa;
  let cashEnvelopeAdmin = totalCash - totalTipsVisa - totalTipsHotel;
  let ticketVisa = totalVisa + totalTipsVisa;
  let deficit = 0;

  if (cashEnvelopeAdmin < 0) {
    deficit = Math.abs(cashEnvelopeAdmin);
    cashEnvelopeAdmin = 0;
  }

  const fianzaEnvelope = fianza - deficit;

  writeToConsole('<hr class="separator">');
  writeToConsole(`CASH to Declare : ${cashToDeclare}`);
  writeToConsole(`VISA to Declare : ${visaToDeclare}`);
  writeToConsole(`CASH Envelope Admin : ${cashEnvelopeAdmin}`);
  writeToConsole(`Tiquet VISA : ${ticketVisa}`);
  writeToConsole(`"FIANZA" Envelope : ${fianzaEnvelope}`);
}

function displayIncome(title, entries, prefix) {
  writeToConsole(`${title} : ${entries.reduce((a, b) => a + b, 0)}`);
  if (entries.length > 0) {
    entries.forEach((entry, index) => writeToConsole(entry.toString(), prefix + index));
    writeToConsole(''); // Ajoute une ligne vide après les entrées
  } else {
    writeToConsole('-'); // Sinon, affiche un '-'
  }
  writeToConsole(''); // Ajoute une ligne vide
}

function displayAllTotals() {
  clearConsole(); // Supprime l'affichage actuel avant d'afficher les nouvelles valeurs

  displayIncome('CASH Income', cashEntries, "cash-");
  displayIncome('VISA Income', visaEntries, "visa-");
  displayIncome('Tips HOTEL', tipsHotelEntries, "tipsh-");
  displayIncome('Tips VISA', tipsVisaEntries, "tipsv-");

  displayAdminInfo(); // Met à jour les informations d'administration
}









const counterCard = document.querySelector(".counter-card");
const counterCaption = document.querySelector(".counter-caption");
const letterButton = document.querySelector("#letter-button");
const letterMessage = document.querySelector("#letter-message");

if (counterCard && counterCaption) {
  const startDateValue = counterCard.dataset.startDate;
  const startDate = new Date(startDateValue);
  const counterParts = {
    days: document.querySelector("#counter-days"),
    hours: document.querySelector("#counter-hours"),
    minutes: document.querySelector("#counter-minutes"),
    seconds: document.querySelector("#counter-seconds"),
  };

  if (!startDateValue || Number.isNaN(startDate.getTime())) {
    counterCaption.textContent = "Defina uma data válida para começar a contagem.";
    console.error("A contagem precisa de uma data válida no atributo data-start-date.");
  } else if (startDate.getTime() > Date.now()) {
    counterCaption.textContent = "A data de início não pode estar no futuro.";
    console.error("A data em data-start-date não pode estar no futuro.");
  } else if (Object.values(counterParts).some((part) => !part)) {
    console.error("Não foi possível encontrar todos os elementos da contagem.");
  } else {
    const updateCounter = () => {
      const elapsedSeconds = Math.floor((Date.now() - startDate.getTime()) / 1000);
      const days = Math.floor(elapsedSeconds / 86400);
      const hours = Math.floor((elapsedSeconds % 86400) / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;

      counterParts.days.textContent = days.toLocaleString("pt-BR");
      counterParts.hours.textContent = String(hours).padStart(2, "0");
      counterParts.minutes.textContent = String(minutes).padStart(2, "0");
      counterParts.seconds.textContent = String(seconds).padStart(2, "0");
    };

    updateCounter();
    window.setInterval(updateCounter, 1000);
  }
}

if (letterButton && letterMessage) {
  letterButton.addEventListener("click", () => {
    const isExpanded = letterButton.getAttribute("aria-expanded") === "true";
    letterButton.setAttribute("aria-expanded", String(!isExpanded));
    letterMessage.hidden = isExpanded;
    letterButton.innerHTML = isExpanded
      ? 'Abrir minha cartinha <span aria-hidden="true">♥</span>'
      : 'Fechar cartinha <span aria-hidden="true">×</span>';
  });
}
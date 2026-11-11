
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fortune-card");
  const message = document.getElementById("selection-message");

  const fortuneTypes = {
    love: "恋愛運",
    work: "仕事運",
    money: "金運",
    general: "総合運"
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.dataset.type;
      const name = fortuneTypes[type];

      if (!name || !message) return;

      message.textContent = `${name}を選びました。あなたの運命を占う準備をしています。`;

      cards.forEach(item => {
        item.style.borderColor = "rgba(217, 189, 131, 0.3)";
      });

      card.style.borderColor = "#e5c58a";
    });
  });
});

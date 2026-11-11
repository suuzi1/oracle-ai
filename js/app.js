
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fortune-card");
  const message = document.getElementById("selection-message");

  const fortuneTypes = {
    love: "恋愛運",
    work: "仕事運",
    money: "金運",
    general: "総合運"
  };

  const tarotCards = [
    { name: "愚者", symbol: "0", meaning: "新しい冒険が始まります。好奇心を大切にして、一歩踏み出してみましょう。" },
    { name: "魔術師", symbol: "I", meaning: "あなたには新しい未来を切り開く力があります。自信を持って行動しましょう。" },
    { name: "女教皇", symbol: "II", meaning: "今は心を落ち着けるとき。自分の直感を信じてみましょう。" },
    { name: "女帝", symbol: "III", meaning: "豊かさと愛情に恵まれる兆し。周囲とのつながりを大切に。" },
    { name: "皇帝", symbol: "IV", meaning: "計画性と責任感が成功の鍵。自分の目標を明確にしましょう。" },
    { name: "教皇", symbol: "V", meaning: "信頼できる人から良い助言を得られそうです。" },
    { name: "恋人", symbol: "VI", meaning: "心がときめく選択のとき。自分の気持ちに正直になりましょう。" },
    { name: "戦車", symbol: "VII", meaning: "前進する力が高まっています。迷わず目標に向かいましょう。" },
    { name: "力", symbol: "VIII", meaning: "穏やかな強さが幸運を引き寄せます。焦らず進みましょう。" },
    { name: "隠者", symbol: "IX", meaning: "一人で考える時間が大切です。答えはあなたの内側にあります。" },
    { name: "運命の輪", symbol: "X", meaning: "運気が動き始めています。訪れるチャンスを逃さないで。" },
    { name: "正義", symbol: "XI", meaning: "冷静な判断が大切。公平な視点で物事を見つめましょう。" },
    { name: "吊るされた男", symbol: "XII", meaning: "視点を変えることで新しい答えが見えてきます。" },
    { name: "死神", symbol: "XIII", meaning: "終わりは新しい始まり。変化を恐れず受け入れましょう。" },
    { name: "節制", symbol: "XIV", meaning: "バランスを整えるとき。無理をせず自然体で過ごしましょう。" },
    { name: "悪魔", symbol: "XV", meaning: "執着や思い込みを手放すことで、自由を取り戻せます。" },
    { name: "塔", symbol: "XVI", meaning: "予想外の変化があっても、新しい可能性につながります。" },
    { name: "星", symbol: "XVII", meaning: "希望の光が差し込んでいます。夢を大切にしてください。" },
    { name: "月", symbol: "XVIII", meaning: "不安に惑わされず、焦らず状況を見極めましょう。" },
    { name: "太陽", symbol: "XIX", meaning: "明るい未来の兆し。自分らしく楽しむことが幸運の鍵です。" },
    { name: "審判", symbol: "XX", meaning: "過去の経験が新しいチャンスにつながりそうです。" },
    { name: "世界", symbol: "XXI", meaning: "一つの目標が実を結ぶとき。達成感を味わいましょう。" }
  ];

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.dataset.type;
      const category = fortuneTypes[type];

      if (!category || !message) return;

      const selected = tarotCards[
        Math.floor(Math.random() * tarotCards.length)
      ];

      const reversed = Math.random() < 0.5;

      const meaning = reversed
        ? "【逆位置】" + selected.meaning + " 今は少し立ち止まり、焦らず整えることが大切です。"
        : "【正位置】" + selected.meaning;

      message.innerHTML = `
        <div class="result-card">
          <p class="eyebrow">${category}の占い結果</p>
          <div class="tarot-symbol">✦ ${selected.symbol} ✦</div>
          <h3>${selected.name}</h3>
          <p class="result-position">${reversed ? "逆位置" : "正位置"}</p>
          <p class="result-meaning">${meaning}</p>
          <button id="retry-button" class="start-button">もう一度占う</button>
        </div>
      `;

      document.getElementById("retry-button").addEventListener("click", () => {
        card.click();
      });

      message.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});


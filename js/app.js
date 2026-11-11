
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fortune-card");
  const message = document.getElementById("selection-message");

  console.log("ORACLE AI 起動");
  console.log("占いボタン数:", cards.length);

  if (!message) {
    console.error("selection-message が見つかりません");
    return;
  }

  if (cards.length === 0) {
    message.textContent = "占いボタンが見つかりません。HTMLを確認してください。";
    return;
  }

  const fortuneTypes = {
    love: "恋愛運",
    work: "仕事運",
    money: "金運",
    general: "総合運"
  };

  const tarotCards = [
    ["愚者", "0", "新しい冒険が始まります。好奇心を大切に。"],
    ["魔術師", "I", "あなたには未来を切り開く力があります。"],
    ["女教皇", "II", "自分の直感を信じてみましょう。"],
    ["女帝", "III", "愛情と豊かさに恵まれる兆しです。"],
    ["皇帝", "IV", "計画性と責任感が成功の鍵です。"],
    ["教皇", "V", "信頼できる人から良い助言を得られそうです。"],
    ["恋人", "VI", "自分の気持ちに正直になりましょう。"],
    ["戦車", "VII", "迷わず目標に向かって進みましょう。"],
    ["力", "VIII", "穏やかな強さが幸運を引き寄せます。"],
    ["隠者", "IX", "自分自身と向き合う時間を大切に。"],
    ["運命の輪", "X", "新しいチャンスが訪れそうです。"],
    ["正義", "XI", "冷静で公平な判断を心がけましょう。"],
    ["吊るされた男", "XII", "視点を変えると答えが見えてきます。"],
    ["死神", "XIII", "終わりは新しい始まりです。"],
    ["節制", "XIV", "バランスを整えて自然体で過ごしましょう。"],
    ["悪魔", "XV", "執着や思い込みを手放しましょう。"],
    ["塔", "XVI", "変化の先に新しい可能性があります。"],
    ["星", "XVII", "希望を持って進んでください。"],
    ["月", "XVIII", "焦らず状況を見極めましょう。"],
    ["太陽", "XIX", "明るい未来の兆し。自分らしく楽しんで。"],
    ["審判", "XX", "過去の経験が新しいチャンスにつながります。"],
    ["世界", "XXI", "目標が実を結ぶときです。"]
  ];

  function drawFortune(type) {
    try {
      const category = fortuneTypes[type];

      if (!category) {
        throw new Error("占いの種類を確認できません");
      }

      const selected =
        tarotCards[Math.floor(Math.random() * tarotCards.length)];

      const reversed = Math.random() < 0.5;

      const meaning = reversed
        ? "【逆位置】" + selected[2] +
          " 今は少し立ち止まり、焦らず整えることが大切です。"
        : "【正位置】" + selected[2];

      message.innerHTML = `
        <div class="result-card">
          <p class="eyebrow">${category}の占い結果</p>
          <div class="tarot-symbol">✦ ${selected[1]} ✦</div>
          <h3>${selected[0]}</h3>
          <p class="result-position">
            ${reversed ? "逆位置" : "正位置"}
          </p>
          <p class="result-meaning">${meaning}</p>
          <button id="retry-button" class="start-button" type="button">
            もう一度占う
          </button>
        </div>
      `;

      document.getElementById("retry-button")
        .addEventListener("click", () => drawFortune(type));

      message.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    } catch (error) {
      console.error("占いエラー:", error);
      message.textContent =
        "占いの処理でエラーが発生しました: " + error.message;
    }
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      drawFortune(card.dataset.type);
    });
  });

  message.textContent = "占いの準備ができました。テーマを選んでください。";
});

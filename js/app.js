
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fortune-card");
  const message = document.getElementById("selection-message");

  // Cloudflare Workerの接続先
  const AI_API_URL = "https://oracle-ai-api.murata08301.workers.dev/";

  const fortuneTypes = {
    love: "恋愛運",
    work: "仕事運",
    money: "金運",
    general: "総合運"
  };

  const spreads = {
    1: {
      name: "1枚引き",
      description: "今日の運勢",
      positions: ["今日のあなたへのメッセージ"]
    },
    3: {
      name: "3枚引き",
      description: "過去・現在・未来",
      positions: ["過去", "現在", "未来"]
    },
    5: {
      name: "5枚引き",
      description: "より詳しい運勢",
      positions: [
        "現在の状況",
        "あなたの課題",
        "周囲の影響",
        "アドバイス",
        "これからの未来"
      ]
    }
  };

  const tarotCards = [
    ["愚者", "0", "新しい冒険が始まります。好奇心を大切にして、一歩踏み出してみましょう。"],
    ["魔術師", "I", "あなたには新しい未来を切り開く力があります。自信を持って行動しましょう。"],
    ["女教皇", "II", "今は心を落ち着けるとき。自分の直感を信じてみましょう。"],
    ["女帝", "III", "豊かさと愛情に恵まれる兆し。周囲とのつながりを大切に。"],
    ["皇帝", "IV", "計画性と責任感が成功の鍵。自分の目標を明確にしましょう。"],
    ["教皇", "V", "信頼できる人から良い助言を得られそうです。"],
    ["恋人", "VI", "心がときめく選択のとき。自分の気持ちに正直になりましょう。"],
    ["戦車", "VII", "前進する力が高まっています。迷わず目標に向かいましょう。"],
    ["力", "VIII", "穏やかな強さが幸運を引き寄せます。焦らず進みましょう。"],
    ["隠者", "IX", "一人で考える時間が大切です。答えはあなたの内側にあります。"],
    ["運命の輪", "X", "運気が動き始めています。訪れるチャンスを逃さないで。"],
    ["正義", "XI", "冷静な判断が大切。公平な視点で物事を見つめましょう。"],
    ["吊るされた男", "XII", "視点を変えることで新しい答えが見えてきます。"],
    ["死神", "XIII", "終わりは新しい始まり。変化を恐れず受け入れましょう。"],
    ["節制", "XIV", "バランスを整えるとき。無理をせず自然体で過ごしましょう。"],
    ["悪魔", "XV", "執着や思い込みを手放すことで、自由を取り戻せます。"],
    ["塔", "XVI", "予想外の変化があっても、新しい可能性につながります。"],
    ["星", "XVII", "希望の光が差し込んでいます。夢を大切にしてください。"],
    ["月", "XVIII", "不安に惑わされず、焦らず状況を見極めましょう。"],
    ["太陽", "XIX", "明るい未来の兆し。自分らしく楽しむことが幸運の鍵です。"],
    ["審判", "XX", "過去の経験が新しいチャンスにつながりそうです。"],
    ["世界", "XXI", "一つの目標が実を結ぶとき。達成感を味わいましょう。"]
  ];

  let selectedType = null;
  let selectedSpread = null;

  // 占い方法を表示
  function showSpreadOptions(type) {
    selectedType = type;

    const category = fortuneTypes[type];

    message.innerHTML = `
      <div class="result-card">
        <p class="eyebrow">${category}</p>
        <h3>占い方法を選んでください</h3>

        <div class="spread-options">
          <button class="spread-button" data-spread="1">
            <strong>1枚引き</strong>
            <span>今日の運勢</span>
          </button>

          <button class="spread-button" data-spread="3">
            <strong>3枚引き</strong>
            <span>過去・現在・未来</span>
          </button>

          <button class="spread-button" data-spread="5">
            <strong>5枚引き</strong>
            <span>より詳しい運勢</span>
          </button>
        </div>
      </div>
    `;

    message.querySelectorAll(".spread-button").forEach(button => {
      button.addEventListener("click", () => {
        drawFortune(type, Number(button.dataset.spread));
      });
    });

    message.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  // Gemini AIに鑑定を依頼
  async function requestAI(type, results) {
    const aiArea = document.getElementById("ai-reading");

    if (!aiArea) return;

    aiArea.innerHTML = `
      <div class="ai-reading-card">
        <p class="eyebrow">ORACLE AI</p>
        <h3>✨ あなたの運命を読み解いています</h3>
        <p>カードの意味を組み合わせて、AIが鑑定しています。</p>
        <div class="ai-loading">✦　✧　✦</div>
      </div>
    `;

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: type,
          cards: results.map(result => ({
            name: result.name,
            position: result.position,
            reversed: result.reversed
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI鑑定に失敗しました。");
      }

      if (!data.reading) {
        throw new Error("鑑定結果を取得できませんでした。");
      }

      // AIの文章はHTMLとして扱わず安全に表示
      aiArea.innerHTML = `
        <div class="ai-reading-card">
          <p class="eyebrow">ORACLE AI MESSAGE</p>
          <h3>✨ AIからの鑑定メッセージ</h3>
          <div id="ai-reading-text" class="ai-reading-text"></div>
        </div>
      `;

      document.getElementById("ai-reading-text").textContent =
        data.reading;

    } catch (error) {
      console.error("AI鑑定エラー:", error);

      aiArea.innerHTML = `
        <div class="ai-reading-card ai-error">
          <p class="eyebrow">ORACLE AI</p>
          <h3>AI鑑定を取得できませんでした</h3>
          <p id="ai-error-message"></p>
          <button id="ai-retry-button" class="start-button" type="button">
            AI鑑定をもう一度試す
          </button>
        </div>
      `;

      document.getElementById("ai-error-message").textContent =
        error.message;

      document.getElementById("ai-retry-button")
        .addEventListener("click", () => {
          requestAI(type, results);
        });
    }
  }

  // カードを引く
  function drawFortune(type, count) {
    try {
      const category = fortuneTypes[type];
      const spread = spreads[count];

      if (!category || !spread) {
        throw new Error("占いの種類を確認できません。");
      }

      selectedType = type;
      selectedSpread = count;

      // カードをシャッフルして重複なしで選ぶ
      const shuffled = [...tarotCards];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const drawnCards = shuffled.slice(0, count);

      const results = drawnCards.map((card, index) => {
        const reversed = Math.random() < 0.5;

        const meaning = reversed
          ? card[2] + " 本来の力をうまく発揮できないときかもしれません。焦らず、自分の気持ちを整えてみましょう。"
          : card[2];

        return {
          name: card[0],
          symbol: card[1],
          reversed,
          position: spread.positions[index],
          meaning
        };
      });

      const resultHTML = results.map((result, index) => `
        <article class="reading-card">
          <p class="reading-position">
            ${index + 1}. ${result.position}
          </p>

          <div class="tarot-symbol ${result.reversed ? "is-reversed" : ""}">
            ✦ ${result.symbol} ✦
          </div>

          <h3>${result.name}</h3>

          <p class="result-position">
            ${result.reversed ? "逆位置" : "正位置"}
          </p>

          <p class="result-meaning">
            ${result.meaning}
          </p>
        </article>
      `).join("");

      message.innerHTML = `
        <div class="result-card reading-result">
          <p class="eyebrow">${category}の占い結果</p>
          <h3>${spread.name}</h3>
          <p class="spread-description">${spread.description}</p>

          <div class="reading-cards">
            ${resultHTML}
          </div>

          <div id="ai-reading">
            <div class="ai-reading-card">
              <p>AI鑑定を準備しています...</p>
            </div>
          </div>

          <button id="retry-button" class="start-button" type="button">
            もう一度占う
          </button>

          <button id="back-button" class="back-button" type="button">
            占い方法を選び直す
          </button>
        </div>
      `;

      document.getElementById("retry-button")
        .addEventListener("click", () => {
          drawFortune(type, count);
        });

      document.getElementById("back-button")
        .addEventListener("click", () => {
          showSpreadOptions(type);
        });

      message.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      // カード表示後にAI鑑定を開始
      requestAI(type, results);

    } catch (error) {
      console.error("占いエラー:", error);
      message.textContent =
        "占いの処理でエラーが発生しました: " + error.message;
    }
  }

  // 最初のテーマ選択
  cards.forEach(card => {
    card.addEventListener("click", () => {
      showSpreadOptions(card.dataset.type);
    });
  });

  message.textContent =
    "占いの準備ができました。テーマを選んでください。";

  console.log("ORACLE AI 占い機能 起動完了");
});

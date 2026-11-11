
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fortune-card");
  const message = document.getElementById("selection-message");

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

  // 大アルカナ22枚
  const majorCards = [
    ["愚者", "0", "新しい冒険の始まり。自由な発想と好奇心が未来を開きます。"],
    ["魔術師", "I", "才能と行動力が高まっています。自分の力を信じて始めましょう。"],
    ["女教皇", "II", "直感と冷静さが大切なとき。心の声に耳を傾けましょう。"],
    ["女帝", "III", "愛情と豊かさの象徴。人とのつながりを大切にしましょう。"],
    ["皇帝", "IV", "責任と安定が成功の鍵。計画的に行動しましょう。"],
    ["教皇", "V", "信頼できる人から学ぶことで道が開けます。"],
    ["恋人", "VI", "心から望む選択をするタイミング。愛情と調和を大切に。"],
    ["戦車", "VII", "前進する力が高まっています。目標に向かって進みましょう。"],
    ["力", "VIII", "優しさと忍耐が本当の強さになります。"],
    ["隠者", "IX", "自分と向き合う時間が必要です。答えを急がないで。"],
    ["運命の輪", "X", "運命が動き出す兆し。チャンスを受け入れましょう。"],
    ["正義", "XI", "公平な判断と誠実さが大切です。"],
    ["吊るされた男", "XII", "視点を変えることで新しい可能性が見えてきます。"],
    ["死神", "XIII", "古いものを手放し、新しい始まりを迎えるときです。"],
    ["節制", "XIV", "調和とバランスを取り戻しましょう。"],
    ["悪魔", "XV", "執着や誘惑に注意。自分を縛るものを見直しましょう。"],
    ["塔", "XVI", "突然の変化が新しい道を作る可能性があります。"],
    ["星", "XVII", "希望と回復の兆し。未来を信じて進みましょう。"],
    ["月", "XVIII", "不安や迷いが生じやすいとき。事実を見極めましょう。"],
    ["太陽", "XIX", "喜びと成功の象徴。自分らしく過ごしましょう。"],
    ["審判", "XX", "再出発と目覚めのとき。過去の経験を活かしましょう。"],
    ["世界", "XXI", "完成と達成の象徴。努力が実を結ぶときです。"]
  ].map(card => ({
    name: card[0],
    symbol: card[1],
    suit: "大アルカナ",
    meaning: card[2]
  }));

  // 小アルカナ56枚
  // 各スートはエースからキングまで14枚
  const minorData = [
    {
      suit: "ワンド",
      symbol: "🔥",
      cards: [
        ["エース", "新しい情熱や挑戦が始まります。行動を起こす好機です。"],
        ["2", "将来の計画を立てるとき。視野を広く持ちましょう。"],
        ["3", "努力の成果が見え始めます。次の展開を考えましょう。"],
        ["4", "安心できる環境と喜び。周囲との調和を大切に。"],
        ["5", "意見の衝突や競争。冷静に自分の考えを伝えましょう。"],
        ["6", "努力が認められる兆し。自信を持って進みましょう。"],
        ["7", "困難に立ち向かうとき。自分の立場を守りましょう。"],
        ["8", "物事が急速に進展します。好機を逃さないで。"],
        ["9", "最後まで気を抜かずに。経験があなたを支えます。"],
        ["10", "責任や負担が増えています。抱え込みすぎないように。"],
        ["ペイジ", "新しい情熱や知らせ。好奇心を大切にしましょう。"],
        ["ナイト", "勢いと行動力。大胆な一歩が変化を生みます。"],
        ["クイーン", "明るさと自信。自分らしい魅力を発揮しましょう。"],
        ["キング", "リーダーシップと決断力。目標を明確にしましょう。"]
      ]
    },
    {
      suit: "カップ",
      symbol: "💧",
      cards: [
        ["エース", "新しい愛情や感情の始まり。心を開いてみましょう。"],
        ["2", "心が通じ合う関係。信頼と協力を大切に。"],
        ["3", "喜びや友情。仲間との時間が幸運を運びます。"],
        ["4", "気持ちが停滞しているかもしれません。新しい可能性に目を向けて。"],
        ["5", "失望や悲しみ。失ったものだけでなく残されたものも見ましょう。"],
        ["6", "懐かしい思い出や再会。過去から温かな力を得られます。"],
        ["7", "選択肢が多いとき。夢と現実を整理しましょう。"],
        ["8", "次の段階へ進むための決断。心の満足を大切に。"],
        ["9", "願いが叶う兆し。自分の幸せを受け取りましょう。"],
        ["10", "愛情と調和に満ちた関係。身近な人を大切に。"],
        ["ペイジ", "優しい知らせや新しい感情。素直な気持ちを表現しましょう。"],
        ["ナイト", "ロマンチックな行動や誘い。思いやりを持って進みましょう。"],
        ["クイーン", "共感力と優しさ。自分と相手の心を大切に。"],
        ["キング", "感情を穏やかに扱う成熟した心。落ち着いた判断を。"]
      ]
    },
    {
      suit: "ソード",
      symbol: "⚔️",
      cards: [
        ["エース", "真実が明らかになるとき。明確な決断をしましょう。"],
        ["2", "決断を迷っている状態。情報を整理して向き合いましょう。"],
        ["3", "心の痛みや悲しみ。無理をせず気持ちを癒やしましょう。"],
        ["4", "休息と回復が必要です。今は無理をしないで。"],
        ["5", "争いや勝ち負けへのこだわり。大切なものを見失わないで。"],
        ["6", "困難から離れ、新しい環境へ進むときです。"],
        ["7", "慎重な計画が必要です。誠実さも忘れずに。"],
        ["8", "思い込みによる制限。別の視点から考えてみましょう。"],
        ["9", "不安や心配が強くなっています。一人で抱え込まないで。"],
        ["10", "一つの区切りを迎えるとき。終わりの先に始まりがあります。"],
        ["ペイジ", "新しい情報や学び。注意深く状況を観察しましょう。"],
        ["ナイト", "強い意志と行動力。急ぎすぎないことも大切です。"],
        ["クイーン", "知性と冷静な判断。自分の考えを明確にしましょう。"],
        ["キング", "論理と公正さ。感情に流されず判断しましょう。"]
      ]
    },
    {
      suit: "ペンタクル",
      symbol: "🪙",
      cards: [
        ["エース", "金銭や仕事に新しいチャンス。現実的な一歩を踏み出しましょう。"],
        ["2", "仕事や生活のバランス。優先順位を整理しましょう。"],
        ["3", "努力と技術が評価されます。協力することも大切です。"],
        ["4", "安定を守りたい気持ち。執着しすぎないようにしましょう。"],
        ["5", "経済面や心の不安。助けを求めることも選択肢です。"],
        ["6", "与えることと受け取ること。公平な関係を築きましょう。"],
        ["7", "努力の成果を待つとき。焦らず長期的に考えましょう。"],
        ["8", "技術と経験を積み重ねるとき。地道な努力が実を結びます。"],
        ["9", "自立と豊かさ。これまでの努力を認めましょう。"],
        ["10", "長期的な安定と繁栄。家族や仲間との基盤を大切に。"],
        ["ペイジ", "学びや仕事の新しい機会。基礎を大切にしましょう。"],
        ["ナイト", "着実な努力と責任感。ゆっくりでも前進しましょう。"],
        ["クイーン", "現実的な優しさと豊かさ。生活を整えましょう。"],
        ["キング", "経済的な安定と管理能力。堅実な判断が成功につながります。"]
      ]
    }
  ];

  const minorCards = [];

  minorData.forEach(suit => {
    suit.cards.forEach(card => {
      minorCards.push({
        name: `${suit.suit}の${card[0]}`,
        symbol: suit.symbol,
        suit: suit.suit,
        meaning: card[1]
      });
    });
  });

  // 全78枚
  const tarotCards = [...majorCards, ...minorCards];

  console.log("登録カード数:", tarotCards.length);

  let selectedType = null;

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

      // 78枚をシャッフル
      const shuffled = [...tarotCards];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // 重複なしでカードを選択
      const drawnCards = shuffled.slice(0, count);

      const results = drawnCards.map((card, index) => {
        const reversed = Math.random() < 0.5;

        const reversedMeaning =
          "逆位置では、本来の力がうまく発揮できない可能性があります。焦らず状況を見直し、無理のない行動を心がけましょう。";

        const meaning = reversed
          ? card.meaning + " " + reversedMeaning
          : card.meaning;

        return {
          name: card.name,
          symbol: card.symbol,
          suit: card.suit,
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

          <p class="reading-position">${result.suit}</p>

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

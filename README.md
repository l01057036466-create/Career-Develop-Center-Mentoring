<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>귀살대 최종 선별 테스트 v5.1</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        :root {
            --bg-dark: #1a1a2e; --bg-mid: #16213e; --primary: #e94560; --secondary: #0f3460;
            --text-light: #e0e0e0; --text-mid: #c0c0c0; --font-main: 'Noto Sans KR', sans-serif;
        }
        body {
            font-family: var(--font-main); background-color: var(--bg-dark); color: var(--text-light);
            display: flex; justify-content: center; align-items: center; min-height: 100vh;
            margin: 0; padding: 20px 0; text-align: center;
        }
        .container {
            background-color: var(--bg-mid); border-radius: 15px; padding: 20px 30px;
            box-shadow: 0 0 30px rgba(233, 69, 96, 0.3); border: 1px solid var(--primary);
            width: 90%; max-width: 600px; box-sizing: border-box;
        }
        h1, h2, h3 { color: var(--primary); }
        #start-screen h1 { font-size: 2.2em; margin-bottom: 10px; }
        #start-screen p { font-size: 1.1em; color: var(--text-mid); line-height: 1.6; }
        #intro-text { font-size: 0.95em; color: var(--text-mid); background-color: var(--bg-dark); padding: 15px; border-radius: 10px; margin-top:20px; text-align: justify;}
        button {
            font-family: var(--font-main); background-color: var(--primary); color: #ffffff;
            border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.2em;
            cursor: pointer; transition: background-color 0.3s, transform 0.2s;
            margin-top: 20px; font-weight: bold;
        }
        .secondary-btn { background-color: var(--secondary); margin-left: 10px; }
        button:hover { background-color: #c7304a; transform: scale(1.05); }
        .secondary-btn:hover { background-color: #1f4f8b; }
        .question-container, .result-container, .chart-container { display: none; }
        #question-text { font-size: 1.4em; margin-bottom: 25px; font-weight: bold; line-height: 1.5; min-height: 90px; }
        .answer-btn {
            display: block; width: 100%; box-sizing: border-box; background-color: var(--secondary);
            margin: 10px 0; padding: 15px; font-size: 0.95em; border-radius: 10px; text-align: left;
        }
        .answer-btn:hover { background-color: #1f4f8b; transform: scale(1.02); }
        #progress-bar-container { width: 100%; background-color: var(--secondary); border-radius: 5px; margin-top: 30px; height: 10px; }
        #progress-bar { width: 0%; height: 100%; background-color: var(--primary); border-radius: 5px; transition: width 0.3s; }
        .result-container h2 { font-size: 1.5em; }
        #result-image { width: 180px; height: 180px; border-radius: 50%; margin-bottom: 15px; border: 4px solid var(--primary); object-fit: cover; }
        #result-main-trait { font-size: 2.5em; font-weight: bold; color: #ffffff; margin: 10px 0; }
        #result-sub-trait { font-size: 1.3em; color: var(--text-mid); font-weight: bold; }
        #result-description { 
            font-size: 1.1em; text-align: justify; line-height: 1.8; 
            margin-top: 25px; color: var(--text-light); white-space: pre-wrap; 
        }
        .chart-container { text-align: left; max-height: 80vh; overflow-y: auto; padding-right: 15px; }
        .chart-container h3 { text-align: center; font-size: 1.8em; }
        #dynamic-chart-content h4 { color: #ffffff; border-left: 4px solid var(--primary); padding-left: 10px; margin-top: 30px; }
        #dynamic-chart-content p { margin-left: 14px; line-height: 1.6; }
        #dynamic-chart-content b { color: var(--text-mid); }
        .button-group { display: flex; justify-content: center; }
        .stats-container { margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--secondary); }
        .stat-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .stat-title { font-weight: bold; font-size: 0.9em; }
        .stat-bar { height: 15px; background-color: var(--secondary); flex-grow: 1; margin: 0 10px; border-radius: 10px; position: relative; }
        .stat-fill { background: linear-gradient(90deg, #e94560, #ff7e5f); height: 100%; border-radius: 10px; }
        #mentoring-score-container { background-color: var(--bg-dark); padding: 15px; border-radius: 10px; margin-top: 20px; }
        #mentoring-recommendation { font-size: 1.1em; font-weight: bold; white-space: pre-wrap; }
    </style>
</head>
<body>

<div class="container">
    <div id="start-screen">
        <h1>⚔️ 귀살대 최종 선별 테스트 v5.1 ⚔️</h1>
        <p>단순한 심리테스트를 넘어,<br>당신의 내면에 숨겨진 진짜 '호흡'을 분석합니다.</p>
        <div id="intro-text">
            <p>당신은 사람을 잡아먹는 '혈귀(오니)'에게 소중한 것을 잃고, 그들을 사냥하는 '귀살대'의 검사가 되었습니다. 지금부터 당신은 귀살대원으로서 수많은 선택의 순간에 놓이게 됩니다. 당신의 신념과 가치관에 따라 질문에 답하며, 당신의 영혼에 잠든 진정한 '호흡'을 찾아보세요.</p>
        </div>
        <button onclick="startQuiz()">테스트 시작</button>
    </div>

    <div class="question-container" id="quiz-screen">
        <p id="question-text"></p>
        <div id="answer-buttons"></div>
        <div id="progress-bar-container"><div id="progress-bar"></div></div>
    </div>

    <div class="result-container" id="result-screen">
        <h2>당신의 유형은...</h2>
        <img id="result-image" src="" alt="결과 캐릭터 이미지">
        <h2 id="result-main-trait"></h2>
        <p id="result-sub-trait"></p>
        <p id="result-description"></p>
        
        <div class="stats-container">
            <h3>귀살대 성향 다면체</h3>
            <div class="stat-item"><span class="stat-title">개인</span><div class="stat-bar"><div id="dim1-fill" class="stat-fill"></div></div><span class="stat-title">대의</span></div>
            <div class="stat-item"><span class="stat-title">이성</span><div class="stat-bar"><div id="dim2-fill" class="stat-fill"></div></div><span class="stat-title">감성</span></div>
            <div class="stat-item"><span class="stat-title">자유</span><div class="stat-bar"><div id="dim3-fill" class="stat-fill"></div></div><span class="stat-title">규율</span></div>
            <div class="stat-item"><span class="stat-title">현실</span><div class="stat-bar"><div id="dim4-fill" class="stat-fill"></div></div><span class="stat-title">희망</span></div>
            <div class="stat-item"><span class="stat-title">수비</span><div class="stat-bar"><div id="dim5-fill" class="stat-fill"></div></div><span class="stat-title">공격</span></div>
        </div>

        <div id="mentoring-score-container">
            <p id="mentoring-recommendation"></p>
        </div>

        <div class="button-group">
            <button onclick="restartQuiz()">다시하기</button>
            <button onclick="showChart()" class="secondary-btn">나의 궁합 보기</button>
        </div>
    </div>

    <div class="chart-container" id="chart-screen">
        <h3><span id="chart-owner-name"></span><span> 님의 궁합표</span></h3>
        <div id="dynamic-chart-content"></div>
        <div class="button-group">
            <button onclick="showResultView()">결과로 돌아가기</button>
        </div>
    </div>
</div>

<script>
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const chartScreen = document.getElementById('chart-screen');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const progressBar = document.getElementById('progress-bar');
    const resultImage = document.getElementById('result-image');
    const resultMainTrait = document.getElementById('result-main-trait');
    const resultSubTrait = document.getElementById('result-sub-trait');
    const resultDescription = document.getElementById('result-description');
    const chartOwnerName = document.getElementById('chart-owner-name');
    const dynamicChartContent = document.getElementById('dynamic-chart-content');
    const dimFills = [
        document.getElementById('dim1-fill'), document.getElementById('dim2-fill'),
        document.getElementById('dim3-fill'), document.getElementById('dim4-fill'),
        document.getElementById('dim5-fill')
    ];
    const mentoringRecommendation = document.getElementById('mentoring-recommendation');
    
    let currentQuestionIndex = 0;
    // D1: 대의-개인, D2: 감성-이성, D3: 자유-규율, D4: 희망-현실, D5: 공격-수비
    let scores = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
    let lastResultKey = '';

    const questions = [
        { q: "Q1. 당신과 동료가 혈귀에게 치명상을 입고 해독약은 하나뿐입니다. 동료는 당신에게 약을 양보합니다. 당신의 선택은?", a: [
            { t: "동료의 뜻을 존중, 약을 먹고 그의 의지를 이어받아 반드시 살아남겠다고 맹세한다.", v: { D1: 2, D2: -1, D3: 1, D4: -1, D5: 1 } },
            { t: "'두 명 다 살 방법이 있을 거야!' 어떻게든 다른 방법을 찾기 위해 주변을 필사적으로 수색한다.", v: { D1: 1, D2: 2, D3: -1, D4: 3, D5: 0 } },
            { t: "약을 반으로 나누어 함께 먹는다. 효과가 절반이 되더라도, 함께 살아남을 가능성에 희망을 건다.", v: { D1: 2, D2: 2, D3: 0, D4: 2, D5: -1 } },
            { t: "동료를 설득하여 약을 먹게 한다. 나는 정신력으로 버틸 수 있다고, 너라도 살아남아야 한다고 강하게 말한다.", v: { D1: 3, D2: 3, D3: 0, D4: 1, D5: -2 } },
            { t: "냉정하게 판단한다. 한 명이라도 살아남는 것이 귀살대를 위한 길. 동료의 눈을 보고 조용히 약을 먹는다.", v: { D1: -2, D2: -3, D3: 2, D4: -2, D5: 0 } }
        ]},
        { q: "Q2. 강력한 혈귀가 당신의 소중한 후배를 인질로 잡고, 칼을 버리면 살려주겠다고 제안합니다. 당신의 선택은?", a: [
            { t: "칼을 버리는 척하며 시선을 분산시킨 후, 숨겨둔 예비 칼로 허점을 노려 공격한다.", v: { D1: -1, D2: -2, D3: -1, D4: -1, D5: 3 } },
            { t: "일단 칼을 버리고 후배의 안전을 확보한다. 맨손 격투술이든 뭐든, 다른 방법으로 혈귀를 상대할 방법을 찾는다.", v: { D1: 2, D2: 1, D3: 0, D4: 2, D5: -2 } },
            { t: "후배에게 '너를 믿는다!'라고 외치며, 후배가 스스로 빠져나올 기회를 만들도록 혈귀를 교란하는 공격을 시작한다.", v: { D1: 1, D2: 1, D3: -2, D4: 1, D5: 2 } },
            { t: "'귀살대원으로서 각오했을 터!' 후배의 희생을 각오하고, 혈귀와 후배를 동시에 베어버리는 최선의 공격을 감행한다.", v: { D1: -3, D2: -3, D3: 2, D4: -3, D5: 1 } },
            { t: "혈귀와의 대화를 시도하며 시간을 번다. 그의 목적이 무엇인지 파악하여 심리적으로 흔든다.", v: { D1: 2, D2: 2, D3: 1, D4: 1, D5: -1 } }
        ]},
        { q: "Q3. 당신의 '일륜도'를 만들어 준 도공이 인질로 잡혔지만, 그 혈귀를 놓치면 더 큰 마을이 위험해집니다. 당신의 선택은?", a: [
            { t: "망설임 없이 도공을 구한다. 한 명의 생명도, 특히 은인의 생명은 포기할 수 없다.", v: { D1: 3, D2: 2, D3: -1, D4: 1, D5: 0 } },
            { t: "도공 구출과 혈귀 추적을 동시에 진행할 방법을 빠르게 구상한다. 둘 다 포기할 수 없다.", v: { D1: 1, D2: -1, D3: 0, D4: 2, D5: 1 } },
            { t: "괴롭지만, 더 큰 비극을 막기 위해 마을로 향한다. 도공에게는 마음속으로 사죄한다.", v: { D1: -2, D2: 0, D3: 2, D4: -2, D5: -1 } },
            { t: "이것은 혈귀의 함정일 수 있다. 섣불리 움직이지 않고, 신중히 상황을 분석하여 최적의 수를 찾는다.", v: { D1: -1, D2: -3, D3: 1, D4: -2, D5: -2 } },
            { t: "동료에게 도공 구출을 맡기고, 나는 혈귀를 추적한다. 신뢰와 역할 분담으로 둘 다 해결하려 한다.", v: { D1: 2, D2: 0, D3: 1, D4: 1, D5: 2 } }
        ]},
        { q: "Q4. 당신의 의견에 동료가 '그건 너무 이상적이야'라고 반박합니다. 당신의 반응은?", a: [
            { t: "'이상이라도 좋다, 우리는 그것을 목표로 해야 한다'고 나의 신념을 다시 한번 열정적으로 설득한다.", v: { D1: 2, D2: 2, D3: -1, D4: 3, D5: 1 } },
            { t: "그의 우려를 존중하고, 현실적인 대안을 함께 찾아본다. 그의 의견에도 일리가 있다.", v: { D1: 2, D2: 1, D3: 1, D4: 0, D5: -1 } },
            { t: "일단 그의 의견을 수용하는 척하고, 결과로 나의 이상이 옳았음을 증명해 보인다.", v: { D1: -2, D2: -1, D3: -2, D4: -1, D5: 2 } },
            { t: "감정적인 논쟁은 피하고, 데이터와 이전 사례를 들어 내 의견의 실현 가능성을 논리적으로 증명한다.", v: { D1: 0, D2: -3, D3: 2, D4: -2, D5: 0 } },
            { t: "나의 신념을 이해하지 못하는 그를 안타깝게 여기며, 더 이상 논쟁하지 않고 내 방식대로 추진한다.", v: { D1: -3, D2: 0, D3: -2, D4: -1, D5: 1 } }
        ]},
        { q: "Q5. 임무 중, 강력한 혈귀의 공격으로 당신의 검이 부러졌습니다. 당신의 다음 행동은?", a: [
            { t: "부러진 검이라도 고쳐 쥐고, 동료를 지키기 위한 방패가 된다. 여기서 물러설 수 없다.", v: { D1: 3, D2: 1, D3: 2, D4: 1, D5: -3 } },
            { t: "맨손 격투술이나 주변 지형지물을 이용하여 어떻게든 계속 싸울 방법을 찾는다.", v: { D1: 0, D2: 0, D3: -2, D4: 0, D5: 3 } },
            { t: "일단 후퇴하여 전력을 재정비하는 것이 현명하다고 판단, 동료를 설득하여 함께 후퇴한다.", v: { D1: 1, D2: -2, D3: 1, D4: -2, D5: -2 } },
            { t: "동료에게 내 몫까지 싸워달라고 부탁하며, 그의 서포트에 모든 것을 건다.", v: { D1: 2, D2: 2, D3: 1, D4: 2, D5: -1 } },
            { t: "이것이 나의 한계인가. 절망감에 휩싸이지만, 마지막 순간까지 포기하지는 않는다.", v: { D1: 0, D2: 3, D3: 0, D4: -3, D5: 0 } }
        ]},
        // ... (이하 Q6 ~ Q20 질문 데이터 생략)
        { q: "Q20. 모든 싸움이 끝난 세상에서 당신은 무엇을 하고 있을까?", a: [
            { t: "소중한 사람들과 함께 평범하고 행복한 나날을 보낸다.", v: { D1: 3, D2: 3, D3: 1, D4: 2, D5: -2 } },
            { t: "새로운 목표(수련, 탐험 등)를 찾아 끊임없이 나아간다.", v: { D1: -2, D2: -1, D3: -2, D4: 0, D5: 2 } },
            { t: "떠나간 동료들을 기리며, 남은 이들을 지키며 살아간다.", v: { D1: 2, D2: 2, D3: 2, D4: -1, D5: -1 } },
            { t: "세상을 자유롭게 유랑하며 새로운 것을 경험한다.", v: { D1: 0, D2: 1, D3: -3, D4: 1, D5: 0 } },
            { t: "아무도 없는 곳에서 조용히 살아간다.", v: { D1: -3, D2: -2, D3: 0, D4: -2, D5: -3 } }
        ]},
    ];

    const results = {
        // 결과 데이터는 이전과 동일하게 유지 (설명, 이미지, 점수 등)
        rengoku: { name: "렌고쿠 쿄쥬로", main: "열정 넘치는 행동대장", sub: "[개척자 타입]", desc: "...", score: 19, image: "..." },
        uzui: { name: "우즈이 텐겐", main: "화려한 해결사", sub: "[아티스트 타입]", desc: "...", score: 16, image: "..." },
        mitsuri: { name: "칸로지 미츠리", main: "사랑을 전파하는 치유자", sub: "[인플루언서 타입]", desc: "...", score: 17, image: "..." },
        tanjiro: { name: "카마도 탄지로", main: "따뜻한 공감 능력자", sub: "[개척자 타입]", desc: "...", score: 14, image: "..." },
        himejima: { name: "히메지마 교메이", main: "따뜻한 공감 능력자", sub: "[수호자 타입]", desc: "...", score: 18, image: "..." },
        sanemi: { name: "시나즈가와 사네미", main: "상처 입은 야수", sub: "[츤데레 타입]", desc: "...", score: 15, image: "..." },
        shinobu: { name: "코쵸우 시노부", main: "얼음처럼 차가운 복수자", sub: "[전략가 타입]", desc: "...", score: 16, image: "..." },
        iguro: { name: "이구로 오바나이", main: "상처 입은 야수", sub: "[완벽주의자 타입]", desc: "...", score: 15, image: "..." },
        giyu: { name: "토미오카 기유", main: "고요한 물의 검사", sub: "[독립적인 해결사 타입]", desc: "...", score: 12, image: "..." },
        muichiro: { name: "토키토 무이치로", main: "세상과 단절된 천재", sub: "[마이웨이 타입]", desc: "...", score: 11, image: "..." },
        nezuko: { name: "카마도 네즈코", main: "침묵의 수호자", sub: "[헌신적인 서포터 타입]", desc: "...", score: 9, image: "..." },
        kokushibo: { name: "코쿠시보", main: "정점을 추구하는 求道者", sub: "[엘리트 타입]", desc: "...", score: 3, image: "..." },
        akaza: { name: "아카자", main: "사랑하는 강자", sub: "[파이터 타입]", desc: "...", score: 4, image: "..." },
        doma: { name: "도우마", main: "쾌락을 탐닉하는 예술가", sub: "[매혹적인 관찰자 타입]", desc: "...", score: 1, image: "..." },
        gyokko: { name: "교코", main: "독자적인 예술가", sub: "[나르시시스트 타입]", desc: "...", score: 2, image: "..." },
        hantengu: { name: "한텐구", main: "세상에 대한 불신자", sub: "[피해자 타입]", desc: "...", score: 1, image: "..." },
        gyutaro: { name: "규타로 & 다키", main: "세상에 대한 불신자", sub: "[현실주의자 타입]", desc: "...", score: 2, image: "..." },
        ubuyashiki: { name: "우부야시키 카가야", main: "모든 것을 포용하는 통찰가", sub: "[성인(聖人) 타입]", desc: "...", score: 20, image: "..." },
        muzan: { name: "키부츠지 무잔", main: "모든 것을 지배하는 정복자", sub: "[군주 타입]", desc: "...", score: 0, image: "..." },
    };
    
    const compatibilityData = {
        rengoku: { love: "운명의 상대 (칸로지 미츠리): 당신의 뜨거운 열정과 미츠리의 따스한 사랑이 만나면, 세상 가장 밝은 빛을 내는 한 쌍이 될 것입니다.", friend: "최고의 동료 (우즈이 텐겐): 당신의 열정과 텐겐의 화려함은 최고의 시너지를 발휘하는 동료입니다. 두 사람이 함께라면 불가능한 임무는 없습니다.", warning: "피해야 할 상대 (코쿠시보): 완전한 강함만을 추구하는 그는 당신의 헌신적인 열정을 이해하지 못할 수 있습니다." },
        tanjiro: { love: "운명의 상대 (칸로지 미츠리, 카마도 네즈코): 당신의 따뜻함과 순수함은 서로에게 가장 큰 위안과 기쁨이 됩니다.", friend: "최고의 동료 (렌고쿠 쿄쥬로, 토미오카 기유): 당신을 올바른 길로 이끌어 줄 최고의 스승이자, 묵묵히 당신을 믿고 지지해 줄 든든한 아군입니다.", warning: "피해야 할 상대 (키부츠지 무잔): 당신의 모든 신념과 정반대에 있는 존재. 결코 함께할 수 없습니다." },
        giyu: { love: "운명의 상대 (코쵸우 시노부): 당신의 서툰 진심을 유일하게 알아주고, 그 상처를 보듬어줄 수 있는 사람입니다.", friend: "최고의 동료 (카마도 탄지로): 당신의 굳게 닫힌 마음을 끈질기게 두드려, 세상 밖으로 이끌어줄 유일한 동료입니다.", warning: "피해야 할 상대 (시나즈가와 사네미): 표현 방식이 다른 두 사람이 만나면 오해가 쌓이기 쉽습니다. 먼저 손을 내밀어 보세요." },
        // ... (이하 궁합표 데이터 생략, 별표 제거됨)
        default: { friend: "최고의 동료 (카마도 탄지로): 그의 긍정적인 에너지가 당신에게 좋은 영향을 줄 것입니다.", warning: "피해야 할 상대 (키부츠지 무잔): 당신과는 상극의 성향을 가졌습니다."}
    };

    function startQuiz() {
        startScreen.style.display = 'none'; quizScreen.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        while (answerButtons.firstChild) { answerButtons.removeChild(answerButtons.firstChild); }
        const currentQ = questions[currentQuestionIndex];
        questionText.innerText = currentQ.q;
        currentQ.a.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.t; button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(answer.v));
            answerButtons.appendChild(button);
        });
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    }

    function selectAnswer(values) {
        for (const key in values) { scores[key] += values[key]; }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) { showQuestion(); } else { calculateResult(); }
    }
    
    function calculateResult() {
        const profiles = {
            // D1: 대의-개인, D2: 감성-이성, D3: 자유-규율, D4: 희망-현실, D5: 공격-수비
            rengoku:   { D1: 8,  D2: 6,  D3: 5,  D4: 8,  D5: 7  },
            mitsuri:   { D1: 7,  D2: 10, D3: -4, D4: 9,  D5: 2  },
            himejima:  { D1: 10, D2: 8,  D3: 8,  D4: 2,  D5: -6 },
            tanjiro:   { D1: 9,  D2: 9,  D3: 2,  D4: 10, D5: 0  },
            sanemi:    { D1: 4,  D2: -8, D3: 6,  D4: -6, D5: 8  },
            shinobu:   { D1: 2,  D2: -9, D3: 9,  D4: -5, D5: 4  },
            giyu:      { D1: 3,  D2: -7, D3: 7,  D4: -8, D5: -3 },
            uzui:      { D1: 1,  D2: 5,  D3: -8, D4: 6,  D5: 6  },
            muichiro:  { D1: -5, D2: -5, D3: -2, D4: -4, D5: 3  },
            iguro:     { D1: 2,  D2: -8, D3: 10, D4: -7, D5: 1  },
            nezuko:    { D1: 8,  D2: 7,  D3: -6, D4: 5,  D5: -7 },
            kokushibo: { D1: -8, D2: -6, D3: 9,  D4: -9, D5: 9  },
            akaza:     { D1: -6, D2: -4, D3: 6,  D4: -3, D5: 10 },
            doma:      { D1: -10,D2: 4,  D3: -7, D4: 3,  D5: -5 },
            gyokko:    { D1: -9, D2: 1,  D3: -10,D4: 0,  D5: -2 },
            hantengu:  { D1: -4, D2: -10,D3: -5, D4: -10,D5: -10},
            gyutaro:   { D1: -7, D2: -7, D3: 3,  D4: -8, D5: 5  },
            ubuyashiki:{ D1: 10, D2: 10, D3: 4,  D4: 7,  D5: -8 },
            muzan:     { D1: -10,D2: -10,D3: 8,  D4: -10,D5: 9  }
        };
        let minDistance = Infinity;
        let resultKey = 'tanjiro';
        for (const key in profiles) {
            const profile = profiles[key];
            const distance = Math.sqrt(
                Math.pow(scores.D1 - profile.D1, 2) +
                Math.pow(scores.D2 - profile.D2, 2) +
                Math.pow(scores.D3 - profile.D3, 2) +
                Math.pow(scores.D4 - profile.D4, 2) +
                Math.pow(scores.D5 - profile.D5, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                resultKey = key;
            }
        }
        showResult(resultKey);
    }

    function showResult(key) {
        lastResultKey = key;
        const result = results[key];
        quizScreen.style.display = 'none'; chartScreen.style.display = 'none'; resultScreen.style.display = 'block';
        resultImage.src = result.image;
        resultMainTrait.innerText = result.main; resultSubTrait.innerText = result.sub;
        resultDescription.innerText = result.desc;
        
        const maxScore = 10; // 각 차원별 최대값
        const minScore = -10; // 각 차원별 최소값
        dimFills[0].style.width = `${Math.max(0, Math.min(100, ((scores.D1 - minScore) / (maxScore - minScore)) * 100))}%`;
        dimFills[1].style.width = `${Math.max(0, Math.min(100, ((scores.D2 - minScore) / (maxScore - minScore)) * 100))}%`;
        dimFills[2].style.width = `${Math.max(0, Math.min(100, ((scores.D3 - minScore) / (maxScore - minScore)) * 100))}%`;
        dimFills[3].style.width = `${Math.max(0, Math.min(100, ((scores.D4 - minScore) / (maxScore - minScore)) * 100))}%`;
        dimFills[4].style.width = `${Math.max(0, Math.min(100, ((scores.D5 - minScore) / (maxScore - minScore)) * 100))}%`;

        const mentoringScore = result.score;
        let recommendationText = `후배사랑 멘토링 적합도: ${mentoringScore}/20`;
        if (mentoringScore >= 16) {
            recommendationText += "\n당신은 모두에게 귀감이 되는 최고의 멘토입니다! 지금 바로 후배사랑 멘토링에 지원하세요!";
        } else if (mentoringScore >= 11) {
            recommendationText += "\n당신은 충분한 자질을 갖춘 훌륭한 멘토입니다! 당신의 따뜻함이 후배에게 큰 힘이 될 거예요.";
        } else if (mentoringScore >= 6) {
            recommendationText += "\n당신은 자신만의 방식으로 후배를 이끌 수 있는 잠재력이 있습니다. 조금만 용기를 내보세요!";
        } else {
            recommendationText += "\n팀 활동보다는 당신의 역량을 마음껏 펼칠 수 있는 개인 활동에서 더 빛날 수 있습니다!";
        }
        
        if (mentoringScore >= 11) {
             recommendationText += "\n\n[후배사랑 멘토링]은 바로 당신을 위한 무대입니다!";
        }
        
        mentoringRecommendation.innerText = recommendationText;
    }

    function showChart() {
        resultScreen.style.display = 'none'; chartScreen.style.display = 'block';
        const myName = results[lastResultKey].name;
        chartOwnerName.innerText = myName;
        const myCompatibility = compatibilityData[lastResultKey] || compatibilityData.default;
        let chartHtml = '';
        if (myCompatibility) {
            if (myCompatibility.love) { chartHtml += `<h4>❤️ 운명의 상대</h4><p>${myCompatibility.love}</p>`; }
            if (myCompatibility.friend) { chartHtml += `<h4>🤝 최고의 동료</h4><p>${myCompatibility.friend}</p>`; }
            if (myCompatibility.warning) { chartHtml += `<h4>⚠️ 피해야 할 상대</h4><p>${myCompatibility.warning}</p>`; }
            if (myCompatibility.strong_against) { chartHtml += `<h4>🔺 강한 상대</h4><p>${myCompatibility.strong_against}</p>`; }
            if (myCompatibility.weak_against) { chartHtml += `<h4>🔻 약한 상대</h4><p>${myCompatibility.weak_against}</p>`; }
        }
        dynamicChartContent.innerHTML = chartHtml;
    }

    function showResultView() {
        chartScreen.style.display = 'none'; resultScreen.style.display = 'block';
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        scores = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
        resultScreen.style.display = 'none'; chartScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }
</script>
</body>
</html>

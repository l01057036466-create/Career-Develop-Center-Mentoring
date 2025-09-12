
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>페르소나 프리즘 | 당신의 검의 길을 찾아라</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Serif KR', serif;
            background-color: #1a1a2e;
            color: #e0e0e0;
            background-image: url('https://www.transparenttextures.com/patterns/dark-matter.png');
        }
        .screen {
            display: none;
            min-height: 100vh;
        }
        .active-screen {
            display: flex;
        }
        .btn-primary {
            background-color: #8a4d76;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(138, 77, 118, 0.4);
        }
        .btn-primary:hover {
            background-color: #a35e8d;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(163, 94, 141, 0.5);
        }
        .progress-bar-inner {
            transition: width 0.5s ease-in-out;
            background: linear-gradient(90deg, #8a4d76, #a35e8d);
        }
        .choice-btn {
            border: 2px solid #4a4a68;
            transition: all 0.2s ease;
        }
        .choice-btn:hover, .choice-btn.selected {
            background-color: #8a4d76;
            border-color: #a35e8d;
            transform: scale(1.05);
        }
        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .loading-icon {
            animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .result-card {
            background-color: rgba(26, 26, 46, 0.8);
            border: 1px solid #4a4a68;
            backdrop-filter: blur(10px);
        }
        /* Radar chart styles */
        .radar-chart-container {
            position: relative;
            width: 300px;
            height: 300px;
        }
        .radar-chart {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .radar-line {
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 1;
        }
        .radar-polygon {
            fill: rgba(163, 94, 141, 0.5);
            stroke: #a35e8d;
            stroke-width: 2;
        }
        .radar-label {
            fill: #e0e0e0;
            font-size: 12px;
            text-anchor: middle;
        }
    </style>
</head>
<body class="w-full min-h-screen flex items-center justify-center p-4">

    <!-- Screen 1: 시작 화면 -->
    <div id="start-screen" class="screen active-screen flex-col items-center justify-center text-center space-y-8 fade-in">
        <h1 class="text-5xl font-bold text-white tracking-wider" style="text-shadow: 0 0 10px #a35e8d;">너의 호흡은 무엇인가?</h1>
        <p class="text-lg max-w-2xl text-gray-300">페르소나 프리즘 검사는 30개의 질문을 통해 당신의 성격을 심층 분석하고,<br>당신과 가장 닮은 영혼을 가진 검사를 찾아주는 심리 분석 도구입니다.</p>
        <button id="start-btn" class="btn-primary text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg">나의 일륜도 찾으러 가기</button>
    </div>

    <!-- Screen 2: 검사 진행 화면 -->
    <div id="test-screen" class="screen w-full max-w-3xl flex-col items-center justify-center space-y-8">
        <div class="w-full">
            <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-gray-300">진행도</span>
                <span id="progress-text" class="text-sm font-medium text-gray-300">1 / 30</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2.5">
                <div id="progress-bar" class="progress-bar-inner h-2.5 rounded-full" style="width: 3.33%"></div>
            </div>
        </div>
        <div class="w-full p-8 rounded-lg result-card space-y-6">
            <h2 id="question-text" class="text-2xl font-semibold text-center text-white">질문 내용</h2>
            <div class="grid grid-cols-5 gap-2 md:gap-4">
                <button class="choice-btn p-3 rounded-lg text-sm md:text-base" data-value="1">전혀<br>아니다</button>
                <button class="choice-btn p-3 rounded-lg text-sm md:text-base" data-value="2">아니다</button>
                <button class="choice-btn p-3 rounded-lg text-sm md:text-base" data-value="3">보통</button>
                <button class="choice-btn p-3 rounded-lg text-sm md:text-base" data-value="4">그렇다</button>
                <button class="choice-btn p-3 rounded-lg text-sm md:text-base" data-value="5">매우<br>그렇다</button>
            </div>
        </div>
    </div>

    <!-- Screen 3: 로딩 화면 -->
    <div id="loading-screen" class="screen flex-col items-center justify-center text-center space-y-6">
        <svg class="loading-icon w-20 h-20 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p id="loading-text" class="text-xl text-gray-300 tracking-wide">운명의 실이 자아내는 소리를 듣고 있습니다...</p>
    </div>

    <!-- Screen 4: 결과 화면 -->
    <div id="result-screen" class="screen w-full max-w-4xl mx-auto flex-col items-center justify-center py-10">
        <!-- 결과 내용은 JS로 동적 생성 -->
    </div>

<script>
// ==============================================================
// STAGE 0: 질문 데이터
// ==============================================================
const questions = [
    // Part 1: 근본 기질
    { text: "힘든 임무를 마친 뒤 주어진 휴일, '나비 저택의 동료들과 함께 이야기를 나누거나 가볍게 대련하며 시간을 보내는 것'이 나에게 최고의 재충전이다." },
    { text: "새로운 임무에 대한 브리핑을 들을 때, 나는 세부적인 작전 내용보다 '이번 임무가 가진 궁극적인 목표나 숨겨진 의미는 무엇일까?'를 먼저 생각하는 편이다." },
    { text: "처음 소집된 주합 회의, 어색한 분위기 속에서 나는 '먼저 다른 주들에게 말을 걸며 대화의 물꼬를 트려고 시도할 것'이다." },
    { text: "강력한 혈귀술을 가진 오니와 마주쳤을 때, 나는 '정해진 검의 형태(形)를 넘어, 순간적인 직감과 흐름에 몸을 맡겨 싸우는 것'에 더 자신 있다." },
    { text: "나는 슬픔이나 기쁨 같은 감정을 '혼자 곱씹기보다, 동료들에게 털어놓고 공유할 때' 더 잘 정리되는 것 같다." },
    { text: "나는 동료 대원을 평가할 때, '그의 과거 전적이나 구체적인 성과보다는, 그의 눈빛에서 느껴지는 가능성과 잠재력'을 더 신뢰하는 편이다." },
    // Part 2: 내면 세계
    { text: "내가 목숨을 걸고 싸우는 가장 큰 이유는 '나의 강함으로 약한 사람들을 지키는 것이 당연한 책무이기 때문이다.'" },
    { text: "나는 때때로 '과거에 겪었던 억울한 일이나 배신에 대한 분노'가 지금의 나를 움직이는 원동력이 된다고 느낀다." },
    { text: "나는 '타인에게 인정받지 못하고 나의 가치를 증명할 수 없는 것'이 죽음보다 더 두렵다." },
    { text: "나는 '내가 사랑하는 사람 곁에 있을 자격이 없는, 더러운 존재'라는 자기혐오에 빠질 때가 있다." },
    { text: "내가 가장 두려워하는 것은 '소중한 사람들과의 평화로운 일상이 깨지는 것'이다." },
    { text: "나는 '나의 재능이나 능력이 부족하다는 사실을 인정해야만 하는 순간'을 마주하는 것이 가장 고통스럽다." },
    // Part 3: 판단 및 대처
    { text: "동료가 규율을 어겼지만, 그에게는 나름의 절박한 사정이 있었다. '규율은 규율이다. 개인적인 사정보다는 조직의 원칙을 지키는 것이 우선이다.'" },
    { text: "재능이 부족해 보이는 신입 대원과 함께 훈련하게 되었다. '그의 가능성을 믿고, 내가 가진 기술을 아낌없이 가르쳐주는 것'이 당연하다고 생각한다." },
    { text: "강력한 상현 오니와 마주쳐 절체절명의 위기에 빠졌다. '이런 순간일수록 침착하게 상황을 분석하고 승산이 있는 길을 찾아야 한다.'" },
    { text: "합동 임무 중, 동료들이 지쳐 사기가 떨어졌다. '감정적인 위로보다는, 임무를 가장 효율적으로 완수할 방법을 찾는 것'이 나의 역할이다." },
    { text: "나는 기본적으로 '사람은 누구나 실수를 할 수 있고, 선한 마음을 가지고 있다'고 믿는 편이다." },
    { text: "임무에 실패하여 상관에게 질책을 받았다. '나는 쉽게 좌절하거나 감정적으로 무너지기보다, 부족한 점을 복기하고 다음을 준비한다.'" },
    // Part 4: 사회적 가면
    { text: "합동 임무를 앞두고, '오니의 예상 출몰 지역, 지형, 동료들의 특징을 모두 고려해 여러 경우의 수를 미리 계획해 두는 것'이 나의 스타일이다." },
    { text: "나는 특별한 임무가 없는 날에도 '정해진 훈련 계획을 한 번도 거르지 않고 꾸준히 수행해야만' 마음이 놓인다." },
    { text: "작전 수행 중 예상치 못한 오니의 등장으로 계획이 틀어졌다. '나는 당황하기보다, 오히려 이런 돌발 상황에 즉흥적으로 대처하는 것'에 더 흥미를 느낀다." },
    { text: "귀살대 내에서 역할을 맡게 된다면, '정해진 규칙과 절차에 따라 임무를 수행하는 역할'이 자유롭게 행동하는 역할보다 더 편안하다." },
    { text: "나는 '사소한 물건이라도 빌렸다면, 반드시 제자리에 가져다 놓아야 한다'고 생각하는 등, 일상의 작은 규칙도 중요하게 여긴다." },
    { text: "임무를 마치고 마을에 들렀을 때, '미리 정해둔 목적 없이 발길 닿는 대로 돌아다니며 구경하는 것'을 즐긴다." },
    // Part 5: 개방성 및 경험
    { text: "'인간을 해치지 않는 오니가 나타났다.' 나는 '오니는 모두 적'이라는 기존의 상식을 버리고, 그 존재를 직접 확인하며 새로운 가능성을 탐색해봐야 한다고 생각한다." },
    { text: "나는 전투 중에도 '달빛에 비친 검의 궤적이나, 기술이 만들어내는 풍경의 아름다움'에 대해 생각하는 등, 예술적이거나 추상적인 가치에 마음이 끌리는 편이다." },
    { text: "나는 귀살대의 전통적인 검술 외에도, '지금까지 없었던 새로운 호흡이나 전투 방식을 탐구하고 배우는 것'에 강한 흥미를 느낀다." },
    { text: "나는 '오래전부터 이어져 온 귀살대의 규칙과 전통은 어떤 상황에서도 존중되어야 한다'고 굳게 믿는다." },
    { text: "비록 적이라 할지라도, '그가 왜 오니가 될 수밖에 없었는지 그 슬픈 사연을 듣게 된다면' 연민을 느끼고 그의 운명에 대해 깊이 생각하게 될 것 같다." },
    { text: "나는 동료들과 대화할 때, '임무에 대한 구체적인 사실보다는 삶과 죽음, 인간의 마음과 같은 철학적인 주제'로 이야기하는 것을 더 즐긴다." },
];

// ==============================================================
// STAGE 1: 캐릭터 데이터 (characterData.js)
// ==============================================================
const characterData = [
  {
    id: 1,
    name: "카마도 탄지로",
    type: "태양처럼 따뜻한 마음을 지닌 노력가",
    image: "https://i.namu.wiki/i/XDxdrDb5EfET9eod7H1StURXE21RMy-DRRAVrvnB14-qsZeKe7HEOhl9XQInz9FzAexvWEQr9T2ZduP6wU6O-y4khafcN1JUvM5_nyDIN_x8rl8kxdkaF_TDF6zwo9LzSxuPZmGDqAeYMSQ3YAe8yQ.webp",
    scores: [5, 5, 5, 4, 5, 5, 5, 3, 2, 2, 5, 2, 1, 5, 4, 2, 5, 5, 5, 5, 2, 4, 5, 3, 5, 4, 5, 3, 5, 5]
  },
  {
    id: 2,
    name: "카마도 네즈코",
    type: "가족을 지키는 순수한 힘",
    image: "https://i.namu.wiki/i/ljupIWGFjseSV10tlg1NstpX5zt8vTiCkL4sfODxxDGvWzEEQnk4bBA5KoO7sQ0pJOl_yfsoSKTkPuNLy8hcj-6zGqXiDscizgkYpa1eH4mKGS3v4aUlkv7koWA9NiC_nmvQ_cktpwtT1Ls9g-C4FA.webp",
    scores: [1, 2, 1, 3, 1, 3, 5, 1, 1, 1, 5, 1, 1, 5, 3, 1, 5, 4, 1, 2, 5, 1, 3, 5, 5, 3, 4, 2, 5, 2]
  },
  {
    id: 3,
    name: "아가츠마 젠이츠",
    type: "두려움 속에 잠든 번개의 천재",
    image: "https://i.namu.wiki/i/-L9hjGLA9LxsdJCuSUycLYX_vG39VqF5taJrofYruH51lEtX16l_WKutPN26s8SRWGpp-e8mUMJNwyZR_GKgkB7Pal1CyoUb8ebPX96aDeY0wGAtt01FjQhqRryr-vJsojXutXCK3w4-er8sPWz5_A.webp",
    scores: [4, 2, 4, 2, 5, 3, 4, 3, 4, 4, 5, 5, 1, 4, 1, 1, 4, 2, 1, 3, 5, 2, 2, 5, 3, 3, 2, 4, 4, 3]
  },
  {
    id: 4,
    name: "하시비라 이노스케",
    type: "저돌맹진! 야생의 감각을 지닌 검사",
    image: "https://i.namu.wiki/i/2Uc5RnkIEIu8ilJ0XktP8ki8sSzm8XmrqH-9EAnPj05dtO0lKjycsC9ZgsRmUd83Yn7sbfLX7S1JDGvIyZpf5T8bgpkn0Yo9njTtPkrpn9bV5z_yuSZ3ITtssW61NEyZty_-Nepe6RK06wKDNUws4w.webp",
    scores: [5, 1, 5, 2, 2, 1, 3, 1, 5, 1, 2, 5, 3, 2, 5, 4, 2, 5, 1, 2, 5, 1, 1, 5, 2, 1, 5, 1, 2, 1]
  },
  {
    id: 5,
    name: "츠유리 카나오",
    type: "마음의 소리를 따라 성장하는 고요한 검사",
    image: "https://i.namu.wiki/i/zUlDYHCTntPjc4pAznAo2rMaBu1Dx06NsuOQnTDiugb3mvoCToS5zIqV-MtDnexJ154vi7LgmjmDLbnMrXxZg-OFyJUR5ZGikPG7iFHjkejr9SA9jnPQJy6-0V8JT6LfiLL-WmJmuAO0lvr2uzy0zg.webp",
    scores: [1, 2, 1, 3, 1, 3, 4, 2, 2, 4, 5, 1, 4, 4, 5, 4, 3, 5, 5, 5, 1, 5, 5, 1, 4, 4, 4, 4, 4, 3]
  },
  {
    id: 6,
    name: "토미오카 기유",
    type: "고요한 수면 아래 슬픔을 간직한 검사",
    image: "https://i.namu.wiki/i/sdO-jb_R-nRT2IxknBUv2ob3r6pVGVuhaRYTe_bdFFNQuSSxbLmu8WWyl7EziDR5y49yFa9JP2z2Ak1QLvqKiouMWX_b9IBgeBwN-9wI_bamYg71FwG3GiWfHdMnQo0W2T2hSstE9I8oXsIpenNPqw.webp",
    scores: [1, 2, 1, 2, 1, 3, 5, 2, 1, 5, 4, 4, 5, 3, 5, 5, 3, 5, 4, 5, 1, 5, 4, 2, 4, 2, 2, 5, 3, 2]
  },
  {
    id: 7,
    name: "렌고쿠 쿄쥬로",
    type: "불꽃처럼 뜨거운 열정으로 모두를 비추는 영혼",
    image: "https://i.namu.wiki/i/FYQRjmFAnpY0oJdphZb567Serv53K-mgArE7XtBimxmG4gZ7AjJylJFvhEAO9PSb2y3feViY--ltEDgqjIjZxhKCvumY0c68TxGji8rqDBxTSK_apTcCmhJ6_6orcLmmYKngVfTOi_2IGUPVlfOOJQ.webp",
    scores: [5, 5, 5, 4, 4, 5, 5, 1, 2, 1, 5, 1, 3, 5, 5, 3, 5, 5, 4, 5, 2, 4, 5, 3, 4, 4, 4, 5, 4, 4]
  },
  {
    id: 8,
    name: "코쵸우 시노부",
    type: "우아한 미소 뒤에 맹독의 분노를 품은 나비",
    image: "https://i.namu.wiki/i/UNnmEprZxx8jwmpEfEO6VG02crb1E_q2wpwezu4Cg2sC2LpAHxWQnRdVxqMwxgZkBAWdVZDIaD3pFt0FO2MGEpcLKtVuzOAIDXKpt8pOp3de3bx11r43X-XXMDI25xog9p8SQ5a23wPqSLF84BgEbw.webp",
    scores: [4, 5, 4, 5, 2, 5, 5, 5, 2, 3, 2, 4, 5, 4, 4, 5, 2, 4, 5, 5, 1, 5, 5, 2, 3, 5, 5, 4, 4, 5]
  },
  {
    id: 9,
    name: "우즈이 텐겐",
    type: "누구보다 화려하게 생명의 가치를 지키는 축제의 신",
    image: "https://i.namu.wiki/i/CWXL0d8ayNZgQVoCTU6FXZPU3ILoSOml5G83Pq3VaZGnZ0ob2iGfM_i4ocva0evhWeR9ET9ONUbjkZlG8sLzXZF6ZwuZhCrq2aYeekXEe5KdrYQJuZxgru2o-bcPEx--hoVYuwR50SlEoHlcA2bCTw.webp",
    scores: [5, 3, 5, 3, 5, 2, 5, 3, 5, 2, 5, 2, 4, 5, 5, 5, 4, 5, 4, 3, 4, 3, 3, 5, 4, 5, 4, 2, 3, 3]
  },
  {
    id: 10,
    name: "토키토 무이치로",
    type: "안개 너머의 자신을 찾아가는 천재 검사",
    image: "https://i.namu.wiki/i/pQT4ncOS09c7lVc1mq83EHdSuGG4H8XcFFfJS5VNxqYxVowS70-WGNSaX42jLK4GnNtP7cNFe5zI-1Kl8cuauaNwoQRyHaZOqKJYQZ4IhmJkkZkW3w2m1AUSjmo9bNZhHuyJvYKTrjWN6VZVZXZ-tA.webp",
    scores: [1, 5, 1, 5, 1, 5, 4, 4, 1, 3, 4, 1, 4, 4, 5, 4, 4, 5, 2, 3, 5, 2, 2, 5, 5, 5, 5, 2, 5, 5]
  },
  {
    id: 11,
    name: "칸로지 미츠리",
    type: "사랑으로 세상을 바라보는 긍정의 힘",
    image: "https://i.namu.wiki/i/RTUUC3Dk9G1EupDqummngeccBmF4ywFkrPSmINv6u-4qUGyaI8EHTbnz0wFnbsHfefM2Xdc-ygPQsMgiZQDfo1rT2IsZPoDPSqACvXuDCgOD3UzUxeod2o6EB82IyV4lwYi2jogc_Yvpaecg31EcIw.webp",
    scores: [5, 3, 5, 2, 5, 4, 5, 1, 4, 4, 5, 3, 1, 5, 3, 1, 5, 3, 2, 4, 4, 2, 4, 5, 5, 5, 4, 3, 5, 3]
  },
  {
    id: 12,
    name: "이구로 오바나이",
    type: "과거의 상처를 품고 유일한 빛을 지키는 뱀",
    image: "https://i.namu.wiki/i/-B_P1YtCgbxGof8tvQfphBbalj-EiuLhuUF-o5SnBFcaTh7cg61ZzuV4a4suZpkqYjnSknmTP_YnPOLCFECs95m7Swwb_MwZSes0OujJBkbnV_5Wa_0W7rGv9iuP0gjRGFT-wSDlntYvkDdCqoYWdw.webp",
    scores: [1, 3, 1, 3, 1, 2, 5, 4, 3, 5, 4, 2, 5, 2, 4, 5, 1, 4, 5, 5, 1, 5, 5, 1, 1, 2, 2, 5, 2, 2]
  },
  {
    id: 13,
    name: "시나즈가와 사네미",
    type: "거친 상처 뒤에 누구보다 깊은 사랑을 숨긴 바람",
    image: "https://i.namu.wiki/i/vtysQEoI0PR0z4Thi9do6zDaGXZFSeAl4beixXJ4hkIWROIFk-179VNJyuVQNSRXS99H5YD4TXE_zmI_owkY9OGyJvTwXhKIszxGTESlici-MhtdEY1sKOkSjXh24zjSIm0PscZXRaoS3cXj1kGa1Q.webp",
    scores: [4, 1, 4, 2, 1, 1, 5, 5, 3, 5, 2, 3, 5, 1, 3, 5, 1, 4, 2, 4, 5, 2, 1, 4, 1, 1, 3, 5, 1, 1]
  },
  {
    id: 14,
    name: "히메지마 교메이",
    type: "바위처럼 단단한 믿음으로 모두를 감싸는 자비의 거인",
    image: "https://i.namu.wiki/i/DizYLyHynCnn1H4-p5rhkZYNonbgMBB9P7_84GvzLSSB8sRR12GzhZypejR_4Xkpho2h5X3Gy7FKcmog7VJxzZ6vnvx_WswtUJkmN-e2laxm4TvuBCb-MatkmRPX4zYu2U-ZzvGMOV3DGJC9g6Ikzw.webp",
    scores: [2, 5, 2, 4, 2, 5, 5, 4, 1, 4, 5, 1, 3, 5, 5, 3, 5, 5, 5, 5, 1, 5, 5, 1, 5, 3, 3, 5, 5, 5]
  },
  {
    id: 15,
    name: "우부야시키 카가야",
    type: "미래를 꿰뚫는 혜안과 절대적 신뢰의 리더",
    image: "https://i.namu.wiki/i/XDGCRQloqu_r7vfiiK85QTrEIw_JbzOUtaiN5XziI5DEM3JGpwyLU9OHz16wI5raV8EttmGmXRqQzK8vQcLmXLNgaIQ2IlI6rSBVzEEg8dc8FP5jb1LE_B6xdjPAwEn084O-8vsyzMdgpI6uMKUvgw.webp",
    scores: [3, 5, 3, 5, 3, 5, 5, 3, 1, 3, 5, 1, 2, 5, 5, 2, 5, 5, 5, 5, 1, 5, 5, 2, 5, 5, 5, 4, 5, 5]
  },
  {
    id: 16,
    name: "무라타",
    type: "평범함 속에서 책임을 다하는 우리들의 동료",
    image: "https://i.namu.wiki/i/C4_HgumZATlIffZf_kqSBw2NVslu4Vyz5zPbeR2BZS1Bkeseunnc1gEoTYUAmMlBLIpvhQ45KN7ktyXnSjw84dFX5ohM126A0iUJGFvzu15VS7v3xhCZj5V1hQwd-rFbGQ39ew_uM4mB1dgyqs7pGg.webp",
    scores: [3, 2, 3, 2, 4, 2, 4, 2, 2, 2, 5, 4, 4, 4, 2, 3, 4, 3, 4, 4, 2, 4, 4, 3, 3, 2, 2, 4, 3, 2]
  },
  {
    id: 17,
    name: "타마요",
    type: "죄를 짊어지고 희망을 연구하는 고결한 의사",
    image: "https://i.namu.wiki/i/WXmGFHXCTrYYaDhVrWXhf6g8X0oh85B94L6iWibKx3iaqDDzJR6tNR2tbujgyuWvZdW0Yx3K2nVDrBdKb05O7qi6C1IULJgNWMIgjDCHasl1-cP3I1KZ2OKceX4jWWN99O3tn_t1DpePPKfuSZKMvA.webp",
    scores: [2, 5, 2, 5, 1, 5, 5, 5, 1, 5, 3, 1, 4, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 4, 5, 2, 5, 5]
  },
  {
    id: 18,
    name: "코쿠시보",
    type: "최강을 갈망하며 영원을 선택한 고독한 달",
    image: "https://i.namu.wiki/i/1L5DmaN58jvhrKOSMM0aR_RsXgYrS7Yenl2w_MT6R-SzKp-vw8PjSy0kJbSxgAJEdklcH5Db8t8g0_peDpxHnR-U0YEymEP1bxUOWDadsoT3IFBNiR-GCB0Oj3orQO_RtIfcfopOZrD3qhaoJ-EeYg.webp",
    scores: [1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 1, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 5, 4, 1, 1, 5, 5, 5, 1, 4]
  },
  {
    id: 19,
    name: "도우마",
    type: "공허한 낙원에서 감정을 탐구하는 얼음의 교주",
    image: "https://i.namu.wiki/i/KJkyZSZt3q04I3Id1_0loqDrklJ94Zx6hO0CGF7vuU9dymvMoQ5lBAXZP3cNzbVSnBzlcciQNnFKKpDEseF0WT1WjlVuqWdpEl-t9HKY-IUoayJAKkJ8rJkWFmeirt1fMOM-sxlloNkyOtKv2IGEpQ.webp",
    scores: [4, 4, 5, 4, 5, 4, 1, 1, 2, 1, 1, 1, 1, 1, 5, 5, 1, 5, 2, 1, 5, 1, 1, 5, 4, 5, 5, 1, 1, 5]
  },
  {
    id: 20,
    name: "아카자",
    type: "과거를 잊고 강함만을 추구하는 투신(闘神)",
    image: "https://i.namu.wiki/i/HjCMR-PnIMJs7CHtyEooCWhPgc2lViPytv-lMleF80MRr3qZcNNoW5xbHNexwmUFfsN5vm5NOm8lYKlaq1JZSpGDqeYewtyCafp3mZJ8hQbR9RhsL6UXBf-6yJUDEKXyu6j80UHYGfkt8f3274A9gQ.webp",
    scores: [2, 2, 2, 3, 1, 2, 2, 5, 2, 5, 5, 5, 3, 1, 4, 4, 1, 4, 3, 5, 3, 3, 3, 3, 1, 3, 4, 4, 2, 3]
  },
  {
    id: 21,
    name: "한텐구",
    type: "분열된 감정 속에 숨은 공포의 화신",
    image: "https://i.namu.wiki/i/EO09L9k1_oLwzDsEi2FP6POB3DRCbtolMCHKUrRbos69zotbe9JufB_K35eT-Bku2HQHmGH116n_zUmSd5h3Ybt3mJWBKU-K656GOicHyhLRziNwJ0Qw72zQ2cc7U0xHc4vuaPkzG8AIbtbrIpqAQw.webp",
    scores: [1, 4, 1, 4, 1, 2, 1, 5, 1, 5, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 4, 1, 1, 1, 3, 1, 1]
  },
  {
    id: 22,
    name: "굣코",
    type: "뒤틀린 예술혼을 탐닉하는 항아리의 예술가",
    image: "https://i.namu.wiki/i/xIJzdKk1z77d6W1Le4o4_RZv0aexqV_cWYFCwydpUvTJPRjQVcXpL_7EPIiP_Qeacnmq6xp6Q91H3BK1vmfQvgGwPYz2i_um3xXNYIEiLnVYwXdWJ6uHJwu0UlY3XDTjrCdQI0eEg2T9WhC-x_tMGg.webp",
    scores: [4, 5, 5, 5, 4, 2, 1, 3, 5, 2, 1, 4, 2, 1, 3, 3, 1, 3, 2, 2, 5, 1, 1, 5, 2, 5, 5, 1, 1, 3]
  },
  {
    id: 23,
    name: "다키 & 규타로",
    type: "서로의 상처를 보듬는 불행의 남매",
    image: "https://i.namu.wiki/i/yfN0oqKRLO4vQ2cAVwNkurSFMxXl107eMGNgp8sA0nOlwoNv0yCkctjlUVSps3iufOtm0q8IetV2tghH0au7XFr86YRyuWjGIZmD5o7TyA-tq_FU4mnfIWT5e1zcT8GIJnDVDKzqT-vzAWrt6WKS5w.webp",
    scores: [4, 1, 4, 1, 3, 1, 2, 5, 4, 5, 2, 4, 2, 1, 2, 2, 1, 2, 2, 2, 5, 1, 1, 5, 1, 4, 2, 1, 1, 2]
  },
  {
    id: 24,
    name: "카이가쿠",
    type: "인정받지 못한 재능, 비뚤어진 승부욕",
    image: "https://i.namu.wiki/i/HKI2K1IwwQS37VGlHML0bdD9ilA--GL8n6RfR8aKmV6W47uA6WYaUsdCmhtnn3QRmUV7nwXl02CNhtovN6A56Fzdl98XUdZQvBI1KS9e5iTBWQPBP9EDZJ8Q7DWJw7HXWsgQFEp4eLus3-QTWxfXJA.webp",
    scores: [5, 2, 5, 1, 2, 1, 1, 4, 5, 4, 1, 5, 5, 1, 3, 5, 1, 3, 4, 4, 3, 4, 1, 3, 1, 2, 4, 3, 1, 1]
  },
  {
    id: 25,
    name: "키부츠지 무잔",
    type: "죽음의 공포에 사로잡힌 최초의 오니",
    image: "https://i.namu.wiki/i/Wo9UiCNf2RLI-YpjyR5RDGnge_fZfS-i_C2sO45kWJQ7FJSzEivsrbDoiGjft3GkTNA3ikcIEgXifBZgBUc9TfdPTADfPsEFhqoatMPOgCvFDBwg0_bSPu8c9nbpxDQu1ULJOSNX87R_aWRwRr1lZA.webp",
    scores: [2, 2, 3, 3, 1, 1, 1, 3, 3, 2, 1, 5, 5, 1, 4, 5, 1, 4, 5, 3, 2, 5, 2, 3, 1, 3, 4, 1, 1, 3]
  }
];

// ==============================================================
// STAGE 1.5: 결과 텍스트 데이터
// ==============================================================
// 각 캐릭터별 심층 분석, 관계, 멘토링 조언 텍스트 데이터
const resultTexts = {
  1: { // 카마도 탄지로
    analysis: {
      title: "호흡의 근원(根本): 태양처럼 따뜻한 물의 호흡",
      desc: "당신의 힘은 **태양처럼 따뜻한 마음**에서 비롯됩니다. 혼자 있을 때보다 동료들과의 **유대(絆)** 속에서 호흡이 가다듬어지고, 그 관계를 통해 더욱 강해지는군요. 당신의 눈은 탄지로처럼 사물의 본질을 꿰뚫어, 절망 속에서도 승리로 이어지는 **'틈새의 실'**을 발견해내는 힘을 가졌습니다."
    },
    chemistry: {
      romance: { name: "츠유리 카나오", desc: "당신의 따뜻함과 굳은 의지는 닫혀있는 사람의 마음을 열게 하는 힘이 있습니다. 당신의 헌신적인 사랑을 깊이 이해하고, 조용히 곁을 지키며 함께 성장할 수 있는 사람과 가장 이상적인 관계를 맺을 수 있습니다." },
      friendship: { name: "렌고쿠 쿄쥬로", desc: "당신의 긍정적인 에너지와 올곧은 신념은, 불꽃처럼 뜨거운 열정을 가진 사람과 만났을 때 엄청난 시너지를 냅니다. 서로를 믿고 격려하며, 더 높은 목표를 향해 함께 나아가는 최고의 동료가 될 수 있습니다." },
      caution: { name: "키부츠지 무잔", desc: "당신의 이타심과 신뢰를 자신의 이익을 위해 이용하려는 사람을 가장 경계해야 합니다. 생명의 가치를 경시하고 타인을 도구로 여기는 유형과는 근본적으로 가치관이 충돌하여 큰 상처를 받을 수 있습니다." }
    },
    mentoring: {
      role: "성장형 멘티이자, 동료를 이끄는 멘토",
      desc: "당신은 아직 배우고 성장할 부분이 많은 **훌륭한 '멘티'의 자질**을 가지고 있습니다. 특히 확고한 신념과 풍부한 경험을 가진 멘토를 만났을 때, 그 가르침을 스펀지처럼 흡수하여 자신의 것으로 만들 수 있습니다. 동시에, 당신은 동료들의 마음을 보듬고 그들의 가능성을 믿어주는 **'수평적 멘토'**의 역할에도 매우 적합합니다. 당신의 공감과 격려는 때로 스승의 가르침보다 더 큰 힘을 발휘할 수 있습니다."
    }
  },
  // ... (여기에 24명 캐릭터의 결과 텍스트를 모두 추가해야 합니다)
  19: { // 도우마
    analysis: {
        title: "혈귀술의 근원(血鬼術の根源): 감정이 부재하는 공허의 얼음",
        desc: "당신의 힘은 뜨거운 감정이 아닌, 역설적이게도 **아무것도 느끼지 못하는 차가운 공허**에서 비롯됩니다. 슬픔, 기쁨, 분노와 같은 감정의 소용돌이에서 벗어나 있기에, 당신은 그 누구보다 객관적이고 냉철하게 세상을 관찰할 수 있습니다. 당신의 그 고요함은 때로 주변 사람들에게 위압감과 신비로움을 동시에 느끼게 합니다."
    },
    chemistry: {
        romance: { name: "아카자", desc: "당신의 공허함과 정반대로, 하나의 신념에 모든 것을 바치는 순수하고 강렬한 열정을 가진 사람에게 강하게 끌릴 수 있습니다. 그들의 감정은 당신에게 결코 이해할 수 없는, 그래서 더 흥미로운 연구 대상이 될 것입니다." },
        friendship: { name: "코쿠시보", desc: "당신처럼 인간의 감정에서 벗어나 자신만의 '길'을 추구하는 고독한 존재와는 의외의 유대감을 형성할 수 있습니다. 서로의 본질을 꿰뚫어 보고, 불필요한 감정 소모 없이 서로를 인정하는 관계가 될 수 있습니다." },
        caution: { name: "코쵸우 시노부", desc: "가슴속에 뜨거운 복수심과 인간적인 신념을 품고 사는 사람은 당신의 공허함을 결코 용납하지 못할 것입니다. 당신의 무감각함은 그들의 신념에 대한 모독으로 비칠 수 있으며, 이는 파멸적인 충돌로 이어질 수 있습니다." }
    },
    mentoring: {
        role: "잠재적 천재이자, 인도가 필요한 위험한 존재",
        desc: "당신은 감정에 휘둘리지 않는 **천재적인 분석가나 전략가**가 될 수 있는 엄청난 잠재력을 가졌습니다. 하지만 그 힘은 매우 위험합니다. 당신의 그 차가운 이성을 올바른 길로 이끌어 줄 **강력한 신념을 가진 멘토(예: 히메지마 교메이)**의 존재가 반드시 필요합니다. 멘토는 당신이 단순한 관찰자를 넘어, 당신의 뛰어난 통찰력으로 세상을 이롭게 하는 길을 찾도록 도와줄 유일한 등불이 될 것입니다. 당신에게 멘토링은 선택이 아닌, 당신의 잠재력을 파멸이 아닌 완성으로 이끌기 위한 필수 과정입니다."
    }
  },
  // 다른 모든 캐릭터의 텍스트 데이터가 여기에 추가되어야 합니다.
  // 이 예제에서는 탄지로와 도우마만 포함했습니다.
};


// ==============================================================
// STAGE 2: 유사도 계산 로직 (matchingLogic.js)
// ==============================================================
function calculateSimilarity(userScores, characterProfile) {
  if (userScores.length !== characterProfile.scores.length) {
    return Infinity;
  }
  let totalDifference = 0;
  for (let i = 0; i < userScores.length; i++) {
    totalDifference += Math.abs(userScores[i] - characterProfile.scores[i]);
  }
  return totalDifference;
}

// ==============================================================
// STAGE 3: 검사 실행 및 결과 도출 (runTest.js)
// ==============================================================
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const choiceBtns = document.querySelectorAll('.choice-btn');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const resultScreen = document.getElementById('result-screen');

let currentQuestionIndex = 0;
let userAnswers = [];

function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active-screen');
    });
    document.getElementById(screenId).classList.add('active-screen');
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.text;
        progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        choiceBtns.forEach(btn => btn.classList.remove('selected'));
    } else {
        showLoadingAndCalculate();
    }
}

function handleChoice(value) {
    userAnswers.push(value);
    currentQuestionIndex++;
    showQuestion();
}

function showLoadingAndCalculate() {
    showScreen('loading-screen');
    const loadingMessages = ["운명의 실이 자아내는 소리를 듣고 있습니다...", "당신의 호흡을 분석하는 중...", "당신과 가장 닮은 영혼을 찾는 중..."];
    let msgIndex = 0;
    loadingText.textContent = loadingMessages[msgIndex];
    const interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[msgIndex];
    }, 1500);

    setTimeout(() => {
        clearInterval(interval);
        calculateAndShowResult();
    }, 4500);
}

function findBestMatches(userScores, allCharacters) {
    const results = [];
    allCharacters.forEach(character => {
        const similarityScore = calculateSimilarity(userScores, character);
        results.push({
            score: similarityScore,
            character: character
        });
    });
    results.sort((a, b) => a.score - b.score);
    return results.slice(0, 3);
}

function generateRadarChart(scores) {
    const size = 300;
    const center = size / 2;
    const radius = center * 0.8;
    const labels = ["기질", "내면", "판단", "가면", "개방성"];
    const points = [];

    const totalScores = [0, 0, 0, 0, 0];
    for (let i = 0; i < 30; i++) {
        const partIndex = Math.floor(i / 6);
        totalScores[partIndex] += scores[i];
    }

    const maxPartScore = 6 * 5; // 6 questions * 5 max points
    const normalizedScores = totalScores.map(score => score / maxPartScore);

    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - (Math.PI / 2);
        const x = center + radius * normalizedScores[i] * Math.cos(angle);
        const y = center + radius * normalizedScores[i] * Math.sin(angle);
        points.push(`${x},${y}`);
    }

    let axisLines = '';
    let axisLabels = '';
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - (Math.PI / 2);
        const x1 = center;
        const y1 = center;
        const x2 = center + radius * Math.cos(angle);
        const y2 = center + radius * Math.sin(angle);
        axisLines += `<line class="radar-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
        const lx = center + (radius + 20) * Math.cos(angle);
        const ly = center + (radius + 20) * Math.sin(angle);
        axisLabels += `<text class="radar-label" x="${lx}" y="${ly}" dy="5">${labels[i]}</text>`;
    }

    return `
        <div class="radar-chart-container mx-auto">
            <svg class="radar-chart" viewBox="0 0 ${size} ${size}">
                <g>${axisLines}</g>
                <polygon class="radar-polygon" points="${points.join(' ')}"></polygon>
                <g>${axisLabels}</g>
            </svg>
        </div>
    `;
}

function calculateAndShowResult() {
    const top3Matches = findBestMatches(userAnswers, characterData);
    const mainResult = top3Matches[0].character;
    const texts = resultTexts[mainResult.id] || resultTexts[1]; // Fallback to Tanjiro if text is missing

    // 최대 점수 차이 계산 (가장 다를 경우)
    const maxDiff = 30 * 4; // 30 questions * (5-1) max diff
    const similarityPercentage = Math.max(0, 100 - (top3Matches[0].score / maxDiff) * 100).toFixed(0);

    resultScreen.innerHTML = `
        <div class="w-full text-center fade-in space-y-10">
            <!-- 1. 결과 발표 -->
            <div class="space-y-4">
                <h1 class="text-3xl md:text-5xl font-bold text-white tracking-wider" style="text-shadow: 0 0 10px #a35e8d;">당신의 영혼과 가장 닮은 검사는...</h1>
                <div class="flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-lg result-card">
                    <img src="${mainResult.image}" alt="${mainResult.name}" class="w-48 h-48 rounded-full border-4 border-purple-400 object-cover shadow-lg">
                    <div class="text-left space-y-2">
                        <h2 class="text-4xl font-bold text-purple-300">${mainResult.name}</h2>
                        <p class="text-xl text-gray-300">${mainResult.type}</p>
                        <p class="text-lg text-gray-300">성격 일치율: <span class="font-bold text-purple-300">${similarityPercentage}%</span></p>
                    </div>
                </div>
            </div>

            <!-- 2. 페르소나 프리즘 심층 분석 -->
            <div class="p-6 rounded-lg result-card space-y-4">
                <h3 class="text-2xl font-bold border-b-2 border-purple-400 pb-2">페르소나 프리즘 심층 분석</h3>
                ${generateRadarChart(userAnswers)}
                <div class="text-left space-y-3 p-4">
                    <h4 class="text-xl font-semibold text-purple-300">${texts.analysis.title}</h4>
                    <p class="text-gray-300 leading-relaxed">${texts.analysis.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>')}</p>
                </div>
            </div>
            
            <!-- 3. 관계 케미 분석 -->
            <div class="p-6 rounded-lg result-card space-y-4">
                 <h3 class="text-2xl font-bold border-b-2 border-purple-400 pb-2">관계 케미 분석</h3>
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div class="p-4 rounded bg-black bg-opacity-20">
                        <h4 class="text-xl font-semibold text-red-400">❤️ 연인 케미</h4>
                        <p class="font-bold mt-1">${texts.chemistry.romance.name} 유형</p>
                        <p class="text-sm text-gray-400 mt-2">${texts.chemistry.romance.desc}</p>
                    </div>
                    <div class="p-4 rounded bg-black bg-opacity-20">
                        <h4 class="text-xl font-semibold text-yellow-400">⭐ 우정 케미</h4>
                        <p class="font-bold mt-1">${texts.chemistry.friendship.name} 유형</p>
                        <p class="text-sm text-gray-400 mt-2">${texts.chemistry.friendship.desc}</p>
                    </div>
                    <div class="p-4 rounded bg-black bg-opacity-20">
                        <h4 class="text-xl font-semibold text-blue-400">⚠️ 주의 케미</h4>
                        <p class="font-bold mt-1">${texts.chemistry.caution.name} 유형</p>
                        <p class="text-sm text-gray-400 mt-2">${texts.chemistry.caution.desc}</p>
                    </div>
                 </div>
            </div>

            <!-- 4. 멘토링 잠재력 분석 -->
            <div class="p-6 rounded-lg result-card space-y-4 text-left">
                 <h3 class="text-2xl font-bold border-b-2 border-purple-400 pb-2">멘토링 잠재력 분석</h3>
                 <h4 class="text-xl font-semibold text-purple-300">${texts.mentoring.role}</h4>
                 <p class="text-gray-300 leading-relaxed">${texts.mentoring.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>')}</p>
            </div>
        </div>
    `;

    showScreen('result-screen');
}


// --- 이벤트 리스너 설정 ---
startBtn.addEventListener('click', () => {
    showScreen('test-screen');
    showQuestion();
});

choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        const value = parseInt(button.dataset.value);
        // 시각적 피드백
        choiceBtns.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        // 0.2초 후 다음 질문으로 이동
        setTimeout(() => handleChoice(value), 200);
    });
});

</script>
</body>
</html>

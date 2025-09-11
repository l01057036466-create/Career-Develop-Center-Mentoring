<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>귀살대 최종 선별 멘토 유형 테스트</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #1a1a2e;
            color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px 0;
            text-align: center;
        }
        .container {
            background-color: #16213e;
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 0 30px rgba(233, 69, 96, 0.3);
            border: 1px solid #e94560;
            width: 90%;
            max-width: 600px;
            box-sizing: border-box;
        }
        h1, h2, h3 {
            color: #e94560;
        }
        #start-screen h1 {
            font-size: 2.2em;
            margin-bottom: 10px;
        }
        #start-screen p {
            font-size: 1.1em;
            color: #c0c0c0;
            line-height: 1.6;
        }
        button {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #e94560;
            color: #ffffff;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2em;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
            margin-top: 20px;
            font-weight: bold;
        }
        .secondary-btn {
            background-color: #0f3460;
            margin-left: 10px;
        }
        button:hover {
            background-color: #c7304a;
            transform: scale(1.05);
        }
        .secondary-btn:hover {
            background-color: #1f4f8b;
        }
        .question-container, .result-container, .chart-container {
            display: none;
        }
        #question-text {
            font-size: 1.5em;
            margin-bottom: 30px;
            font-weight: bold;
            line-height: 1.5;
            min-height: 100px;
        }
        .answer-btn {
            display: block;
            width: 100%;
            box-sizing: border-box;
            background-color: #0f3460;
            margin: 10px 0;
            padding: 15px;
            font-size: 1em;
            border-radius: 10px;
            text-align: left;
        }
        .answer-btn:hover {
            background-color: #1f4f8b;
            transform: scale(1.02);
        }
        #progress-bar-container {
            width: 100%;
            background-color: #0f3460;
            border-radius: 5px;
            margin-top: 30px;
            height: 10px;
        }
        #progress-bar {
            width: 0%;
            height: 100%;
            background-color: #e94560;
            border-radius: 5px;
            transition: width 0.3s;
        }
        .result-container h2 {
            font-size: 1.5em;
        }
        #result-image {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            margin-bottom: 15px;
            border: 4px solid #e94560;
            object-fit: cover;
        }
        #result-char-name {
            font-size: 2.5em;
            font-weight: bold;
            color: #ffffff;
            margin: 10px 0;
        }
        #result-title {
            font-size: 1.3em;
            color: #c0c0c0;
            font-weight: bold;
        }
        #result-description {
            font-size: 1.1em;
            text-align: justify;
            line-height: 1.7;
            margin-top: 25px;
            color: #e0e0e0;
        }
        .chart-container {
            text-align: left;
        }
        .chart-container h3 {
            text-align: center;
            font-size: 1.8em;
        }
        #dynamic-chart-content h4 {
            color: #ffffff;
            border-left: 4px solid #e94560;
            padding-left: 10px;
            margin-top: 30px;
        }
        #dynamic-chart-content p {
            margin-left: 14px;
            line-height: 1.6;
        }
        #dynamic-chart-content b {
            color: #c0c0c0;
        }
        .button-group {
            display: flex;
            justify-content: center;
        }
    </style>
</head>
<body>

<div class="container">
    <div id="start-screen">
        <h1>⚔️ 귀살대 최종 선별 멘토 유형 테스트 ⚔️</h1>
        <p>"당신 안에 잠든 호흡은 무엇인가? <br> 20개의 질문을 통해 당신의 모든 것을 증명하라!"</p>
        <button onclick="startQuiz()">테스트 시작</button>
    </div>

    <div class="question-container" id="quiz-screen">
        <p id="question-text"></p>
        <div id="answer-buttons"></div>
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
    </div>

    <div class="result-container" id="result-screen">
        <h2>당신의 유형은...</h2>
        <img id="result-image" src="" alt="결과 캐릭터 이미지">
        <p id="result-char-name"></p>
        <p id="result-title"></p>
        <p id="result-description"></p>
        <div class="button-group">
            <button onclick="restartQuiz()">다시하기</button>
            <button onclick="showChart()" class="secondary-btn">나의 궁합 보기</button>
        </div>
    </div>

    <div class="chart-container" id="chart-screen">
        <h3><span id="chart-owner-name"></span><span> 님의 궁합표</span></h3>
        <div id="dynamic-chart-content">
            <!-- JavaScript will populate this area with personalized compatibility info. -->
        </div>
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
    const resultCharName = document.getElementById('result-char-name');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const chartOwnerName = document.getElementById('chart-owner-name');
    const dynamicChartContent = document.getElementById('dynamic-chart-content');

    let currentQuestionIndex = 0;
    let userScores = { '🔥': 0, '💧': 0, '⚡️': 0, '☁️': 0, '💪': 0 };
    let lastResultKey = '';

    const questions = [
        { question: "Q1. 당신이 귀살대 활동에서 가장 중요하게 생각하는 가치는 무엇입니까?", answers: [ { text: "대원 모두가 뜨거운 투지를 갖고 혈귀 섬멸에 임하는 것.", type: '🔥' }, { text: "대원들과 불필요한 마찰 없이, 물 흐르듯 원만하게 협력하는 것.", type: '💧' }, { text: "누구도 생각지 못한 방식으로, 화려하고 '멋진' 전과를 올리는 것.", type: '⚡️' }, { text: "각자 자신의 역할을 최소한의 시간으로 완벽하게 해내는 것.", type: '☁️' }, { text: "오직 혈귀를 벤 결과만이 모든 것을 증명한다고 믿는 것.", type: '💪' } ] },
        { question: "Q2. 최종 선별에서 살아남았지만, 두려움에 떠는 신입 대원을 만났습니다. 당신의 첫마디는?", answers: [ { text: "두려워 마라! 그 마음이야말로 너를 강하게 만들 것이다!", type: '🔥' }, { text: "괜찮은가? 우선 안전한 곳에서 차근차근 이야기해 보지.", type: '💧' }, { text: "흠, 아주 흥미로운 얼굴을 하고 있군. 이 몸이 화려하게 단련시켜 주마!", type: '⚡️' }, { text: "그래서 결론이 뭔데? 두려움의 원인부터 말해.", type: '☁️' }, { text: "그 정도 각오도 없이 귀살대에 들어왔나?", type: '💪' } ] },
        { question: "Q3. 훌륭한 귀살대원이 되기 위해, 후배(계승자)에게 가장 강조하고 싶은 자질은?", answers: [ { text: "어떤 상황에서도 자신의 임무를 끝까지 완수하는 꺾이지 않는 마음.", type: '🔥' }, { text: "항상 동료의 입장을 먼저 생각하고 행동하는 따뜻한 마음.", type: '💧' }, { text: "남들의 시선에 구애받지 않고 스스로의 가치를 증명하는 당당한 마음.", type: '⚡️' }, { text: "혈귀의 속임수를 꿰뚫어 보고 약점을 파악하는 냉철한 마음.", type: '☁️' }, { text: "그 어떤 혈귀 앞에서도 무너지지 않는 압도적인 힘과 정신력.", type: '💪' } ] },
        { question: "Q4. 혈귀를 눈앞에 둔 지금, 어떤 상황이 가장 스트레스인가요?", answers: [ { text: "동료들이 정신 차리지 못하고 수동적으로 행동할 때.", type: '🔥' }, { text: "동료들 사이에 불화와 오해가 생겨 등을 돌렸을 때.", type: '💧' }, { text: "나의 화려한 기술이 제대로 먹히지 않고 무시당할 때.", type: '⚡️' }, { text: "비논리적인 공포에 사로잡혀 작전이 무의미해질 때.", type: '☁️' }, { text: "무능한 동료가 전체의 발목을 잡고 있을 때.", type: '💪' } ] },
        { question: "Q5. 당신이 직접 키우는 계승자(츠구코)와 어떤 관계를 맺고 싶습니까?", answers: [ { text: "함께 생사를 넘나들며 성장하는 '전우' 같은 관계.", type: '🔥' }, { text: "서로를 믿고 모든 것을 의지하는 '가족' 같은 관계.", type: '💧' }, { text: "서로에게 영감을 주며 실력을 겨루는 '라이벌' 같은 관계.", type: '⚡️' }, { text: "불필요한 교류 없이 기술만 전수하는 '비즈니스' 관계.", type: '☁️' }, { text: "나의 모든 것을 이어받을 완벽한 '후계자' 관계.", type: '💪' } ] },
        { question: "Q6. 다음 토벌 임무의 전략을 두고 동료 '주(柱)'들과 의견이 갈렸습니다.", answers: [ { text: "내 의견이 가장 효율적이다! 모두 나를 따르도록!", type: '🔥' }, { text: "모두의 입장이 일리가 있습니다. 각 전략의 장점을 합쳐보는 건 어떻습니까?", type: '💧' }, { text: "이럴 시간 없다! 일단 더 '화려한' 작전을 내는 쪽으로 정하자!", type: '⚡️' }, { text: "감정싸움은 무의미하다. 각 전략의 성공 확률을 데이터로 가져와라.", type: '☁️' }, { text: "시끄럽다. 결국 가장 강한 자의 방식이 옳은 법이다.", type: '💪' } ] },
        { question: "Q7. 토벌 중인 혈귀가 갑자기 분열하여 수적으로 압도적인 불리함에 처했다!", answers: [ { text: "잠은 죽어서 자면 된다! 이 자리에서 전부 벨 때까지 싸운다!", type: '🔥' }, { text: "모두 당황하지 마라! 일단 대열을 정비하고 우리가 할 수 있는 최선이 뭔지부터 찾는다!", type: '💧' }, { text: "오히려 좋아! 이 위기를 기회로 삼아 더 극적인 승리를 보여주자고!", type: '⚡️' }, { text: "분열의 규칙부터 분석한다. 지금 상황에서 가장 현실적인 해결책은 일단 후퇴하는 것이다.", type: '☁️' }, { text: "역시 너희들에게 맡기는 게 아니었다. 지금부터 내가 혼자 처리한다.", type: '💪' } ] },
        { question: "Q8. '주합 회의'에서 이번 임무의 성과를 어르신께 보고하는 역할이 주어진다면?", answers: [ { text: "대원들을 대표하여 가장 열정적이고 자신감 넘치는 목소리로 보고한다.", type: '🔥' }, { text: "보고는 다른 동료에게 맡기고, 뒤에서 묵묵히 그를 지지하며 듣는다.", type: '💧' }, { text: "청중의 시선을 사로잡는 화려한 언변과 몸짓으로 임무의 위대함을 설파한다.", type: '⚡️' }, { text: "군더더기 없이, 혈귀의 정보와 전과 데이터만을 정확하게 전달한다.", type: '☁️' }, { text: "이 임무의 모든 성과는 오롯이 나의 것임을 명확하게 어필한다.", type: '💪' } ] },
        { question: "Q9. 나의 검술이나 호흡법에 대해 다른 대원이 이견을 제시했습니다.", answers: [ { text: "좋다! 건전한 실력 논쟁은 우리를 더 강하게 만들지! 대련으로 증명해 보자!", type: '🔥' }, { text: "음, 그렇게 생각할 수도 있겠군. 내 검술의 어떤 부분이 부족해 보였나?", type: '💧' }, { text: "흥, 내 기술의 진가를 몰라보는군! 하지만 좋다, 더 멋진 기술을 보여주지.", type: '⚡️' }, { text: "감정적인 부분은 배제하고, 네 주장의 논리적 근거를 설명해봐라.", type: '☁️' }, { text: "내 방식이 틀렸다는 건가? 결과로 증명하기 전까진 내 방식을 따른다.", type: '💪' } ] },
        { question: "Q10. 당신은 무한성에 들어갔는데, 동료 하나가 뒤에 숨어 아무것도 하지 않습니다.", answers: [ { text: "공개적으로 호통을 치며, 당장 전투에 기여하도록 강하게 압박한다.", type: '🔥' }, { text: "일단 눈앞의 혈귀부터 처리하고, 나중에 조용히 불러 이유를 묻는다.", type: '💧' }, { text: "어차피 도움도 안 되니, 그를 무시하고 내가 전부 화려하게 처리한다.", type: '⚡️' }, { text: "저 대원의 전투 기여도는 0이다. 작전상 없는 사람으로 취급한다.", type: '☁️' }, { text: "전력에 방해만 될 뿐이다. 내 손으로 직접 처리한다.", type: '💪' } ] },
        { question: "Q11. 분대를 이끄는 대장으로서, 당신의 지휘 스타일은?", answers: [ { text: "'나를 따르라!' 카리스마와 투지로 대원들을 이끄는 '선봉장' 스타일.", type: '🔥' }, { text: "'모두를 지킨다!' 다정함과 포용력으로 대원들을 아우르는 '조력자' 스타일.", type: '💧' }, { text: "'나를 보라!' 화려한 실력으로 모두의 선망이 되는 '아이돌' 스타일.", type: '⚡️' }, { text: "'각자 판단해라.' 최소한의 지시만 내리고 대원의 자율성을 존중하는 '방임형' 스타일.", type: '☁️' }, { text: "'나를 넘어라.' 대원들을 자신의 목적을 위한 도구로 여기는 '군주' 스타일.", type: '💪' } ] },
        { question: "Q12. 새로운 '호흡의 파생 기술'을 연마할 때 선호하는 방식은?", answers: [ { text: "일단 몸으로 부딪치며 열정적으로 시도하고, 실패를 통해 완성한다.", type: '🔥' }, { text: "동료들과 대련하며 서로의 장단점을 흡수하여 완성한다.", type: '💧' }, { text: "남들과는 다른 나만의 독창적인 동작을 추가하여 완성한다.", type: '⚡️' }, { text: "가장 효율적인 움직임을 먼저 계산한 뒤, 체계적인 계획에 따라 연마한다.", type: '☁️' }, { text: "최고의 실력자와 싸우거나, 그의 기술을 훔쳐서라도 내 것으로 만든다.", type: '💪' } ] },
        { question: "Q13. 담당 까마귀가 물어오는 토벌 임무 지령이 쉴 틈 없이 쌓여있다!", answers: [ { text: "전부 받아들인다! 밤을 새워서라도 해치우면 그만!", type: '🔥' }, { text: "동료들에게 도움을 청해, 함께 임무를 분담하여 해결한다.", type: '💧' }, { text: "이 임무들을 어떻게 하면 가장 '있어 보이게' 처리할 수 있을까부터 고민한다.", type: '⚡️' }, { text: "혈귀의 중요도와 거리에 따라 표를 만들고, 가장 효율적인 순서대로 처리한다.", type: '☁️' }, { text: "가장 중요한 상현의 정보가 담긴 임무 하나에만 모든 것을 쏟아붓고 나머지는 무시한다.", type: '💪' } ] },
        { question: "Q14. 당신의 스승(혹은 선배)에게서 '재능이 없다'는 혹평을 받았다.", answers: [ { text: "'나의 노력이 부족했을 뿐!' 더 뜨거운 열정으로 단련에 임한다.", type: '🔥' }, { text: "'내가 정말 쓸모없는 걸까...?' 마음에 상처를 받고 한동안 좌절한다.", type: '💧' }, { text: "'나의 진가를 몰라보다니!' 불쾌하지만, 실력으로 증명해서 코를 납작하게 해주겠다고 다짐한다.", type: '⚡️' }, { text: "'지적의 논리적 근거가 타당한가?' 팩트를 먼저 분석하고, 타당할 때만 수용한다.", type: '☁️' }, { text: "'네가 감히 나를 평가해?' 분노를 느끼고, 스승을 넘어설 대상으로 삼는다.", type: '💪' } ] },
        { question: "Q15. 임무가 없는 휴일, 당신은 주로 무엇을 하는가?", answers: [ { text: "동료들과 함께 어울려 떠들썩하게 시간을 보낸다.", type: '🔥' }, { text: "아픈 동료를 간병하거나, 대장간 마을 사람들을 돕는다.", type: '💧' }, { text: "화려한 옷을 사러 가거나, 내 외모를 가꾸는 데 시간을 쓴다.", type: '⚡️' }, { text: "혼자 조용히 장기를 두거나, 전투 기록을 복기한다.", type: '☁️' }, { text: "누구의 방해도 받지 않고, 오직 개인 훈련에만 몰두한다.", type: '💪' } ] },
        { question: "Q16. 당신이 생각하는 '귀살대원으로서의 숙명'이란 무엇인가?", answers: [ { text: "자신의 신념을 지키고, 모두에게 인정받는 영웅이 되는 것.", type: '🔥' }, { text: "사랑하는 사람들을 지키며 함께 행복하게 사는 것.", type: '💧' }, { text: "역사에 길이 남을 나만의 무용담을 남기는 것.", type: '⚡️' }, { text: "누구에게도 방해받지 않고, 나의 임무를 합리적으로 완수하는 것.", type: '☁️' }, { text: "경쟁자들을 모두 꺾고 최강의 '주(柱)'가 되는 것.", type: '💪' } ] },
        { question: "Q17. 새로운 동료를 받아들일 때 가장 중요하게 보는 기준은?", answers: [ { text: "혈귀에 대한 투지와 열정.", type: '🔥' }, { text: "동료를 위하는 이타심과 배려심.", type: '💧' }, { text: "눈에 띄는 개성과 스타일.", type: '⚡️' }, { text: "냉철한 상황 판단 능력.", type: '☁️' }, { text: "압도적인 재능과 실력.", type: '💪' } ] },
        { question: "Q18. '마을 하나를 희생해서 상현을 잡는다'는 전략에 대한 당신의 생각은?", answers: [ { text: "아니다. 단 한 명의 무고한 희생도 있어서는 안 된다.", type: '🔥' }, { text: "아니다. 사람을 구하기 위한 귀살대가 사람을 희생시킬 수는 없다.", type: '💧' }, { text: "상관없다. 상현을 잡는다는 '화려한 전과'가 더 중요하다.", type: '⚡️' }, { text: "상황에 따라 다르다. 희생되는 인원과 상현의 강함을 데이터로 비교해 결정해야 한다.", type: '☁️' }, { text: "그렇다. 대의를 위한 소의 희생은 당연하다.", type: '💪' } ] },
        { question: "Q19. 당신에게 '귀살대'란 어떤 조직인가?", answers: [ { text: "혈귀를 섬멸한다는 공동의 목표를 위해 싸우는 운명 공동체.", type: '🔥' }, { text: "서로의 상처를 보듬어주는 따뜻한 나의 안식처.", type: '💧' }, { text: "나의 재능과 명성을 드높일 수 있는 최고의 무대.", type: '⚡️' }, { text: "혈귀 섬멸을 위한 효율적인 시스템. 그 이상도 이하도 아니다.", type: '☁️' }, { text: "내가 활용할 수 있는 장기말들의 집합.", type: '💪' } ] },
        { question: "Q20. 모든 싸움이 끝난 후, 당신이 꿈꾸는 궁극적인 미래는?", answers: [ { text: "모두에게 존경받는 위대한 검사로 역사에 남는 것.", type: '🔥' }, { text: "내가 사랑하는 모든 사람과 평화로운 일상을 보내는 것.", type: '💧' }, { text: "나의 이야기가 후세에 영웅담으로 화려하게 전해지는 것.", type: '⚡️' }, { text: "누구에게도 얽매이지 않고, 조용하고 완전한 자유를 얻는 것.", type: '☁️' }, { text: "이 세상의 정점에 서서 새로운 질서를 세우는 것.", type: '💪' } ] },
    ];
    
    const results = {
        rengoku: { name: "염주(炎柱) 렌고쿠 쿄쥬로", title: "[인간 난로]", description: "뜨거운 열정으로 후배들에게 무한한 동기를 부여하는 당신. 당신 곁에 있으면 누구든 자신감이 샘솟습니다. 후배의 작은 성공에도 자기 일처럼 기뻐하며 칭찬을 아끼지 않는 당신은 최고의 멘토입니다.", image: "https://i.namu.wiki/i/FYQRjmFAnpY0oJdphZb567Serv53K-mgArE7XtBimxmG4gZ7AjJylJFvhEAO9PSb2y3feViY--ltEDgqjIjZxhKCvumY0c68TxGji8rqDBxTSK_apTcCmhJ6_6orcLmmYKngVfTOi_2IGUPVlfOOJQ.webp" },
        mitsuri: { name: "연주(戀柱) 칸로지 미츠리", title: "[긍정 에너지]", description: "칭찬과 긍정의 힘으로 후배의 자존감을 키워주는 당신. 당신의 무한한 애정과 지지는 내성적인 후배도 춤추게 만듭니다. 결과보다는 과정의 즐거움을 알려주는 당신은 사랑 그 자체입니다.", image: "https://i.namu.wiki/i/RTUUC3Dk9G1EupDqummngeccBmF4ywFkrPSmINv6u-4qUGyaI8EHTbnz0wFnbsHfefM2Xdc-ygPQsMgiZQDfo1rT2IsZPoDPSqACvXuDCgOD3UzUxeod2o6EB82IyV4lwYi2jogc_Yvpaecg31EcIw.webp" },
        sanemi: { name: "풍주(風柱) 시나즈가와 사네미", title: "[하드 트레이너]", description: "거친 말투와 행동으로 후배를 극한까지 몰아붙여 성장시키는 당신. 과정은 고통스럽지만, 당신의 훈련을 버텨낸 후배는 강철 같은 멘탈을 갖게 됩니다. 강한 성장을 원하는 후배에게 추천합니다.", image: "https://i.namu.wiki/i/vtysQEoI0PR0z4Thi9do6zDaGXZFSeAl4beixXJ4hkIWROIFk-179VNJyuVQNSRXS99H5YD4TXE_zmI_owkY9OGyJvTwXhKIszxGTESlici-MhtdEY1sKOkSjXh24zjSIm0PscZXRaoS3cXj1kGa1Q.webp" },
        himejima: { name: "암주(岩柱) 히메지마 교메이", title: "[정신적 지주]", description: "자비로운 마음으로 모든 후배를 품어주는 당신. 실질적인 조언과 함께 마음의 상처까지 치유해주며, 후배가 올바른 길을 가도록 이끌어주는 당신은 살아있는 성인(聖人)입니다.", image: "https://i.namu.wiki/i/DizYLyHynCnn1H4-p5rhkZYNonbgMBB9P7_84GvzLSSB8sRR12GzhZypejR_4Xkpho2h5X3Gy7FKcmog7VJxzZ6vnvx_WswtUJkmN-e2laxm4TvuBCb-MatkmRPX4zYu2U-ZzvGMOV3DGJC9g6Ikzw.webp" },
        giyu: { name: "수주(水柱) 토미오카 기유", title: "[츤데레 수호자]", description: "말은 없지만, 누구보다 묵묵하고 헌신적으로 후배를 지키는 당신. 표현이 서툴러 오해를 사기도 하지만, 위기의 순간에 가장 먼저 나타나 모든 것을 해결해주는 든든함의 상징입니다.", image: "https://i.namu.wiki/i/sdO-jb_R-nRT2IxknBUv2ob3r6pVGVuhaRYTe_bdFFNQuSSxbLmu8WWyl7EziDR5y49yFa9JP2z2Ak1QLvqKiouMWX_b9IBgeBwN-9wI_bamYg71FwG3GiWfHdMnQo0W2T2hSstE9I8oXsIpenNPqw.webp" },
        shinobu: { name: "충주(蟲柱) 코쵸우 시노부", title: "[전략가]", description: "부드러운 말투와 논리적인 설명으로 후배의 잠재력을 정확히 진단하고 개발해주는 당신. 때로는 차갑게 느껴질 수 있지만, 모든 것은 후배의 성장을 위한 과학적인 처방입니다. 이공계 후배에게 특히 최고의 멘토가 될 수 있습니다.", image: "https://i.namu.wiki/i/UNnmEprZxx8jwmpEfEO6VG02crb1E_q2wpwezu4Cg2sC2LpAHxWQnRdVxqMwxgZkBAWdVZDIaD3pFt0FO2MGEpcLKtVuzOAIDXKpt8pOp3de3bx11r43X-XXMDI25xog9p8SQ5a23wPqSLF84BgEbw.webp" },
        uzui: { name: "음주(音柱) 우즈이 텐겐", title: "[아티스트]", description: "'화려하게!'를 외치며 자신만의 독창적인 스타일로 후배들을 이끄는 당신. 멘토링을 하나의 멋진 축제로 만드는 당신은 특히 예체능 계열 후배들에게 선망의 대상이 될 것입니다.", image: "https://i.namu.wiki/i/CWXL0d8ayNZgQVoCTU6FXZPU3ILoSOml5G83Pq3VaZGnZ0ob2iGfM_i4ocva0evhWeR9ET9ONUbjkZlG8sLzXZF6ZwuZhCrq2aYeekXEe5KdrYQJuZxgru2o-bcPEx--hoVYuwR50SlEoHlcA2bCTw.webp" },
        muichiro: { name: "하주(霞柱) 토키토 무이치로", title: "[천재]", description: "핵심만 간결하게, 최소한의 노력으로 최대의 효율을 추구하는 당신. 잡담이나 감정 소모 없이 오직 팩트와 결과로만 말합니다. 당신의 가르침은 조금 어렵지만, 따라갈 수만 있다면 후배의 실력은 비약적으로 상승할 것입니다.", image: "https://i.namu.wiki/i/pQT4ncOS09c7lVc1mq83EHdSuGG4H8XcFFfJS5VNxqYxVowS70-WGNSaX42jLK4GnNtP7cNFe5zI-1Kl8cuauaNwoQRyHaZOqKJYQZ4IhmJkkZkW3w2m1AUSjmo9bNZhHuyJvYKTrjWN6VZVZXZ-tA.webp" },
        iguro: { name: "사주(蛇柱) 이구로 오바나이", title: "[완벽주의자]", description: "깐깐하고 집요할 정도로 디테일을 중시하는 당신. 후배의 작은 실수도 그냥 넘어가지 않지만, 당신의 피드백은 결과물의 완성도를 극한까지 끌어올립니다. 꼼꼼한 성격의 후배와 최고의 시너지를 냅니다.", image: "https://i.namu.wiki/i/-B_P1YtCgbxGof8tvQfphBbalj-EiuLhuUF-o5SnBFcaTh7cg61ZzuV4a4suZpkqYjnSknmTP_YnPOLCFECs95m7Swwb_MwZSes0OujJBkbnV_5Wa_0W7rGv9iuP0gjRGFT-wSDlntYvkDdCqoYWdw.webp" },
        kokushibo: { name: "상현 1, 코쿠시보", title: "[엘리트]", description: "오직 실력과 정점만을 추구하는 고고한 당신. 당신에게 팀은 자신을 증명하기 위한 수단일 뿐, 약한 자와의 협업을 극도로 꺼립니다. 당신의 능력은 뛰어나지만, 멘토링보다는 개인의 성과를 내는 공모전이나 연구 활동을 추천합니다.", image: "https://i.namu.wiki/i/1L5DmaN58jvhrKOSMM0aR_RsXgYrS7Yenl2w_MT6R-SzKp-vw8PjSy0kJbSxgAJEdklcH5Db8t8g0_peDpxHnR-U0YEymEP1bxUOWDadsoT3IFBNiR-GCB0Oj3orQO_RtIfcfopOZrD3qhaoJ-EeYg.webp" },
        doma: { name: "상현 2, 도우마", title: "[매력적인 전략가]", description: "뛰어난 화술과 매력으로 사람들을 끌어모으지만, 진정한 공감 능력이 결여된 당신. 자신의 이익을 위해 팀을 이용할 수 있으며, 후배를 진심으로 위하기보다는 자신의 평판을 위한 도구로 여길 위험이 있습니다.", image: "https://i.namu.wiki/i/KJkyZSZt3q04I3Id1_0loqDrklJ94Zx6hO0CGF7vuU9dymvMoQ5lBAXZP3cNzbVSnBzlcciQNnFKKpDEseF0WT1WjlVuqWdpEl-t9HKY-IUoayJAKkJ8rJkWFmeirt1fMOM-sxlloNkyOtKv2IGEpQ.webp" },
        akaza: { name: "상현 3, 아카자", title: "[파이터]", description: "팀워크를 나약함의 상징으로 여기며, 오직 1:1의 치열한 경쟁을 통해 성장하는 당신. 멘토링은 당신에게 시간 낭비일 뿐입니다. 당신의 뜨거운 투쟁심은 라이벌과의 경쟁에서 가장 빛납니다.", image: "https://i.namu.wiki/i/HjCMR-PnIMJs7CHtyEooCWhPgc2lViPytv-lMleF80MRr3qZcNNoW5xbHNexwmUFfsN5vm5NOm8lYKlaq1JZSpGDqeYewtyCafp3mZJ8hQbR9RhsL6UXBf-6yJUDEKXyu6j80UHYGfkt8f3274A9gQ.webp" },
        hantengu: { name: "상현 4, 한텐구", title: "[신중한 안정 추구형]", description: "당신은 예측 불가능한 상황이나 갈등을 피하고, 명확한 규칙과 가이드라인 안에서 행동할 때 가장 큰 안정감을 느끼는 타입입니다. 리더의 명확한 지시 아래에서 자신의 역할을 완벽하게 수행할 때 최고의 능력을 발휘합니다.", image: "https://i.namu.wiki/i/EO09L9k1_oLwzDsEi2FP6POB3DRCbtolMCHKUrRbos69zotbe9JufB_K35eT-Bku2HQHmGH116n_zUmSd5h3Ybt3mJWBKU-K656GOicHyhLRziNwJ0Qw72zQ2cc7U0xHc4vuaPkzG8AIbtbrIpqAQw.webp" },
        gyokko: { name: "상현 5, 교코", title: "[자기 세계가 뚜렷한 스페셜리스트]", description: "당신은 자신만의 독창적인 세계관과 미적 기준이 매우 확고한 '아티스트'입니다. 여러 사람의 의견을 조율하는 협업 과정에서 당신의 독창성이 희석되는 것을 참기 힘들어하는군요. 개인 작품 공모전 등에서 당신의 진가가 드러날 것입니다.", image: "https://i.namu.wiki/i/xIJzdKk1z77d6W1Le4o4_RZv0aexqV_cWYFCwydpUvTJPRjQVcXpL_7EPIiP_Qeacnmq6xp6Q91H3BK1vmfQvgGwPYz2i_um3xXNYIEiLnVYwXdWJ6uHJwu0UlY3XDTjrCdQI0eEg2T9WhC-x_tMGg.webp" },
        gyutaro: { name: "상현 6, 규타로 & 다키", title: "[날카로운 현실주의자]", description: "당신은 이상적인 목표에 들뜨기보다, 현실적으로 발생할 수 있는 문제점이나 최악의 상황을 먼저 간파하는 날카로운 통찰력을 지녔습니다. 때로 당신의 비판적인 시각이 팀의 사기를 꺾는 것처럼 보일 수 있지만, 실패를 막으려는 당신의 예리함 덕분입니다.", image: "https://i.namu.wiki/i/yfN0oqKRLO4vQ2cAVwNkurSFMxXl107eMGNgp8sA0nOlwoNv0yCkctjlUVSps3iufOtm0q8IetV2tghH0au7XFr86YRyuWjGIZmD5o7TyA-tq_FU4mnfIWT5e1zcT8GIJnDVDKzqT-vzAWrt6WKS5w.webp" },
        ubuyashiki: { name: "수장, 우부야시키 카가야", title: "[완성형 리더]", description: "특정 분야에 치우치지 않는 넓은 시야와 모든 이를 포용하는 리더십을 갖춘 당신. 당신은 멘토링 프로그램에 '참여'할 인물이 아닙니다. 진로개발센터 프로그램을 직접 '기획'하고 운영해야 할 인재입니다.", image: "https://i.namu.wiki/i/XDGCRQloqu_r7vfiiK85QTrEIw_JbzOUtaiN5XziI5DEM3JGpwyLU9OHz16wI5raV8EttmGmXRqQzK8vQcLmXLNgaIQ2IlI6rSBVzEEg8dc8FP5jb1LE_B6xdjPAwEn084O-8vsyzMdgpI6uMKUvgw.webp" },
        tanjiro: { name: "주인공, 카마도 탄지로", title: "[성장형 주인공]", description: "끝없는 노력과 공감 능력으로 모두의 마음을 움직이는 당신. 아직은 누군가를 이끌기엔 부족할지 모르지만, 당신의 성실함과 착한 마음은 모두에게 귀감이 됩니다. 진로개발센터의 모든 프로그램에 참여하며 당신의 무한한 잠재력을 폭발시켜 보세요!", image: "https://i.namu.wiki/i/XDxdrDb5EfET9eod7H1StURXE21RMy-DRRAVrvnB14-qsZeKe7HEOhl9XQInz9FzAexvWEQr9T2ZduP6wU6O-y4khafcN1JUvM5_nyDIN_x8rl8kxdkaF_TDF6zwo9LzSxuPZmGDqAeYMSQ3YAe8yQ.webp" },
        muzan: { name: "최종 보스, 키부츠지 무잔", title: "[권력자]", description: "압도적인 카리스마와 냉혹함으로 조직을 장악하고 자신의 목적을 달성하는 당신. 당신에게 멘토링은 소꿉장난 같을 뿐. 당신의 그릇은 이미 학생 수준을 넘어섰습니다. 동아리 연합회장이나 총학생회장이 되어 당신의 왕국을 건설하십시오.", image: "https://i.namu.wiki/i/Wo9UiCNf2RLI-YpjyR5RDGnge_fZfS-i_C2sO45kWJQ7FJSzEivsrbDoiGjft3GkTNA3ikcIEgXifBZgBUc9TfdPTADfPsEFhqoatMPOgCvFDBwg0_bSPu8c9nbpxDQu1ULJOSNX87R_aWRwRr1lZA.webp" },
        nezuko: { name: "히로인, 카마도 네즈코", title: "[수호자]", description: "자신의 의견을 드러내기보다, 묵묵히 상황을 지켜보며 조용히 모두를 돕는 당신. 말없이 고개만 끄덕여도 당신의 진심은 통합니다. 시끄러운 팀플보다는 조용한 서포터 역할이나, 혼자 집중할 수 있는 과제가 주어졌을 때 가장 빛을 발하는 진정한 I(내향형) 100%입니다.", image: "https://i.namu.wiki/i/ljupIWGFjseSV10tlg1NstpX5zt8vTiCkL4sfODxxDGvWzEEQnk4bBA5KoO7sQ0pJOl_yfsoSKTkPuNLy8hcj-6zGqXiDscizgkYpa1eH4mKGS3v4aUlkv7koWA9NiC_nmvQ_cktpwtT1Ls9g-C4FA.webp" },
    };

    const compatibilityData = {
        rengoku: { best: [{ name: "토미오카 기유", reason: "당신의 불꽃같은 열정이 기유의 얼어붙은 마음을 녹여줍니다." }, { name: "카마도 탄지로", reason: "탄지로의 올곧은 성장을 이끌어 줄 최고의 조합입니다!" }], worst: [{ name: "코쿠시보, 키부츠지 무잔", reason: "당신의 순수한 열정은 강함만을 추구하는 그들의 논리를 이해하기 어렵습니다." }] },
        giyu: { best: [{ name: "렌고쿠 쿄쥬로", reason: "당신의 부족한 언변을 렌고쿠의 열정이 완벽하게 보완해 줄 것입니다." }, { name: "코쵸우 시노부", reason: "시노부의 섬세함이 당신의 진심을 알아줄 것입니다." }], worst: [{ name: "시나즈가와 사네미", reason: "표현 방식이 다른 두 사람이 만나면 오해가 쌓이기 쉽습니다. 먼저 손을 내밀어 보세요." }] },
        shinobu: { best: [{ name: "토미오카 기유", reason: "당신의 논리적인 전략은 기유의 검을 더욱 예리하게 만듭니다." }, { name: "히메지마 교메이", reason: "교메이의 자비심 아래에서 마음의 안정을 찾을 수 있습니다." }], worst: [{ name: "도우마", reason: "당신의 이성적인 접근은 감정이 없는 그의 가면을 꿰뚫어 보지만, 그만큼 스트레스도 많이 받게 됩니다." }] },
        mitsuri: { best: [{ name: "이구로 오바나이", reason: "당신의 무한한 긍정은 오바나이의 상처를 치유합니다." }, { name: "렌고쿠 쿄쥬로", reason: "렌고쿠의 열정과 만나 모두의 사기를 최상으로 끌어올립니다." }], worst: [{ name: "키부츠지 무잔", reason: "사랑과 정을 모르는 그에게 당신의 에너지는 통하지 않을 수 있습니다." }] },
        iguro: { best: [{ name: "칸로지 미츠리", reason: "당신의 깐깐함은 미츠리의 긍정 속에서 부드러워집니다." }, { name: "토키토 무이치로", reason: "무이치로의 천재성을 더욱 완벽하게 다듬어 줄 수 있습니다." }], worst: [{ name: "우즈이 텐겐", reason: "화려함을 추구하는 텐겐과 본질을 중시하는 당신은 사사건건 부딪칠 수 있습니다." }] },
        uzui: { best: [{ name: "렌고쿠 쿄쥬로", reason: "당신의 화려함은 렌고쿠의 열정과 만나 축제가 됩니다." }, { name: "카마도 탄지로", reason: "탄지로의 성실함이 당신의 계획을 완벽하게 실현시켜 줄 것입니다." }], worst: [{ name: "이구로 오바나이, 코쿠시보", reason: "'멋'을 모르는 그들에게 당신의 스타일은 그저 불필요한 움직임일 뿐입니다." }] },
        sanemi: { best: [{ name: "히메지마 교메이", reason: "당신의 폭풍 같은 분노는 교메이의 자비심 앞에서 잠잠해집니다." }, { name: "카마도 탄지로", reason: "탄지로의 끈질긴 진심에 마음을 열게 될 것입니다." }], worst: [{ name: "토미오카 기유", reason: "서로의 진심을 알기 전까지는 최악의 상성. 대화가 필요합니다." }] },
        muichiro: { best: [{ name: "이구로 오바나이", reason: "당신의 천재성은 오바나이의 꼼꼼함과 만나 완벽에 가까워집니다." }, { name: "카마도 탄지로", reason: "탄지로의 따뜻함이 당신의 잃어버린 기억을 되찾아 줄 것입니다." }], worst: [{ name: "아카자", reason: "효율을 중시하는 당신에게 무한한 단련을 강요하는 그는 피곤한 상대일 뿐입니다." }] },
        himejima: { best: [{ name: "모든 귀살대원", reason: "당신의 자비심은 모든 대원의 상처를 보듬고 이끌어주는 귀살대의 진정한 정신적 지주입니다." }], worst: [{ name: "키부츠지 무잔", reason: "생명을 경시하는 그와는 결코 함께할 수 없습니다." }] },
        special: { special: "<h4>🌟 십이귀월 & 히든 피스 유형</h4><p>이들은 기본적으로 타인과의 협력보다 자신의 목표를 우선시합니다. 굳이 파트너를 찾는다면, 자신의 목적 달성에 도움이 되는 상대를 일시적으로 이용할 뿐입니다. 이 결과가 나온 당신은 팀 활동보다는 <b>개인의 역량을 발휘할 수 있는 곳에서 더 빛날 수 있습니다!</b></p>" },
        tanjiro_special: { special: "<h4>🌟 주인공의 인연</h4><p>모든 '주(柱)'에게 사랑받는 최고의 후배 타입. 특히 <b>렌고쿠, 기유</b>와 함께할 때 무한히 성장합니다.</p>" },
        ubuyashiki_special: { special: "<h4>🌟 수장의 인연</h4><p>모든 이를 포용하는 리더. <b>히메지마 교메이</b>와 같은 정신적 지주와 함께라면 귀살대는 더욱 견고해집니다.</p>" },
        nezuko_special: { special: "<h4>🌟 히로인의 인연</h4><p>자신을 지켜주는 <b>탄지로, 기유</b>와 함께일 때 가장 안정감을 느낍니다.</p>" }
    };

    function startQuiz() {
        startScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
        const currentQ = questions[currentQuestionIndex];
        questionText.innerText = currentQ.question;
        currentQ.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(answer.type));
            answerButtons.appendChild(button);
        });
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    }

    function selectAnswer(type) {
        userScores[type]++;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            calculateResult();
        }
    }

    function calculateResult() {
        let resultKey = 'tanjiro'; 
        const scores = userScores;
        const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
        
        const primaryType = sortedScores[0][0];
        const primaryScore = sortedScores[0][1];
        const secondaryType = sortedScores[1][0];
        const dominanceGap = primaryScore - sortedScores[1][1];

        // Priority 1: The Absolutes (Extremely Rare)
        if (scores['💪'] >= 19) {
            resultKey = 'muzan';
        } else if (primaryScore <= 4) { // Perfect Balance (all scores are 4)
            resultKey = 'ubuyashiki';
        }
        // Priority 2: Rare Combinations
        else if (scores['🔥'] >= 7 && scores['💧'] >= 7 && (scores['🔥'] + scores['💧']) >= 15) {
            resultKey = 'tanjiro';
        } else if (scores['💧'] >= 10 && scores['🔥'] <= 1 && scores['⚡️'] <= 1 && scores['💪'] <= 1) {
            resultKey = 'nezuko';
        }
        // Priority 3: Uncommon (Dominant Pure Types)
        else if (primaryType === '🔥' && dominanceGap >= 4) {
            resultKey = 'rengoku';
        } else if (primaryType === '💧' && dominanceGap >= 4) {
            resultKey = 'himejima';
        } else if (primaryType === '⚡️' && dominanceGap >= 4) {
            resultKey = 'uzui';
        } else if (primaryType === '☁️' && dominanceGap >= 4) {
            resultKey = 'muichiro';
        }
        // Priority 4: Common (Combination Types)
        else {
            switch(primaryType) {
                case '🔥':
                    resultKey = (secondaryType === '💧') ? 'mitsuri' : 'sanemi';
                    break;
                case '💧':
                    resultKey = (secondaryType === '☁️') ? 'giyu' : 'shinobu';
                    break;
                case '⚡️':
                    resultKey = (secondaryType === '☁️') ? 'gyokko' : 'doma';
                    break;
                case '☁️':
                    resultKey = (secondaryType === '💧') ? 'hantengu' : 'kokushibo';
                    break;
                case '💪':
                    if (secondaryType === '🔥') resultKey = 'akaza';
                    else if (secondaryType === '💧') resultKey = 'iguro';
                    else if (secondaryType === '☁️') resultKey = 'kokushibo';
                    else resultKey = 'gyutaro';
                    break;
                default:
                    resultKey = 'tanjiro'; // Fallback
            }
        }

        showResult(resultKey);
    }

    function showResult(key) {
        lastResultKey = key; 
        quizScreen.style.display = 'none';
        chartScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        const result = results[key];
        resultImage.src = result.image;
        resultCharName.innerText = result.name;
        resultTitle.innerText = result.title;
        resultDescription.innerText = result.description;
    }
    
    function showChart() {
        resultScreen.style.display = 'none';
        chartScreen.style.display = 'block';

        const myName = results[lastResultKey].name;
        chartOwnerName.innerText = myName;
        
        let compatibilityKey = lastResultKey;
        if (['kokushibo', 'doma', 'akaza', 'hantengu', 'gyokko', 'gyutaro', 'muzan'].includes(lastResultKey)) {
            compatibilityKey = 'special';
        } else if (lastResultKey === 'tanjiro') {
            compatibilityKey = 'tanjiro_special';
        } else if (lastResultKey === 'ubuyashiki') {
            compatibilityKey = 'ubuyashiki_special';
        } else if (lastResultKey === 'nezuko') {
            compatibilityKey = 'nezuko_special';
        }

        const myCompatibility = compatibilityData[compatibilityKey];
        let chartHtml = '';

        if (myCompatibility) {
            if (myCompatibility.best) {
                chartHtml += '<h4>🤝 최고의 파트너</h4>';
                myCompatibility.best.forEach(p => { chartHtml += `<p><b>${p.name}:</b> ${p.reason}</p>`; });
            }
            if (myCompatibility.worst) {
                chartHtml += '<h4>⚠️ 주의가 필요한 상대</h4>';
                myCompatibility.worst.forEach(p => { chartHtml += `<p><b>${p.name}:</b> ${p.reason}</p>`; });
            }
            if (myCompatibility.special) {
                chartHtml += myCompatibility.special;
            }
        }
        
        dynamicChartContent.innerHTML = chartHtml;
    }

    function showResultView() {
        chartScreen.style.display = 'none';
        resultScreen.style.display = 'block';
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        userScores = { '🔥': 0, '💧': 0, '⚡️': 0, '☁️': 0, '💪': 0 };
        resultScreen.style.display = 'none';
        chartScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }
</script>
</body>
</html>

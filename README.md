<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>⚔️ 귀살대 최종 선별 테스트 v6.0</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg-dark:#1a1a2e; --bg-mid:#16213e; --primary:#e94560; --secondary:#0f3460;
  --text-light:#e0e0e0; --text-mid:#c0c0c0; --font:'Noto Sans KR',sans-serif;
}
*{box-sizing:border-box}
body{
  margin:0; font-family:var(--font); background:var(--bg-dark); color:var(--text-light);
  display:flex; align-items:center; justify-content:center; min-height:100vh; padding:24px 12px;
}
.container{
  width:min(680px, 92vw); background:var(--bg-mid); border-radius:16px; padding:22px 24px;
  border:1px solid var(--primary); box-shadow:0 0 30px rgba(233,69,96,.25);
}
h1,h2,h3{color:var(--primary); margin:0 0 8px}
#intro-text{font-size:.95em;color:var(--text-mid);background:var(--bg-dark);
  padding:14px;border-radius:10px;margin-top:12px;text-align:justify}
button{
  appearance:none; border:0; border-radius:24px; background:var(--primary); color:#fff;
  padding:12px 22px; font-size:1.05em; font-weight:700; cursor:pointer;
  transition:transform .12s ease, filter .12s ease; will-change:transform;
}
button:hover{filter:brightness(.95); transform:translateY(-1px)}
.secondary-btn{background:var(--secondary); margin-left:8px}
.screen{display:none}
.screen.active{display:block}
#question-text{
  font-size:1.2em; font-weight:700; line-height:1.55; text-align:justify;
  min-height:120px; /* 고정 높이로 점프 방지 */
}
#answer-buttons{
  display:flex; flex-direction:column; gap:10px;
  min-height:280px; /* 답변 영역 높이 확보 */
}
.answer-btn{
  width:100%; text-align:left; border-radius:12px; background:var(--secondary);
  padding:14px 12px; font-size:.98em; line-height:1.45; word-break:keep-all;
}
.answer-btn:hover{transform:translateY(-1px); filter:brightness(1.05)}
#progress-bar-container{width:100%; height:10px; background:var(--secondary);
  border-radius:6px; margin-top:16px; overflow:hidden}
#progress-bar{height:100%; width:0%; background:var(--primary); transition:width .25s ease}
.result-hero{display:flex; align-items:center; gap:14px; margin:8px 0 6px}
#result-image{width:84px; height:84px; border-radius:50%; border:3px solid var(--primary); object-fit:cover}
#result-name{font-size:1.15em; font-weight:700; margin:0}
#result-main-trait{font-size:1.35em; font-weight:800; color:#fff; margin:4px 0 2px}
#result-sub-trait{font-size:.98em; color:var(--text-mid); margin:0}
#result-description{
  margin-top:14px; font-size:1.02em; line-height:1.85; color:var(--text-light);
  white-space:pre-wrap; max-height:44vh; overflow:auto; padding-right:4px;
}
.stats-container{margin-top:18px; padding-top:12px; border-top:1px solid var(--secondary)}
.stats-container h3{text-align:center; margin-bottom:12px}
.stat-item{display:flex; align-items:center; gap:10px; margin:8px 0}
.stat-title{min-width:38px; font-weight:700; font-size:.88em}
.stat-bar{flex:1; height:12px; background:var(--secondary); border-radius:8px; overflow:hidden}
.stat-fill{height:100%; background:linear-gradient(90deg,#e94560,#ff7e5f)}
#mentoring-score-container{background:var(--bg-dark); padding:12px; border-radius:10px; margin-top:14px}
#mentoring-recommendation{white-space:pre-wrap; font-weight:700}
.button-group{display:flex; justify-content:center; gap:8px; margin-top:14px}

.chart-container h3{margin:0 0 12px; text-align:center}
#dynamic-chart-content h4{margin:16px 0 6px; color:#fff; border-left:4px solid var(--primary); padding-left:10px}
#dynamic-chart-content p{margin:0 0 8px 12px; line-height:1.6}
.chart-container{max-height:72vh; overflow:auto; padding-right:6px}
</style>
</head>
<body>
  <div class="container">
    <!-- 시작 화면 -->
    <div id="start-screen" class="screen active">
      <h1>⚔️ 귀살대 최종 선별 테스트 v6.0</h1>
      <p>20문항으로 5차원 성향을 측정, 20명의 캐릭터 중 가장 가까운 결과를 보여줘요.</p>
      <div id="intro-text">
        당신은 귀살대원이 되어 수많은 선택을 마주합니다. 질문에 답하며 당신 안의 ‘호흡’을 찾아보세요.
      </div>
      <div class="button-group">
        <button onclick="startQuiz()">테스트 시작</button>
      </div>
    </div>

    <!-- 질문 화면 -->
    <div id="quiz-screen" class="screen">
      <p id="question-text"></p>
      <div id="answer-buttons"></div>
      <div id="progress-bar-container"><div id="progress-bar"></div></div>
    </div>

    <!-- 결과 화면 -->
    <div id="result-screen" class="screen">
      <h2>당신의 유형은…</h2>
      <div class="result-hero">
        <img id="result-image" alt="캐릭터 이미지">
        <div>
          <p id="result-name"></p>
          <p id="result-main-trait"></p>
          <p id="result-sub-trait"></p>
        </div>
      </div>
      <div id="result-description"></div>

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
        <button class="secondary-btn" onclick="showChart()">나의 궁합 보기</button>
      </div>
    </div>

    <!-- 궁합 화면 -->
    <div id="chart-screen" class="screen chart-container">
      <h3><span id="chart-owner-name"></span> 님의 궁합표</h3>
      <div id="dynamic-chart-content"></div>
      <div class="button-group">
        <button onclick="showResultView()">결과로 돌아가기</button>
      </div>
    </div>
  </div>

<script>
// ============== 상태 ==============
const startScreen = document.getElementById('start-screen');
const quizScreen  = document.getElementById('quiz-screen');
const resultScreen= document.getElementById('result-screen');
const chartScreen = document.getElementById('chart-screen');
const questionText= document.getElementById('question-text');
const answerButtons=document.getElementById('answer-buttons');
const progressBar = document.getElementById('progress-bar');

const resultImage = document.getElementById('result-image');
const resultName  = document.getElementById('result-name');
const resultMainTrait = document.getElementById('result-main-trait');
const resultSubTrait  = document.getElementById('result-sub-trait');
const resultDescription = document.getElementById('result-description');

const chartOwnerName = document.getElementById('chart-owner-name');
const dynamicChartContent = document.getElementById('dynamic-chart-content');
const dimFills = [
  document.getElementById('dim1-fill'),
  document.getElementById('dim2-fill'),
  document.getElementById('dim3-fill'),
  document.getElementById('dim4-fill'),
  document.getElementById('dim5-fill')
];
const mentoringRecommendation = document.getElementById('mentoring-recommendation');

let currentQuestionIndex = 0;
let scores = {D1:0, D2:0, D3:0, D4:0, D5:0};
let lastResultKey = '';

// ============== 질문 (원본 그대로) ==============
const questions = [
  { q:"Q1. 당신과 동료가 혈귀에게 치명상을 입고 해독약은 하나뿐입니다. 동료는 당신에게 약을 양보합니다. 당신의 선택은?", a:[
    { t:"동료의 뜻을 존중, 약을 먹고 그의 의지를 이어받아 반드시 살아남겠다고 맹세한다.", v:{D1:2,D2:-1,D3:1,D4:-1,D5:1} },
    { t:"'두 명 다 살 방법이 있을 거야!' 필사적으로 다른 방법을 찾는다.", v:{D1:1,D2:2,D3:-1,D4:3,D5:0} },
    { t:"약을 반으로 나눠 함께 먹는다.", v:{D1:2,D2:2,D3:0,D4:2,D5:-1} },
    { t:"동료에게 약을 먹게 한다. 나는 버틴다.", v:{D1:3,D2:3,D3:0,D4:1,D5:-2} },
    { t:"냉정하게 판단하고 내가 먹는다.", v:{D1:-2,D2:-3,D3:2,D4:-2,D5:0} }
  ]},
  { q:"Q2. 강력한 혈귀가 후배를 인질로 잡고 칼을 버리면 살려주겠다고 한다. 당신의 선택은?", a:[
    { t:"버리는 척 시선을 분산, 숨겨둔 칼로 허점을 찌른다.", v:{D1:-1,D2:-2,D3:-1,D4:-1,D5:3} },
    { t:"일단 칼을 버리고 후배 안전부터 확보.", v:{D1:2,D2:1,D3:0,D4:2,D5:-2} },
    { t:"후배가 빠져나올 기회를 만들며 공격 시작.", v:{D1:1,D2:1,D3:-2,D4:1,D5:2} },
    { t:"후배 희생 각오, 동시 베기에 도전.", v:{D1:-3,D2:-3,D3:2,D4:-3,D5:1} },
    { t:"대화로 시간 벌며 목적을 파악.", v:{D1:2,D2:2,D3:1,D4:1,D5:-1} }
  ]},
  { q:"Q3. 당신의 '일륜도' 도공이 인질이지만, 그 혈귀를 놓치면 큰 마을이 위험하다. 당신의 선택은?", a:[
    { t:"은인의 생명은 포기 못 한다. 도공을 구한다.", v:{D1:3,D2:2,D3:-1,D4:1,D5:0} },
    { t:"둘 다 포기 못 한다. 동시 진행 방법을 구상.", v:{D1:1,D2:-1,D3:0,D4:2,D5:1} },
    { t:"더 큰 비극 방지 위해 마을로 간다.", v:{D1:-2,D2:0,D3:2,D4:-2,D5:-1} },
    { t:"함정일 수 있다. 분석 후 최적의 수.", v:{D1:-1,D2:-3,D3:1,D4:-2,D5:-2} },
    { t:"역할 분담: 동료는 구출, 나는 추적.", v:{D1:2,D2:0,D3:1,D4:1,D5:2} }
  ]},
  { q:"Q4. 동료가 '너무 이상적'이라 반박한다. 당신의 반응은?", a:[
    { t:"'이상이라도 좋다' 신념을 설득한다.", v:{D1:2,D2:2,D3:-1,D4:3,D5:1} },
    { t:"현실적 대안을 함께 찾는다.", v:{D1:2,D2:1,D3:1,D4:0,D5:-1} },
    { t:"일단 수용하는 척, 결과로 증명.", v:{D1:-2,D2:-1,D3:-2,D4:-1,D5:2} },
    { t:"데이터와 사례로 실현 가능성 증명.", v:{D1:0,D2:-3,D3:2,D4:-2,D5:0} },
    { t:"논쟁하지 않고 내 방식대로 추진.", v:{D1:-3,D2:0,D3:-2,D4:-1,D5:1} }
  ]},
  { q:"Q5. 전투 중 검이 부러졌다. 다음 행동은?", a:[
    { t:"부러진 검이라도 방패가 된다.", v:{D1:3,D2:1,D3:2,D4:1,D5:-3} },
    { t:"맨손/지형지물로 계속 싸운다.", v:{D1:0,D2:0,D3:-2,D4:0,D5:3} },
    { t:"현명하게 후퇴하며 재정비.", v:{D1:1,D2:-2,D3:1,D4:-2,D5:-2} },
    { t:"동료에게 서포트를 요청.", v:{D1:2,D2:2,D3:1,D4:2,D5:-1} },
    { t:"절망하지만 포기하진 않는다.", v:{D1:0,D2:3,D3:0,D4:-3,D5:0} }
  ]},
  { q:"Q6. 죽을 고비에 든 생각은?", a:[
    { t:"모두에게 미안해. 남은 사람들을 부탁해.", v:{D1:3,D2:3,D3:1,D4:-2,D5:-2} },
    { t:"사명은 끝나지 않았다!", v:{D1:2,D2:-1,D3:2,D4:-1,D5:1} },
    { t:"어떻게든 살아남아야 한다.", v:{D1:-3,D2:0,D3:-1,D4:-2,D5:-1} },
    { t:"이 전율, 살아있다는 증거!", v:{D1:-2,D2:2,D3:-2,D4:1,D5:3} },
    { t:"모든 것이 허무하다.", v:{D1:-1,D2:-2,D3:0,D4:-3,D5:0} }
  ]},
  { q:"Q7. 금지된 기술을 쓰면 분대를 구할 수 있다면?", a:[
    { t:"망설임 없이 사용.", v:{D1:3,D2:1,D3:-2,D4:1,D5:2} },
    { t:"규율도 중요하지만 지금은 생명 우선.", v:{D1:2,D2:2,D3:0,D4:2,D5:1} },
    { t:"규율은 어떤 상황에도 지켜야.", v:{D1:-1,D2:-2,D3:3,D4:-2,D5:-2} },
    { t:"장기적 위험 먼저 계산.", v:{D1:0,D2:-3,D3:2,D4:-3,D5:-1} },
    { t:"책임은 내가 진다.", v:{D1:1,D2:0,D3:-2,D4:-1,D5:3} }
  ]},
  { q:"Q8. 슬픔에 빠진 동료를 위로하는 방식은?", a:[
    { t:"함께 눈물을 흘린다.", v:{D1:1,D2:3,D3:0,D4:1,D5:-2} },
    { t:"훈련으로 잊게 돕는다.", v:{D1:2,D2:-1,D3:1,D4:-1,D5:1} },
    { t:"현실적인 방법을 제시.", v:{D1:0,D2:-3,D3:2,D4:-2,D5:0} },
    { t:"말없이 곁을 지킨다.", v:{D1:2,D2:2,D3:2,D4:0,D5:-3} },
    { t:"관심 없다. 내 일에 집중.", v:{D1:-3,D2:-2,D3:-1,D4:-2,D5:2} }
  ]},
  { q:"Q9. 새로운 '호흡'을 배울 때 당신의 스타일은?", a:[
    { t:"기본 형부터 완벽히.", v:{D1:0,D2:-1,D3:2,D4:-1,D5:1} },
    { t:"자유롭게 감각을 익힌다.", v:{D1:1,D2:2,D3:-3,D4:2,D5:2} },
    { t:"효율적인 기술만 빠르게 습득.", v:{D1:-1,D2:-2,D3:0,D4:-2,D5:0} },
    { t:"스승 가르침을 완벽 재현.", v:{D1:1,D2:0,D3:3,D4:0,D5:-2} },
    { t:"대련으로 실전 감각 우선.", v:{D1:-1,D2:1,D3:-2,D4:1,D5:3} }
  ]},
  { q:"Q10. 당신이 가장 경멸하는 대상은?", a:[
    { t:"무고한 사람들을 해치는 악.", v:{D1:3,D2:3,D3:2,D4:2,D5:1} },
    { t:"사명과 책임을 방기하는 자.", v:{D1:2,D2:-1,D3:3,D4:-1,D5:0} },
    { t:"나의 미학을 이해 못 하는 자.", v:{D1:-2,D2:1,D3:-3,D4:0,D5:2} },
    { t:"나약함을 핑계로 노력 않는 자.", v:{D1:-3,D2:-2,D3:1,D4:-3,D5:3} },
    { t:"과거에 얽매여 못 나아가는 자.", v:{D1:0,D2:-3,D3:0,D4:-2,D5:-1} }
  ]},
  { q:"Q11. '동료'는 어떤 의미?", a:[
    { t:"등을 맡길 가족.", v:{D1:3,D2:3,D3:0,D4:2,D5:-2} },
    { t:"강함을 증명할 비교 대상.", v:{D1:-3,D2:0,D3:-1,D4:-1,D5:3} },
    { t:"임무 성공을 위한 파트너.", v:{D1:0,D2:-3,D3:2,D4:-2,D5:0} },
    { t:"내가 지켜야 할 대상.", v:{D1:2,D2:2,D3:2,D4:1,D5:-3} },
    { t:"성장하는 라이벌.", v:{D1:1,D2:0,D3:-2,D4:0,D5:2} }
  ]},
  { q:"Q12. 전혀 다른 검술 스타일의 동료를 봤을 때?", a:[
    { t:"존중하고 배울 점을 탐구.", v:{D1:1,D2:1,D3:-2,D4:1,D5:0} },
    { t:"목표는 같으니 각자 방식대로.", v:{D1:2,D2:0,D3:1,D4:0,D5:-1} },
    { t:"정통 검술이 최고다.", v:{D1:-1,D2:-2,D3:3,D4:-2,D5:-2} },
    { t:"분석해 내 기술 보완.", v:{D1:-2,D2:-3,D3:-1,D4:-1,D5:2} },
    { t:"다르면 열등하다.", v:{D1:-3,D2:-1,D3:2,D4:-3,D5:3} }
  ]},
  { q:"Q13. 재능이 부족한 후배에게 줄 조언은?", a:[
    { t:"장점을 찾아 개발해준다.", v:{D1:2,D2:3,D3:-1,D4:3,D5:-1} },
    { t:"기본부터 다시, 함께 훈련.", v:{D1:2,D2:0,D3:2,D4:0,D5:-2} },
    { t:"다른 길을 찾는 것도 방법.", v:{D1:0,D2:-3,D3:1,D4:-3,D5:0} },
    { t:"혹독하게 한계를 넘겨라.", v:{D1:-1,D2:-2,D3:2,D4:-2,D5:2} },
    { t:"재능 없는 자는 필요 없다.", v:{D1:-3,D2:-3,D3:1,D4:-3,D5:3} }
  ]},
  { q:"Q14. 아픈 기억이 떠오르면?", a:[
    { t:"원동력 삼아 단련.", v:{D1:1,D2:-1,D3:2,D4:-2,D5:2} },
    { t:"혼자 곱씹는다.", v:{D1:0,D2:3,D3:0,D4:-1,D5:-3} },
    { t:"관련된 모든 것을 파괴하고 싶다.", v:{D1:-3,D2:2,D3:-2,D4:-3,D5:3} },
    { t:"이미 지난 일. 현재 집중.", v:{D1:0,D2:-3,D3:1,D4:0,D5:0} },
    { t:"동료와 이야기하며 위로.", v:{D1:3,D2:2,D3:-1,D4:2,D5:-2} }
  ]},
  { q:"Q15. 리더가 되었을 때 가장 중요한 것은?", a:[
    { t:"팀의 화합과 사기.", v:{D1:3,D2:3,D3:-1,D4:2,D5:-2} },
    { t:"임무 성공과 완벽한 결과.", v:{D1:0,D2:-3,D3:2,D4:-2,D5:1} },
    { t:"압도적 권위.", v:{D1:-3,D2:-1,D3:1,D4:-3,D5:3} },
    { t:"공정한 규칙과 신뢰.", v:{D1:2,D2:-2,D3:3,D4:-1,D5:-1} },
    { t:"개인의 성장과 잠재력.", v:{D1:2,D2:2,D3:-2,D4:3,D5:0} }
  ]},
  { q:"Q16. 혈귀가 된 전 동료를 만났다. 그는 당신을 기억한다. 당신의 선택은?", a:[
    { t:"눈물 머금고 편안히 해주겠다며 검을 든다.", v:{D1:2,D2:3,D3:2,D4:-1,D5:0} },
    { t:"인간으로 되돌릴 방법을 찾아 생포 시도.", v:{D1:2,D2:2,D3:-2,D4:3,D5:-2} },
    { t:"귀살대 규율에 따라 즉시 벤다.", v:{D1:0,D2:-3,D3:3,D4:-3,D5:1} },
    { t:"왜 그렇게 되었는지 먼저 묻는다.", v:{D1:2,D2:3,D3:-1,D4:2,D5:-3} },
    { t:"강해졌구나. 실력을 겨뤄보자.", v:{D1:-3,D2:0,D3:-2,D4:-1,D5:3} }
  ]},
  { q:"Q17. 당신이 지키고 싶은 것은?", a:[
    { t:"모든 이의 평범하고 행복한 일상.", v:{D1:3,D2:3,D3:2,D4:3,D5:-3} },
    { t:"귀살대의 역사와 정신.", v:{D1:2,D2:-1,D3:3,D4:-2,D5:0} },
    { t:"한 사람과의 약속.", v:{D1:2,D2:2,D3:1,D4:1,D5:-2} },
    { t:"나의 신념과 미학.", v:{D1:-2,D2:0,D3:-2,D4:-1,D5:2} },
    { t:"궁극의 힘에 도달한 나.", v:{D1:-3,D2:-3,D3:0,D4:-3,D5:3} }
  ]},
  { q:"Q18. 최강의 혈귀를 눈앞에 두었다. 전략은?", a:[
    { t:"모두의 힘을 합친다.", v:{D1:3,D2:2,D3:0,D4:2,D5:-1} },
    { t:"나만이 벨 수 있다. 비켜라.", v:{D1:-3,D2:0,D3:-1,D4:-2,D5:3} },
    { t:"싸우기 전 그의 사연을 듣고 싶다.", v:{D1:2,D2:3,D3:-2,D4:1,D5:-3} },
    { t:"최적 전략/가장 높은 승률.", v:{D1:0,D2:-3,D3:2,D4:-3,D5:0} },
    { t:"전투를 즐긴다.", v:{D1:-2,D2:1,D3:-3,D4:1,D5:2} }
  ]},
  { q:"Q19. 혈귀에게 가족을 잃은 아이를 만났다. 반응은?", a:[
    { t:"따뜻하게 안아주며 함께 운다.", v:{D1:2,D2:3,D3:0,D4:2,D5:-3} },
    { t:"강해져야 한다, 복수를 돕겠다.", v:{D1:-1,D2:0,D3:-1,D4:-2,D5:2} },
    { t:"귀살대의 숙명. 안전한 곳으로 데려간다.", v:{D1:1,D2:-3,D3:3,D4:-3,D5:-1} },
    { t:"내 과거를 보고, 말없이 지켜준다.", v:{D1:2,D2:2,D3:2,D4:0,D5:-2} },
    { t:"아무것도 해줄 수 없어 괴롭다.", v:{D1:0,D2:3,D3:0,D4:-2,D5:0} }
  ]},
  { q:"Q20. 모든 싸움이 끝난 세상에서 당신은?", a:[
    { t:"소중한 사람들과 평범한 나날.", v:{D1:3,D2:3,D3:1,D4:2,D5:-2} },
    { t:"새 목표를 찾아 끊임없이 나아간다.", v:{D1:-2,D2:-1,D3:-2,D4:0,D5:2} },
    { t:"떠나간 동료를 기리며 남은 이를 지킨다.", v:{D1:2,D2:2,D3:2,D4:-1,D5:-1} },
    { t:"세상을 유랑하며 경험을 쌓는다.", v:{D1:0,D2:1,D3:-3,D4:1,D5:0} },
    { t:"아무도 없는 곳에서 조용히 산다.", v:{D1:-3,D2:-2,D3:0,D4:-2,D5:-3} }
  ]}
];
  // [질문 배열 바로 아래에 추가]
const dims = ['D1','D2','D3','D4','D5'];
const SENSITIVITY = 1.2; // 1.0~1.5 권장. 높일수록 작은 차이에도 결과가 바뀜

function computeDimRanges(){
  const r = {D1:0,D2:0,D3:0,D4:0,D5:0};
  questions.forEach(q=>{
    const mins = {D1:Infinity,D2:Infinity,D3:Infinity,D4:Infinity,D5:Infinity};
    const maxs = {D1:-Infinity,D2:-Infinity,D3:-Infinity,D4:-Infinity,D5:-Infinity};
    q.a.forEach(opt=>{
      dims.forEach(d=>{
        const v = opt.v[d]||0;
        if(v<mins[d]) mins[d]=v;
        if(v>maxs[d]) maxs[d]=v;
      });
    });
    dims.forEach(d=>{ r[d] += Math.abs((maxs[d]-mins[d])||0); });
  });
  dims.forEach(d=>{ if(r[d]===0) r[d]=1; });
  return r;
}
const DIM_RANGE = computeDimRanges();

// ============== 결과 데이터(이미지/타이틀/설명) ==============
// 각 main은 고유 문구로 수정, 이미지 링크는 사용자가 준 주소 사용
const results = {
  rengoku:{ name:"렌고쿠 쿄쥬로", main:"열정 넘치는 행동대장", sub:"[개척자 타입]",
    image:"https://i.namu.wiki/i/FYQRjmFAnpY0oJdphZb567Serv53K-mgArE7XtBimxmG4gZ7AjJylJFvhEAO9PSb2y3feViY--ltEDgqjIjZxhKCvumY0c68TxGji8rqDBxTSK_apTcCmhJ6_6orcLmmYKngVfTOi_2IGUPVlfOOJQ.webp",
    desc:`불꽃의 호흡처럼, 당신의 존재는 어둠 속에서도 꺼지지 않는 등불이며, 스스로 빛을 내어 세상을 밝히는 희망입니다. 타인이 주저하고 두려워할 때, 당신은 먼저 나서서 길을 열고 모두를 이끄는 사람이지요. 그 따뜻한 열정은 주변을 비추고, 함께하는 이들에게 앞으로 나아갈 용기를 불어넣습니다.

당신의 행동은 언제나 뜨겁지만 결코 무분별하지 않습니다. 불꽃이 무질서하게 타오르는 것이 아니라, 필요한 순간에 가장 강렬하게 타올라 어둠을 밀어내듯, 당신의 결단은 늘 공동체와 동료를 위한 선택으로 이어집니다. 그 불꽃은 자신의 안위를 뒤로한 채, 모두가 살아남을 수 있는 길을 밝히려는 헌신의 상징입니다.

불꽃에 베인 혈귀는 단순한 상처가 아니라, 정의의 열기에 전신이 태워지는 듯한 절망을 느낍니다. 그들에게는 불꽃이 곧 심판이자 소멸이며, 더 이상 저항할 수 없는 뜨거운 운명이지요. 그러나 같은 불꽃을 마주하는 아군에게는 정반대의 감정이 찾아옵니다. 꺼져가던 용기와 희망이 다시 타올라, 쓰러진 자도 다시 일어서고, 두려움에 떨던 자도 다시 칼을 쥘 힘을 얻습니다.

결국 당신의 존재는 단순히 불꽃이 아니라, 꺼지지 않는 희망의 불길입니다. 타인을 위해 몸을 태우는 그 헌신은 곁에 있는 모두를 지키는 방패이자, 더 나아가야 할 길을 비추는 등불입니다. 그 열기는 혼자가 아니라 함께 살아가야 한다는 진리를 새기며, 그 온기는 끝내 모두를 다시 일으켜 세웁니다.` },

  uzui:{ name:"우즈이 텐겐", main:"화려한 해결사", sub:"[아티스트 타입]",
    image:"https://i.namu.wiki/i/CWXL0d8ayNZgQVoCTU6FXZPU3ILoSOml5G83Pq3VaZGnZ0ob2iGfM_i4ocva0evhWeR9ET9ONUbjkZlG8sLzXZF6ZwuZhCrq2aYeekXEe5KdrYQJuZxgru2o-bcPEx--hoVYuwR50SlEoHlcA2bCTw.webp",
    desc:`음의 울림처럼, 당신의 성향은 화려함과 생동감 속에서 빛납니다. 늘 유쾌하고 자신감 넘치는 모습으로 사람들의 시선을 사로잡지만, 그 내면에는 누구보다 진중한 책임감과 동료를 향한 따뜻한 마음이 숨어 있지요. 당신은 자신의 존재가 무대 위의 조명이 되어야 한다고 믿으며, 삶을 단조롭게 흘려보내는 대신 언제나 화려하고 값지게 살아가려는 열망을 품고 있습니다.

당신이 추구하는 것은 단순한 승리나 강함이 아닙니다. “화려한 삶, 그리고 지켜야 할 사람들을 끝까지 보호하는 것”입니다. 그래서 때로는 허세와 농담으로 가볍게 보일지라도, 중요한 순간에는 누구보다 진지하게 칼을 휘두르며, 자신보다 소중한 이들을 먼저 생각하지요. 당신의 화려함은 결코 겉모습만의 장식이 아니라, 어둠 속에서도 사람들을 빛나게 하는 힘입니다.

음의 호흡에 베인 자는 단순히 칼날의 상처를 입는 것이 아니라, 마치 전장의 북소리와 폭죽이 한순간에 터져 나오는 듯한 충격과 압도감을 경험합니다. 그 박동 같은 울림은 상대의 혼을 흔들어 혼란스럽게 만들고, 순간적으로 모든 것이 무너져내리는 듯한 공허를 남깁니다. 그러나 같은 울림은 아군에게는 전혀 다르게 다가옵니다. 그것은 곧 용기와 사기를 북돋우는 힘으로 바뀌어, 다시 싸울 수 있는 심장을 두근거리게 하지요.

결국 당신의 성향은 평범함을 거부하고, 언제나 자신답게 화려하게 살아가려는 영혼입니다. 그 화려함은 허세가 아니라, 무대 위에서 끝내 꺼지지 않는 빛이자, 곁에 있는 이들을 위한 힘입니다. 우즈이 텐겐처럼, 당신은 삶을 하나의 장대한 공연처럼 꾸려가며, 그 속에서 동료와 사랑하는 이들을 끝까지 지켜내는 사람입니다.` },

  mitsuri:{ name:"칸로지 미츠리", main:"사랑을 전파하는 치유자", sub:"[인플루언서 타입]",
    image:"https://i.namu.wiki/i/RTUUC3Dk9G1EupDqummngeccBmF4ywFkrPSmINv6u-4qUGyaI8EHTbnz0wFnbsHfefM2Xdc-ygPQsMgiZQDfo1rT2IsZPoDPSqACvXuDCgOD3UzUxeod2o6EB82IyV4lwYi2jogc_Yvpaecg31EcIw.webp",
    desc:`봄꽃처럼, 당신의 성향은 따스한 사랑과 넘치는 생기로 가득합니다. 밝고 다정한 모습으로 사람들에게 다가가며, 작은 것에도 기뻐하고 감동하는 순수한 마음을 지녔지요. 그러나 그 부드러움 뒤에는 누구보다 강인한 힘과 흔들림 없는 용기가 숨어 있습니다. 당신은 스스로를 감추거나 줄이지 않고, 있는 그대로의 자신을 사랑하며 당당히 살아가고자 하는 열망을 품고 있습니다.

당신이 추구하는 것은 단순한 인정이나 칭찬이 아닙니다. “사랑받고, 사랑을 나누며, 진심으로 연결된 관계”입니다. 그 마음은 동료를 향한 헌신과 따뜻한 배려로 이어지고, 위험 앞에서도 물러서지 않게 하는 힘이 됩니다. 겉으로는 귀엽고 부드럽지만, 그 내면은 누구보다 뜨겁고 강렬한 불꽃처럼, 사람들을 끝까지 지켜내고자 하지요.

사랑의 호흡에 베인 자는 단순히 상처를 입는 것이 아니라, 한순간 압도적인 매혹과 혼란에 사로잡히는 체험을 합니다. 칼날의 궤적은 마치 춤추듯 유려하고 아름다워, 그 앞에서는 경계심마저 무너져내립니다. 그러나 그 아름다움 뒤에 숨겨진 힘은 날카롭고 치명적이어서, 상대는 달콤한 환상 속에서 순식간에 쓰러지게 되지요. 반대로 아군에게는 그 궤적이 사랑과 희망의 상징으로 다가와, 함께 싸울 힘과 따뜻한 위안을 줍니다.

결국 당신의 성향은 사랑을 삶의 중심에 두고, 그 사랑으로 강함을 증명하는 영혼입니다. 당신의 다정함은 단순한 온화함이 아니라, 세상을 지탱하는 힘이며, 곁에 있는 이들에게 끝없는 용기를 주는 원천입니다. 칸로지 미츠리처럼, 당신은 사랑을 무기로 삼아 절망을 이겨내고, 희망을 꽃피우는 사람입니다.` },

  tanjiro:{ name:"카마도 탄지로", main:"따뜻한 공감 능력자", sub:"[개척자 타입]",
    image:"https://i.namu.wiki/i/XDxdrDb5EfET9eod7H1StURXE21RMy-DRRAVrvnB14-qsZeKe7HEOhl9XQInz9FzAexvWEQr9T2ZduP6wU6O-y4khafcN1JUvM5_nyDIN_x8rl8kxdkaF_TDF6zwo9LzSxuPZmGDqAeYMSQ3YAe8yQ.webp",
    desc:`저녁노을 처럼, 당신의 성향은 따뜻한 온기와 굳센 의지를 동시에 품고 있습니다. 누구보다 다정하고 공감하는 마음을 지녔지만, 그 안에는 어떤 시련 앞에서도 꺾이지 않는 강인함이 숨어 있지요. 

당신은 타인의 아픔을 외면하지 못하고, 심지어 적마저도 이해하려 애쓰는 넓은 가슴을 가지고 있습니다. 그러나 동시에, 사랑하는 이들을 지키기 위해서는 망설임 없이 칼을 쥐는 결단을 내릴 줄 아는 용기를 품고 있습니다. 

당신이 추구하는 것은 단순한 승리가 아닙니다. “사랑하는 이를 끝까지 지키고, 슬픔을 희망으로 바꾸는 것”입니다. 그 마음은 흔들림 없는 발걸음이 되어 당신을 앞으로 나아가게 하고, 동료들에게는 신뢰와 의지가 됩니다. 설령 길이 험하고 불리하더라도, 당신의 다정함과 강인함은 함께 있는 이들에게 희망을 불어넣습니다. 

불의 호흡(히노카미 가구라)에 베인 자는 단순한 상처를 넘어, 온몸을 태워버리는 듯한 뜨거운 열기와 압도적인 기세를 느낍니다. 그 불꽃은 단순한 파괴가 아니라, 모든 어둠을 밀어내는 강렬한 의지의 상징입니다. 상대는 그 불길 앞에서 자신이 맞서는 것이 단순한 인간이 아니라, 결코 꺼지지 않는 희망의 화신임을 깨닫게 되지요. 반대로 동료는 그 불길을 바라보며 다시 일어설 힘을 얻고, 자신의 한계를 넘어설 용기를 받습니다. 결국 당신의 성향은 다정함과 강함을 동시에 지닌 영혼입니다. 눈물은 당신의 약함이 아니라, 타인을 향한 사랑의 증거이며, 칼끝은 단순한 무기가 아니라 희망을 지켜내는 도구입니다. 탄지로처럼, 당신은 고통 속에서도 따뜻함을 잃지 않고, 끝내 사랑하는 사람들과 함께 살아가기 위한 길을 밝혀가는 사람입니다.` },

  himejima:{ name:"히메지마 교메이", main:"흔들림 없는 수호자", sub:"[수호자 타입]",
    image:"https://i.namu.wiki/i/DizYLyHynCnn1H4-p5rhkZYNonbgMBB9P7_84GvzLSSB8sRR12GzhZypejR_4Xkpho2h5X3Gy7FKcmog7VJxzZ6vnvx_WswtUJkmN-e2laxm4TvuBCb-MatkmRPX4zYu2U-ZzvGMOV3DGJC9g6Ikzw.webp",
    desc:`바위처럼, 당신의 성향은 흔들림 없는 의지와 깊은 신념 위에 세워져 있습니다. 외형은 거대하고 위압적이지만, 그 내면에는 누구보다 여리고 따뜻한 마음이 숨어 있습니다. 

세상의 가혹한 시련은 당신에게 많은 눈물을 안겨주었지만, 그 눈물은 결코 약함이 아니라 강함의 또 다른 모습이었습니다. 당신은 눈물 속에서 진실을 보고, 고통 속에서 믿음을 다져왔습니다. 당신이 지닌 힘은 단순한 육체적 강함을 넘어섭니다. 그것은 자신을 희생하면서까지 타인을 지키려는 절대적인 의지에서 비롯됩니다. 

세상은 때로 잔인하고 불공평하게 다가오지만, 당신은 그 앞에서 쉽게 무너지지 않습니다. 오히려 기도와 신념으로 마음을 다스리며, 누구도 대신 짊어질 수 없는 무거운 돌덩이를 묵묵히 견뎌내지요. 그렇기에 당신 곁에 있는 이들은 절망 속에서도 다시 희망을 바라보게 됩니다. 

바위의 호흡에 베인 자는 단순히 육체가 갈라지는 고통만을 느끼는 것이 아닙니다. 그것은 마치 하늘에서 무너져 내린 거대한 암석에 짓눌린 듯한 압도감, 도망칠 수 없는 무게에 깔린 듯한 절망감을 동반합니다. 하지만 그 순간조차 단순한 파괴로 끝나지 않습니다. 오히려 맞서는 이는 자신의 나약함과 마주하고, 진정한 강함이 무엇인지 스스로 깨닫게 되지요. 결국 당신의 성향은 고통을 피하지 않고 껴안으며, 그 속에서 흔들림 없는 믿음을 세우는 사람입니다. 

눈물은 당신의 약점이 아니라, 오히려 그 깊은 인간다움의 증거이지요. 그래서 당신은 누구보다 강하고, 동시에 누구보다 따뜻합니다. 바위의 호흡을 다스리는 교메이처럼, 당신 또한 주변의 삶을 떠받치고 흔들림 없는 의지가 되어주는 든든한 존재입니다.` },

  sanemi:{ name:"시나즈가와 사네미", main:"상처 입은 야수", sub:"[츤데레 타입]",
    image:"https://i.namu.wiki/i/vtysQEoI0PR0z4Thi9do6zDaGXZFSeAl4beixXJ4hkIWROIFk-179VNJyuVQNSRXS99H5YD4TXE_zmI_owkY9OGyJvTwXhKIszxGTESlici-MhtdEY1sKOkSjXh24zjSIm0PscZXRaoS3cXj1kGa1Q.webp",
    desc:`거센 바람처럼, 당신의 성향은 거칠고 거센 겉모습 속에 숨어 있는 깊은 진심으로 이루어져 있습니다. 날카로운 말과 행동으로 타인을 밀어내지만, 그 모든 것은 사실 누군가를 지키기 위한 본능적 방식이지요. 당신은 사랑하는 이를 잃은 상처를 안고 살아가지만, 그 고통을 강한 결심으로 바꾸어 세상을 향한 방패가 됩니다.

당신이 추구하는 것은 단순한 승리나 강함이 아닙니다. “사랑하는 사람들을 더 이상 잃지 않기 위한 철저한 보호”입니다. 그래서 당신은 늘 앞장서서 위험을 맞고, 때로는 냉정하고 가혹한 태도를 보이더라도, 그 안에는 누구보다도 따뜻한 마음이 숨겨져 있습니다. 당신의 거친 바람은 결코 파괴만을 의미하지 않고, 오히려 타인을 위해 자신의 몸을 내던지는 강인한 결심의 표현입니다.

바람의 호흡에 베인 자는 단순히 칼날의 상처를 입는 것이 아닙니다. 폭풍에 휘말린 듯한 혼란과 압박감, 그리고 끝내 어디에도 설 수 없는 불안정함을 체험합니다. 그 바람은 끊임없이 몸을 찢어내며, 마치 세상의 모든 방향에서 동시에 몰아치는 듯한 절망을 남기지요. 그러나 같은 바람은 아군에게는 다르게 다가옵니다. 그것은 앞길의 장애물을 쓸어내고, 다시 나아갈 수 있는 자유와 공간을 열어주는 힘으로 바뀝니다.

결국 당신의 성향은 거친 겉모습 속에 누구보다 깊은 보호 본능을 품은 영혼입니다. 상처는 당신을 차갑게 만든 듯 보이지만, 실은 그 누구보다 뜨겁게 타인을 생각하는 증거입니다. 시나즈가와 사네미처럼, 당신은 스스로 폭풍이 되어 고통을 짊어지고, 끝내는 동료에게 안전한 하늘을 열어주는 사람입니다.` },

  shinobu:{ name:"코쵸우 시노부", main:"얼음처럼 차가운 복수자", sub:"[전략가 타입]",
    image:"https://i.namu.wiki/i/UNnmEprZxx8jwmpEfEO6VG02crb1E_q2wpwezu4Cg2sC2LpAHxWQnRdVxqMwxgZkBAWdVZDIaD3pFt0FO2MGEpcLKtVuzOAIDXKpt8pOp3de3bx11r43X-XXMDI25xog9p8SQ5a23wPqSLF84BgEbw.webp",
    desc:`나비처럼, 당신의 성향은 가볍고 섬세해 보이지만, 그 안에는 누구보다 날카롭고 단단한 결심이 숨어 있습니다. 밝은 미소와 부드러운 태도로 사람들에게 다가서지만, 그 미소 뒤에는 깊은 상처와 지울 수 없는 슬픔이 자리하지요. 당신은 그 아픔을 단순히 감추는 것이 아니라, 타인을 지키고자 하는 의지로 승화시키는 힘을 지니고 있습니다.

당신이 추구하는 것은 단순한 복수나 강함이 아닙니다. “누군가의 고통을 덜어주고, 절망 속에서 다시 피어나는 희망을 남기는 것”입니다. 그래서 때로는 자신의 몸을 희생하는 길을 택하더라도, 그것이 곧 타인의 삶을 지켜내는 일이라면 주저하지 않습니다. 당신의 부드러움은 결코 나약함이 아니라, 누구보다 강한 각오의 다른 얼굴입니다.

충의 호흡에 베인 자는 단순한 상처만을 입지 않습니다. 칼날 끝에서 스며드는 독은 서서히 몸을 마비시키며, 마치 꽃잎이 흩날리듯 생명이 꺼져가는 공포를 안겨줍니다. 그 체험은 고통스럽지만 동시에 아름답게, 상대는 자신이 맞서는 것이 단순한 인간이 아니라, 은밀하면서도 치명적인 운명임을 깨닫게 되지요. 반대로 아군에게는 그 향기와 우아한 움직임이 희생적인 결의와 끝없는 헌신의 상징으로 다가옵니다.

결국 당신의 성향은 연약해 보이지만 누구보다 강인하고, 아픔조차 타인을 위한 결심으로 바꾸는 영혼입니다. 당신의 미소는 단순한 위장이 아니라, 주변을 지켜내기 위한 강한 각오이며, 그 부드러움 속에는 누구보다 깊은 용기가 숨어 있습니다. 코초 시노부처럼, 당신은 고통을 사랑으로 바꾸어내고, 희생 속에서 끝내 희망을 피워 올리는 사람입니다.` },

  giyu:{ name:"토미오카 기유", main:"고요한 물의 검사", sub:"[독립 해결사 타입]",
    image:"https://i.namu.wiki/i/sdO-jb_R-nRT2IxknBUv2ob3r6pVGVuhaRYTe_bdFFNQuSSxbLmu8WWyl7EziDR5y49yFa9JP2z2Ak1QLvqKiouMWX_b9IBgeBwN-9wI_bamYg71FwG3GiWfHdMnQo0W2T2hSstE9I8oXsIpenNPqw.webp",
    desc:`고요한 강물처럼, 당신의 성향은 차분하고 침착하며, 깊은 내면의 울림을 지니고 있습니다. 겉으로는 무심하고 말수가 적어 보이지만, 그 안에는 누구보다 섬세하고 진중한 마음이 숨어 있지요. 당신은 불필요한 말이나 행동보다는, 필요한 순간에 조용히 힘을 보태는 방식을 택합니다. 사람들은 때때로 당신을 냉정하다고 오해하지만, 사실은 타인의 무게를 함께 짊어지고 싶어 하는 따뜻한 마음이 그 침묵에 담겨 있습니다.

당신이 추구하는 것은 단순한 승리나 명예가 아닙니다. “끝내 지켜내는 것, 그리고 함께 살아남는 것”입니다. 그래서 스스로를 내세우기보다 뒤에서 흐르는 물처럼 조용히 모두를 떠받치며, 때로는 강이 되어 큰 벽을 무너뜨립니다. 당신의 차분함은 무심함이 아니라, 흔들림 없는 마음에서 비롯된 것이지요.

물의 호흡에 베인 자는 단순히 칼날에 상처를 입는 것이 아닙니다. 끝없이 흐르는 강물 속에 휩쓸려 사라지는 듯한 압도적인 무력감을 느낍니다. 흐름은 피할 수 없고, 저항할수록 더욱 깊은 소용돌이에 휘말려 결국 무너져내리게 되지요. 그러나 같은 물의 흐름은 아군에게는 전혀 다르게 다가옵니다. 그것은 메마른 땅을 적시는 단비처럼, 곁에 있는 이들에게 안정을 주고, 다시 일어설 힘을 불어넣습니다.

결국 당신의 성향은 말없이 흘러가지만, 누구보다 깊고 강하게 세상을 지탱하는 영혼입니다. 차분한 겉모습은 외로움의 가면이 아니라, 타인을 위해 감정을 다스리는 또 다른 용기입니다. 토미오카 기유처럼, 당신은 조용히 흐르면서도 끝내 강을 이뤄, 모두를 살아남게 하는 사람입니다.` },

  muichiro:{ name:"토키토 무이치로", main:"세상과 단절된 천재", sub:"[마이웨이 타입]",
    image:"https://i.namu.wiki/i/pQT4ncOS09c7lVc1mq83EHdSuGG4H8XcFFfJS5VNxqYxVowS70-WGNSaX42jLK4GnNtP7cNFe5zI-1Kl8cuauaNwoQRyHaZOqKJYQZ4IhmJkkZkW3w2m1AUSjmo9bNZhHuyJvYKTrjWN6VZVZXZ-tA.webp",
    desc:`무이치로는 겉으로는 공허하고 무심한 듯 보이지만, 그 안에는 누구도 쉽게 닿을 수 없는 고요한 집중과 날카로운 통찰이 숨어 있습니다. 그는 세상의 잡음을 차단하고 오직 본질만을 꿰뚫어 보는 자신만의 방식을 지닌 사람이지요. 타인의 감정이나 주변의 상황에 무심해 보이는 것도 사실은 무관심이 아니라, 가장 중요한 것을 지키기 위해 모든 불필요한 것을 지워내는 고도의 집중 상태입니다.

그의 사고는 현실의 표면보다 원리와 가능성에 머물며, 언제나 본질을 향해 나아갑니다. 전투에서도 감정에 휘둘리지 않고, 눈앞의 상황을 단번에 꿰뚫어 최적의 길을 선택하지요. 마치 안개가 세상을 가려도 그는 그 너머의 허점을 정확히 읽어내는 것처럼 말입니다.

안개의 호흡은 그의 성격과 닮아 있습니다. 흐릿하게 스며들어 시선을 빼앗다가도, 어느 순간 예리하게 치고 들어와 단번에 결판을 내리는 기술. 그 검격에 베인 자는 단순히 몸이 갈라지는 고통만을 느끼는 것이 아니라, 자신이 하찮은 존재로 전락한 듯한 굴욕과 모멸을 온몸으로 겪습니다. 그것은 안개처럼 은근히 파고들어, 끝내 벗어날 수 없는 혼란과 절망을 안기지요.

결국 무이치로란, 고요 속에 잠든 듯하면서도 가장 치명적인 순간을 만들어내는 존재입니다. 그의 호흡은 그의 삶이고, 그의 무심은 단순한 외면이 아니라 본질을 향한 집요한 눈길입니다. 안개는 희미해 보이지만, 그 안에서 날카로운 칼날은 언제나 준비되어 있습니다.` },

  iguro:{ name:"이구로 오바나이", main:"집요한 완벽주의자", sub:"[완벽주의자 타입]",
    image:"https://i.namu.wiki/i/-B_P1YtCgbxGof8tvQfphBbalj-EiuLhuUF-o5SnBFcaTh7cg61ZzuV4a4suZpkqYjnSknmTP_YnPOLCFECs95m7Swwb_MwZSes0OujJBkbnV_5Wa_0W7rGv9iuP0gjRGFT-wSDlntYvkDdCqoYWdw.webp",
    desc:`뱀처럼, 당신의 성향은 날카롭고 집요하며, 한 번 물면 놓지 않는 끈질김으로 드러납니다. 겉으로는 날카로운 시선과 냉정한 태도로 다가서지만, 그 안에는 누구보다 섬세하고 불안정한 마음이 숨어 있습니다. 당신은 쉽게 믿지 않고, 세상에 대한 의심 속에서 살아가지만, 그럼에도 불구하고 믿을 수 있는 단 한 사람, 그리고 지켜야 할 가치는 결코 배반하지 않는 강한 충성심을 품고 있습니다.

당신이 추구하는 것은 단순한 승리가 아닙니다. “흔들리지 않는 인연과, 끝내 지켜내야 할 진실”입니다. 스스로는 불완전하다고 느끼더라도, 소중한 사람을 위해서는 기꺼이 모든 것을 걸 수 있지요. 그래서 당신의 집착은 곧 사랑으로, 당신의 날카로움은 곧 보호의 다른 얼굴로 변합니다. 사람들에게는 차갑게 보여도, 사실은 누구보다 뜨겁게 애쓰는 마음이 당신을 움직이고 있습니다.

뱀의 호흡에 베인 자는 단순히 상처를 입는 것이 아닙니다. 사방에서 동시에 휘감겨 들어오는 듯한 압박과, 어디로도 도망칠 수 없는 절망을 체험합니다. 칼날의 궤적은 마치 끝없이 꿈틀거리는 뱀의 몸처럼 불규칙하고 예측 불가하여, 상대는 혼란과 공포 속에서 끝내 길을 잃게 되지요. 그러나 같은 움직임은 아군에게는 완전히 다른 의미가 됩니다. 그것은 동료를 향한 철저한 보호망이자, 어떤 위협도 뚫고 들어올 수 없는 강력한 방패처럼 다가옵니다.

결국 당신의 성향은 날카로운 집착 속에서도 가장 깊은 충성심과 사랑을 품은 영혼입니다. 차갑게만 보이는 외면은 사실 자신을 불완전하다고 여기는 내면의 불안에서 비롯된 것이지만, 그럼에도 불구하고 소중한 인연을 위해 모든 것을 바치는 진심이 숨겨져 있습니다. 이구로 오바나이처럼, 당신은 의심과 불안을 딛고, 끝내 사랑과 충성을 위해 살아가는 사람입니다.` },

  nezuko:{ name:"카마도 네즈코", main:"침묵의 수호자", sub:"[헌신적 서포터]",
    image:"https://i.namu.wiki/i/ljupIWGFjseSV10tlg1NstpX5zt8vTiCkL4sfODxxDGvWzEEQnk4bBA5KoO7sQ0pJOl_yfsoSKTkPuNLy8hcj-6zGqXiDscizgkYpa1eH4mKGS3v4aUlkv7koWA9NiC_nmvQ_cktpwtT1Ls9g-C4FA.webp",
    desc:`달빛 아래 피어난 꽃처럼, 당신의 성향은 모순 속에서도 흔들리지 않는 따스함으로 빛납니다. 인간으로서의 삶을 빼앗기고 혈귀가 되었지만, 끝내 사람을 해치지 않고 오히려 동료들을 지키는 길을 선택했지요. 그 모습은 단순한 본능을 거슬러 선 것이 아니라, 사랑하는 이를 향한 강한 의지와, 인간성을 지켜내려는 깊은 본심에서 비롯됩니다.

당신이 추구하는 것은 단순한 생존이 아닙니다. “사랑하는 이들과 함께 살아가는 평범한 삶”입니다. 오니라는 굴레 속에서도, 당신은 가족을 향한 애정과 따뜻한 유대를 버리지 않았습니다. 때로는 본능이 흔들리더라도, 당신은 끝내 그 본능을 억누르고, 인간으로서의 마음을 선택하지요. 그래서 당신의 존재는 단순한 혈귀가 아니라, 희망과 가능성의 상징으로 빛납니다.

아이러니하게도, 당신의 힘은 잔혹한 오니의 힘에서 비롯되지만, 그것을 사용하는 방식은 지극히 인간적이고 따뜻합니다. 강력한 재생 능력과 폭발적인 힘은 단순한 파괴를 위한 것이 아니라, 동료를 지키고 사랑하는 이를 보호하기 위해 쓰이지요. 이 모순은 오히려 당신의 성향을 더욱 특별하게 만듭니다.

결국 당신의 성향은 어둠 속에서도 사랑을 잃지 않고, 끝내 희망을 선택하는 영혼입니다. 네즈코처럼, 당신은 상처와 굴레를 안고도 끝내 사람답게 살아가려는 길을 걷는 존재이며, 그 모습은 주변 사람들에게 살아갈 용기와 희망을 전해줍니다.` },

  kokushibo:{ name:"코쿠시보", main:"완전함을 좇는 구도자", sub:"[엘리트 타입]",
    image:"https://i.namu.wiki/i/1L5DmaN58jvhrKOSMM0aR_RsXgYrS7Yenl2w_MT6R-SzKp-vw8PjSy0kJbSxgAJEdklcH5Db8t8g0_peDpxHnR-U0YEymEP1bxUOWDadsoT3IFBNiR-GCB0Oj3orQO_RtIfcfopOZrD3qhaoJ-EeYg.webp",
    desc:`달그림자처럼, 당신의 성향은 끝없이 완전함을 추구하는 갈망 속에서 빛납니다. 누구보다도 강했고, 누구보다도 많은 것을 가졌음에도, 당신의 눈은 언제나 자신이 닿지 못한 곳을 바라봅니다. 세상 누구와도 비교할 수 없는 재능과 집념을 지니고 있으면서도, 동시에 결코 만족하지 못하는 끝없는 허기를 안고 살아가는 것이지요. 

당신은 힘을 향한 집착 속에서 자신조차 깎아내며, 언제나 더 높은 경지, 더 완전한 형태를 추구합니다. 그 과정에서 타인의 감정이나 관계는 종종 희미해지고, 오직 완벽에 도달하려는 목표만이 남습니다. 그러나 그 갈망의 뿌리에는 단순한 야망이 아니라, 한때 지녔던 순수한 이상과 형제와의 경쟁에서 비롯된 상처가 깊이 깔려 있습니다. 그래서 당신의 추구는 잔인함과 동시에 슬픔을 품고 있지요. 

달의 호흡에 베인 자는 단순히 상처를 입는 것이 아닙니다. 마치 하늘과 땅을 동시에 갈라내는 거대한 초승달의 궤적에 삼켜지듯, 끝없는 심연 앞에 선 듯한 압박을 느낍니다. 눈앞에서 쏟아지는 달빛의 칼날은 피할 수 없는 숙명처럼 다가오며, 그 순간 상대는 자신이 아무리 발버둥쳐도 닿을 수 없는 ‘완전함의 벽’을 절망적으로 깨닫게 되지요. 

결국 당신의 성향은 단순한 강함을 넘어, 완전한 자신을 향해 끊임없이 추구하고 집착하는 영혼입니다. 그 갈망은 때로는 주변을 베어내고 자신을 갉아먹지만, 동시에 끝없는 성장과 정진의 증거이기도 합니다. 코쿠시보처럼, 당신은 완벽을 향한 갈망 속에서 살아가며, 그 길에서 빛과 그림자를 함께 짊어진 존재입니다.` },

  akaza:{ name:"아카자", main:"강함에 집착한 도전자", sub:"[파이터 타입]",
    image:"https://i.namu.wiki/i/HjCMR-PnIMJs7CHtyEooCWhPgc2lViPytv-lMleF80MRr3qZcNNoW5xbHNexwmUFfsN5vm5NOm8lYKlaq1JZSpGDqeYewtyCafp3mZJ8hQbR9RhsL6UXBf-6yJUDEKXyu6j80UHYGfkt8f3274A9gQ.webp",
    desc:`달의 어둠처럼, 당신의 성향은 깊은 상처와 잃어버린 사랑으로 물든 그림자입니다. 한때는 가장 소중한 이를 지키고자 했던 순수한 마음을 지녔지만, 세상의 가혹한 시련은 당신을 벼랑 끝으로 몰아넣었지요. 누구보다 따뜻하고 뜨거웠던 마음은, 아이러니하게도 가장 잔혹한 운명에 휘말려 차갑게 굳어버렸습니다. 

당신이 드러내는 힘은 때로는 거칠고 파괴적으로 보이지만, 그 뿌리는 결코 증오에서 비롯된 것이 아닙니다. 살아남기 위해, 지키기 위해, 무너져가는 삶 속에서도 끝내 발버둥 치며 얻어낸 힘이지요. 그래서인지 당신의 눈빛은 언제나 모순을 품고 있습니다. 강자에게는 경외와 갈망을 보내고, 약자에게는 차갑게 돌아서기도 하지만, 그 심연에는 여전히 가장 순수했던 시절의 울음과 진심이 고스란히 남아 있습니다. 

당신과 마주하는 사람은 단순히 외적인 힘만이 아니라, 존재 자체가 흔들리는 듯한 압도감을 느낍니다. 그러나 그 압도감은 두려움에서 끝나지 않습니다. 오히려 자신이 어디까지 갈 수 있는지, 어떤 한계를 넘어야 하는지를 깨닫게 하며, 결국에는 더 강해져야 한다는 자극이 되지요. 아이러니하게도, 당신은 상처와 시련 속에서도 타인에게 도전과 성장을 불러일으키는 존재입니다. 

결국 당신의 성향은 단순히 어둠에 잠긴 것이 아닙니다. 누구보다 인간적이었기에, 때로는 인간을 버려야만 살아남을 수 있었던 비극을 품은 사람이지요. 그러나 마지막 순간에도 잃어버린 본모습을 되찾듯, 당신의 내면은 끝내 진실과 따뜻함을 향하고 있습니다. 그래서 당신은 가장 어둡고 아픈 그림자 속에서도, 인간다움이 무엇인지 역설적으로 보여주는, 깊고도 복합적인 존재라 할 수 있습니다.` },

  doma:{ name:"도우마", main:"감정을 비웃는 얼음미소", sub:"[매혹적 관찰자]",
    image:"https://i.namu.wiki/i/KJkyZSZt3q04I3Id1_0loqDrklJ94Zx6hO0CGF7vuU9dymvMoQ5lBAXZP3cNzbVSnBzlcciQNnFKKpDEseF0WT1WjlVuqWdpEl-t9HKY-IUoayJAKkJ8rJkWFmeirt1fMOM-sxlloNkyOtKv2IGEpQ.webp",
    desc:`얼음처럼, 당신의 성향은 차갑게 얼어붙은 평온 속에 깃들어 있습니다. 언제나 웃고 있지만 그 미소 뒤에는 아무런 온기도 남아 있지 않지요. 타인의 고통을 보아도 마음이 흔들리지 않고, 타인의 기쁨을 보아도 함께 느끼지 못하는, 그런 공허가 당신의 본질을 이루고 있습니다. 

당신이 추구하는 것은 강렬한 열정이나 뜨거운 정의가 아닙니다. 오히려 세상의 모든 감정과 혼란으로부터 벗어난, 절대적인 고요와 평온입니다. 그 미소는 친절처럼 보이지만, 사실은 감정의 결핍을 덮어둔 가면일 뿐입니다. 그래서 사람들은 당신 곁에서 처음엔 편안함을 느끼지만, 이내 알게 되지요. 그 차가운 공허 속에서는 결코 진심 어린 온기를 만날 수 없다는 것을. 

당신의 차가움은 파괴만을 남기지 않습니다. 오히려 마주한 이들로 하여금 살아있다는 것, 감정을 느낀다는 것이 무엇인지 절실히 깨닫게 만듭니다. 아이러니하게도, 당신은 감정을 버렸기에, 타인으로 하여금 감정의 소중함을 역설적으로 일깨우는 존재가 되었습니다. 

결국 당신의 성향은 허무 속에서 흔들림 없는 평온을 추구하는 영혼입니다. 누구보다 밝은 미소를 짓고 있지만, 그 안에는 누구보다 깊은 차가움이 숨어 있습니다. 도우마처럼, 당신은 따뜻한 불꽃을 거부한 채 차가운 얼음 속에서 자신만의 완벽한 고요를 찾아 헤매는 사람입니다.` },

  gyokko:{ name:"교코", main:"뒤틀린 조형의 미학자", sub:"[나르시시스트]",
    image:"https://i.namu.wiki/i/xIJzdKk1z77d6W1Le4o4_RZv0aexqV_cWYFCwydpUvTJPRjQVcXpL_7EPIiP_Qeacnmq6xp6Q91H3BK1vmfQvgGwPYz2i_um3xXNYIEiLnVYwXdWJ6uHJwu0UlY3XDTjrCdQI0eEg2T9WhC-x_tMGg.webp",
    desc:`항아리처럼, 당신의 성향은 끝없는 창조와 변주 속에 존재합니다. 세상을 있는 그대로 두기보다는, 당신만의 시선으로 새롭게 해석하고 특별한 색채를 불어넣는 힘이 있지요. 다른 이들이 평범하게 바라보는 것들도, 당신은 독창적으로 바라보고 자신만의 방식으로 다듬어내며 새로운 의미를 만들어냅니다.

당신이 추구하는 것은 단순한 모방이 아닌, 독자적인 창조입니다. 그것은 늘 신선하고 낯선 방식으로 세상을 재해석하며, 때로는 기존의 틀을 넘어서는 상상력으로 완성됩니다. 그래서 당신의 세계는 늘 개성적이고, 다른 사람들이 쉽게 닿지 못하는 독창성의 영역에 머물러 있습니다.

아이러니하게도, 당신의 성향은 아름다움을 향하지만, 그 아름다움은 남들이 보는 것과는 다른 결을 가집니다. 일반적인 기준을 따르기보다는, 당신만의 시선과 감각으로 빚어낸 특별한 형태 속에서 진정한 만족을 느낍니다. 그 결과는 때로는 낯설지만, 동시에 누구도 대신할 수 없는 당신만의 작품이지요.

결국 당신의 성향은 세상을 독창적으로 해석하고, 남들과 다른 시선에서 새로운 가치를 발견하는 영혼입니다. 그것은 결핍이 아니라 차별성이며, 누구도 흉내 낼 수 없는 당신만의 창조성의 원천입니다. 굣코처럼, 당신은 평범함을 넘어서는 독특한 시선 속에서 아름다움을 찾고, 자신만의 세계를 완성하는 사람입니다.` },

  hantengu:{ name:"한텐구", main:"다면의 그림자", sub:"[피해자 타입]",
    image:"https://i.namu.wiki/i/EO09L9k1_oLwzDsEi2FP6POB3DRCbtolMCHKUrRbos69zotbe9JufB_K35eT-Bku2HQHmGH116n_zUmSd5h3Ybt3mJWBKU-K656GOicHyhLRziNwJ0Qw72zQ2cc7U0xHc4vuaPkzG8AIbtbrIpqAQw.webp",
    desc:`나뭇가지에 드리운 그림자처럼, 당신의 성향은 여러 겹의 얼굴과 감정을 품고 있습니다. 겉으로는 연약하고 두려움 많은 모습이지만, 그 안에는 분노와 탐욕, 기쁨과 슬픔이 서로 얽혀 하나의 존재를 이룹니다. 세상 앞에서 한 가지 모습만을 보여주는 대신, 상황에 따라 변주되는 다채로운 면모가 당신의 본질이지요.

당신이 추구하는 것은 단순한 생존을 넘어, 자신을 보호하고 정당화할 수 있는 안식입니다. 그 과정에서 불안과 두려움이 새로운 힘으로 분리되어 나오고, 때로는 격렬한 분노나 방탕한 해방감으로 나타나기도 하지요. 이는 모순처럼 보이지만, 사실은 당신이 삶 속에서 끊임없이 균형을 찾으려는 또 다른 방식입니다.

아이러니하게도, 당신의 성향은 한 가지로 정의될 수 없습니다. 사람들은 당신의 다면적인 모습에 혼란을 느끼지만, 그만큼 당신은 누구보다 복합적이고 입체적인 존재입니다. 약함 속에서 강함이 나오고, 두려움 속에서 새로운 활력이 솟아나는 것처럼, 당신은 늘 다양한 모습 속에서 자신을 재구성합니다.

결국 당신의 성향은 하나의 얼굴에 머물지 않고, 여러 갈래의 모습을 통해 자신을 지켜내는 영혼입니다. 그것은 흔들림처럼 보이지만, 동시에 강력한 생존 본능이자 변화를 받아들이는 힘입니다. 한텐구처럼, 당신은 단순히 하나의 모습으로 살아가지 않고, 다양한 자신을 품으며 끝내 자신만의 길을 만들어가는 존재입니다.` },

  gyutaro:{ name:"규타로 & 다키", main:"어둠과 허영의 이중주", sub:"[현실주의자]",
    image:"https://i.namu.wiki/i/yfN0oqKRLO4vQ2cAVwNkurSFMxXl107eMGNgp8sA0nOlwoNv0yCkctjlUVSps3iufOtm0q8IetV2tghH0au7XFr86YRyuWjGIZmD5o7TyA-tq_FU4mnfIWT5e1zcT8GIJnDVDKzqT-vzAWrt6WKS5w.webp",
    desc:`어둠 속에서 피어난 그림자처럼, 당신의 성향은 두 가지 얼굴을 함께 품고 있습니다. 하나는 규타로처럼 거칠고 음울하며, 세상에 대한 분노와 열등감을 불태우는 얼굴입니다. 또 하나는 다키처럼 화려하고 빛나며, 인정과 찬미를 갈망하는 얼굴이지요. 서로 상반된 듯 보이지만, 결국 이 두 얼굴은 하나로 이어져, 당신이 세상 속에서 살아가는 방식이 됩니다.

당신이 추구하는 것은 단순한 힘이나 미모가 아닙니다. “사라지지 않는 존재감”입니다. 규타로는 무시받고 버려지지 않기 위해 강함을 갈망했고, 다키는 주목받고 인정받기 위해 아름다움을 추구했습니다. 당신 역시 삶 속에서 자신만의 방식으로 빛나고자 하며, 누군가에게 반드시 기억되고 싶은 마음을 깊이 간직하고 있습니다.

아이러니하게도, 당신의 성향은 늘 결핍에서 시작됩니다. 사랑받지 못할까, 버려지지 않을까 하는 두려움이 당신을 끊임없이 앞으로 밀어내고, 그 끝에서 특별함을 만들어내지요. 그래서 당신은 어둠 속에서도 꺼지지 않는 집착과 열망을 품고 있으며, 그것이야말로 당신의 생존 방식이자 원동력입니다.

결국 당신의 성향은 결핍을 통해 더욱 강렬한 존재감을 추구하는 영혼입니다. 규타로처럼 고통을 원동력으로 삼고, 다키처럼 찬란함으로 세상에 각인되려 하지요. 두 모습이 서로를 지탱하듯, 당신은 상반된 에너지들을 품어내며 자신만의 길을 만들어갑니다. 상현6 규타로와 다키처럼, 당신은 모순을 안고 있으면서도 그 모순 자체로 하나의 강렬한 존재가 되는 사람입니다.` },

  ubuyashiki:{ name:"우부야시키 카가야", main:"모든 것을 포용하는 통찰가", sub:"[성인 타입]",
    image:"https://i.namu.wiki/i/XDGCRQloqu_r7vfiiK85QTrEIw_JbzOUtaiN5XziI5DEM3JGpwyLU9OHz16wI5raV8EttmGmXRqQzK8vQcLmXLNgaIQ2IlI6rSBVzEEg8dc8FP5jb1LE_B6xdjPAwEn084O-8vsyzMdgpI6uMKUvgw.webp",
    desc:`달빛 같은 당신의 성향은 부드럽고 온화하지만, 그 안에는 누구보다 깊은 결심과 인내가 숨어 있습니다. 병약한 몸 때문에 스스로 칼을 휘두를 수는 없지만, 오히려 그 약함이 당신을 더욱 강하게 만들었지요. 힘으로 앞서기보다, 사람들의 마음을 모으고 이끌어가는 지혜와 따뜻함이 당신의 무기입니다.

당신이 추구하는 것은 단순한 승리가 아니라, 희망이 이어지는 세상입니다. 눈앞의 전투가 아니라, 그 전투가 끝난 뒤 사람들의 삶이 어떻게 달라질지를 바라보며, 모두가 인간답게 살아가는 미래를 꿈꾸지요. 그래서 당신의 말은 부드럽지만 단호하고, 누구든 마음을 움직이는 힘을 지녔습니다.

결국 당신의 성향은 자신을 불태우는 희생이 아니라, 모두를 하나로 모으는 등불입니다. 겉으로는 나약해 보여도, 그 존재는 곁에 있는 이들을 강하게 만들고, 끝내는 절망조차 희망으로 바꾸어내는 힘이 됩니다.` },

  muzan:{ name:"키부츠지 무잔", main:"모든 것을 지배하는 정복자", sub:"[군주 타입]",
    image:"https://i.namu.wiki/i/Wo9UiCNf2RLI-YpjyR5RDGnge_fZfS-i_C2sO45kWJQ7FJSzEivsrbDoiGjft3GkTNA3ikcIEgXifBZgBUc9TfdPTADfPsEFhqoatMPOgCvFDBwg0_bSPu8c9nbpxDQu1ULJOSNX87R_aWRwRr1lZA.webp",
    desc:`끝없는 밤처럼, 당신의 성향은 완전함과 영원을 추구하는 집착 속에 존재합니다. 인간으로 태어났으나 병약한 몸에 갇혀 죽음을 두려워하던 그는, 누구보다 강렬하게 생존을 갈망했지요. 그 두려움은 곧 무한한 권력과 불멸의 육체를 추구하는 집념으로 바뀌었고, 마침내 그는 세상의 모든 어둠을 삼켜버리는 존재가 되었습니다.

당신이 추구하는 것은 단순한 힘이 아닙니다. “죽음을 넘어서는 절대적인 완전함”입니다. 누구에게도 굴하지 않고, 어떤 운명에도 지배당하지 않으며, 끝내 혼자서도 세상을 지배할 수 있는 절대적 존재가 되고자 합니다. 그 길은 고독했고, 타인의 온기와는 멀어졌지만, 당신은 끝내 그 고독마저도 감수하며 자신의 길을 걸어갑니다.

아이러니하게도, 당신의 성향은 두려움에서 비롯되었지만, 그 두려움은 곧 누구도 도달할 수 없는 강렬한 집념으로 변했습니다. 타인은 당신의 차가움을 이해하지 못하지만, 그 차가움 속에는 끝내 살아남고자 하는, 가장 원초적이고 뜨거운 갈망이 숨어 있습니다.

결국 당신의 성향은 죽음을 넘어 완전함을 추구하는 영혼입니다. 그것은 고독하고 냉혹한 길이지만, 동시에 흔들림 없는 의지의 증거이기도 합니다. 키부츠지 무잔처럼, 당신은 어둠 속에서도 끊임없이 자신을 단련하고, 끝내는 완전한 존재를 향해 나아가는 사람입니다.` },

  zenitsu:{ name:"아가츠마 젠이츠", main:"겁 많지만 벼락 같은 결단", sub:"[리액터 타입]",
    image:"https://i.namu.wiki/i/-L9hjGLA9LxsdJCuSUycLYX_vG39VqF5taJrofYruH51lEtX16l_WKutPN26s8SRWGpp-e8mUMJNwyZR_GKgkB7Pal1CyoUb8ebPX96aDeY0wGAtt01FjQhqRryr-vJsojXutXCK3w4-er8sPWz5_A.webp",
    desc:`번개처럼, 당신의 성향은 두려움과 용기 사이에서 갈라지듯 흔들립니다. 겉으로는 겁이 많고 불안해 보이지만, 위기의 순간에 누구보다 강렬한 힘을 발휘하지요. 그 두려움은 단순한 약함이 아니라, 자신과 소중한 이를 지키고자 하는 마음에서 비롯된 본능적인 경계심입니다.

당신이 추구하는 것은 단순한 강함이 아닙니다. **“사랑하는 이를 지키고, 끝내 스스로 당당히 서는 것”**입니다. 무너질 듯 흔들리면서도, 그 한계를 넘어설 때 진짜 번개처럼 강렬한 빛을 내며, 어둠을 가르고 나아갑니다. 그래서 당신의 성향은 모순처럼 보이지만, 사실은 가장 인간적인 용기의 증거입니다.

결국 당신의 성향은 두려움 속에서도 끝내 자신을 믿고, 중요한 순간에는 누구보다 빠르고 강렬하게 빛나는 영혼입니다. 당신의 흔들림은 약함이 아니라, 언제나 번개처럼 치고 올라갈 힘을 모으는 과정입니다.` }
};

// ============== 궁합 데이터(텍스트만 저장) ==============
const compatibilityData = {
  rengoku:{ love:"운명의 상대: 칸로지 미츠리. 뜨거운 열정 x 따스한 사랑의 최고 시너지.",
            friend:"최고의 동료: 우즈이 텐겐. 열정과 화려함이 전장을 압도.",
            warning:"피해야 할 상성: 코쿠시보. 헌신적 열정을 이해하지 못함." },
  uzui:{ love:"운명의 상대: (설정상 아내 3인). 당신의 개성을 존중하고 함께 축제를 즐길 파트너.",
         friend:"최고의 동료: 렌고쿠. 화려함+열정의 폭발적 팀업.",
         warning:"피해야 할 상성: 코쿠시보. '멋'을 불필요로 여김." },
  mitsuri:{ love:"운명의 상대: 이구로 오바나이. 따스함이 그의 상처를 치유.",
            friend:"최고의 동료: 렌고쿠. 팀 사기 담당 듀오.",
            warning:"피해야 할 상성: 무잔. 사랑/연대를 이해 못함." },
  tanjiro:{ love:"운명의 상대: 미츠리, 네즈코. 서로에게 가장 큰 위안.",
            friend:"최고의 동료: 렌고쿠, 기유. 올바른 길로 이끌어 주는 멘토/동료.",
            warning:"피해야 할 상성: 무잔. 신념의 정반대." },
  giyu:{ love:"운명의 상대: 시노부. 가시 돋친 말 뒤의 진심을 알아봄.",
         friend:"최고의 동료: 탄지로. 닫힌 마음을 열어주는 끈기.",
         warning:"피해야 할 상성: 사네미. 표현 차이로 오해 누적." },
  nezuko:{ love:"운명의 상대: 젠이츠. 맹목적으로 지켜주는 따뜻한 짝.",
           friend:"최고의 동료: 탄지로. 무엇과도 바꿀 수 없는 유대.",
           warning:"피해야 할 상성: 도우마. 순수를 장난감으로 여김." },
  shinobu:{ love:"운명의 상대: 기유. 당신의 슬픔을 이해하는 사람.",
            friend:"최고의 동료: 교메이. 전략+자비의 안정감.",
            warning:"피해야 할 상성: 도우마. 가면 너머를 꿰뚫어 스트레스." },
  sanemi:{ love:"운명의 상대: (카나에). 거친 마음을 보듬어 준 사람.",
           friend:"최고의 동료: 교메이. 폭풍을 잠재우는 어른.",
           warning:"피해야 할 상성: 기유. 진심을 알기 전까지 최악의 상성." },
  iguro:{ love:"운명의 상대: 미츠리. 집착이 사랑으로 변하는 순간.",
          friend:"최고의 동료: 무이치로. 꼼꼼함 x 천재성 보완.",
          warning:"피해야 할 상성: 텐겐. 화려함 vs 본질주의 충돌." },
  muichiro:{ friend:"최고의 동료: 탄지로. 잃어버린 감정을 잇는 다리.",
             warning:"피해야 할 상성: 아카자. 무한 단련 강요는 피곤.",
             strong_against:"강한 상성: 교코. 무관심이 최고의 카운터." },
  himejima:{ friend:"최고의 동료: 모든 귀살대원. 자비로 모두를 품음.",
             warning:"피해야 할 상성: 무잔. 생명을 경시하는 존재." },
  akaza:{ love:"운명의 상대: 코유키. 인간성의 상징.",
          strong_against:"강한 상성: 렌고쿠. 서로 인정하는 라이벌.",
          weak_against:"약한 상성: 탄지로. 잃어버린 인간성을 흔듦." },
  kokushibo:{ friend:"최고의 동료: 아카자. 강함을 존중.",
              strong_against:"강한 상성: 교메이. 경지의 승부욕.",
              weak_against:"약한 상성: 요리이치. 영원한 콤플렉스." },
  doma:{ friend:"최고의 동료: 코쿠시보. 얕은 감정을 간파해도 동료로 인정.",
         warning:"피해야 할 상성: 시노부, 이노스케. 독 같은 상성." },
  gyokko:{ friend:"최고의 동료: 한텐구. 변덕을 묵묵히 수용.",
           weak_against:"약한 상성: 무이치로. 무관심이 치명타." },
  hantengu:{ friend:"최고의 동료: 교코. 어떤 분열도 신경 쓰지 않음.",
             warning:"피해야 할 상성: 탄지로. 위선을 꿰뚫는 눈." },
  gyutaro:{ love:"운명의 상대: 다키. 서로의 존재 이유.",
            warning:"피해야 할 상성: 텐겐. 열등감을 자극." },
  ubuyashiki:{ friend:"최고의 동료: 모든 귀살대원. 구심점.",
               warning:"피해야 할 상성: 무잔. 숙적." },
  muzan:{ weak_against:"약한 상성: 요리이치. 영원한 공포.",
          warning:"피해야 할 상성: 우부야시키. 불멸을 위협." },
  zenitsu:{ love:"운명의 상대: 네즈코(개그이자 진심). 불꽃+벼락 케미.",
            friend:"최고의 동료: 이노스케/탄지로. 용기를 켜주는 스위치.",
            warning:"피해야 할 상성: 도우마. 감정 결핍과 극불화." },
  default:{ friend:"최고의 동료: 탄지로.", warning:"피해야 할 상성: 무잔." }
};

// ============== 프로필 좌표(20인) ==============
const profiles = {
  rengoku:{D1:8, D2:6,  D3:5,  D4:8,  D5:7},
  mitsuri:{D1:7, D2:10, D3:-4, D4:9,  D5:2},
  himejima:{D1:10,D2:8,  D3:8,  D4:2,  D5:-6},
  tanjiro:{D1:9, D2:9,  D3:2,  D4:10, D5:0},
  sanemi:{D1:4, D2:-8, D3:6,  D4:-6, D5:8},
  shinobu:{D1:2, D2:-9, D3:9,  D4:-5, D5:4},
  giyu:{D1:3, D2:-7, D3:7,  D4:-8, D5:-3},
  uzui:{D1:1, D2:5,  D3:-8, D4:6,  D5:6},
  muichiro:{D1:-5,D2:-5, D3:-2, D4:-4, D5:3},
  iguro:{D1:2, D2:-8, D3:10, D4:-7, D5:1},
  nezuko:{D1:8, D2:7,  D3:-6, D4:5,  D5:-7},
  kokushibo:{D1:-8,D2:-6, D3:9,  D4:-9, D5:9},
  akaza:{D1:-6,D2:-4, D3:6,  D4:-3, D5:10},
  doma:{D1:-10,D2:4, D3:-7, D4:3,  D5:-5},
  gyokko:{D1:-9,D2:1,  D3:-10,D4:0,  D5:-2},
  hantengu:{D1:-4,D2:-10,D3:-5, D4:-10,D5:-10},
  gyutaro:{D1:-7,D2:-7, D3:3,  D4:-8, D5:5},
  ubuyashiki:{D1:10,D2:10,D3:4,  D4:7,  D5:-8},
  muzan:{D1:-10,D2:-10,D3:8, D4:-10,D5:9},
  zenitsu:{D1:4, D2:6,  D3:-3, D4:6,  D5:3}
};

// ============== 흐름 함수 ==============
function startQuiz(){
  switchScreen('quiz');
  currentQuestionIndex = 0;
  scores = {D1:0,D2:0,D3:0,D4:0,D5:0};
  showQuestion();
}

function switchScreen(which){
  startScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultScreen.classList.remove('active');
  chartScreen.classList.remove('active');
  if(which==='start') startScreen.classList.add('active');
  if(which==='quiz')  quizScreen.classList.add('active');
  if(which==='result')resultScreen.classList.add('active');
  if(which==='chart') chartScreen.classList.add('active');
}

function showQuestion(){
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.q;
  answerButtons.innerHTML = '';
  q.a.forEach(ans=>{
    const btn = document.createElement('button');
    btn.className='answer-btn';
    btn.textContent = ans.t;
    btn.onclick = ()=>selectAnswer(ans.v);
    answerButtons.appendChild(btn);
  });
  progressBar.style.width = `${((currentQuestionIndex+1)/questions.length)*100}%`;
}

function selectAnswer(delta){
  for(const k in delta){ scores[k]+=delta[k]; }
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length) showQuestion();
  else calculateResult();
}

// 표준화 + 혼합 유사도(코사인 60% + 거리 40%)
// 답안 패턴을 기반으로 "결정성 있는 난수"를 만들어주는 함수
function seededRandomFromScores(){ 
  let h = 0x811c9dc5;
  ['D1','D2','D3','D4','D5'].forEach(d=>{
    let x = Math.round((scores[d]+200)*7);
    h ^= x; h = Math.imul(h, 0x01000193);
  });
  return (h>>>0)/4294967296;
}

// 사용자의 점수를 차원별로 정규화된 벡터로 바꿔주는 함수
function calcScoreVec(){
  return ['D1','D2','D3','D4','D5'].map(d => (scores[d] / DIM_RANGE[d]) * SENSITIVITY);
}

  // [calculateResult 위쪽 아무데나] — 헬퍼
function seededRandomFromScores(){ // 답안 패턴 기반 결정성 난수
  let h = 0x811c9dc5; // FNV-1a
  ['D1','D2','D3','D4','D5'].forEach(d=>{
    let x = Math.round((scores[d]+200)*7);
    h ^= x; h = Math.imul(h, 0x01000193);
  });
  return (h>>>0)/4294967296;
}
function calcScoreVec(){
  // dims/SENSITIVITY/DIM_RANGE는 ①에서 이미 선언된 상태여야 함
  return ['D1','D2','D3','D4','D5'].map(d => (scores[d] / DIM_RANGE[d]) * SENSITIVITY);
}

// [기존 calculateResult() 전체 교체]
function calculateResult() {
  // ─ profiles는 기존에 쓰던 그대로 두셔도 됩니다.
  const profiles = {
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
    muzan:     { D1: -10,D2: -10,D3: 8,  D4: -10,D5: 9  },
    zenitsu:   { D1: 1,  D2: 8,  D3: -3, D4: 6,  D5: -1 } // 젠이츠(추가했다면)
  };

  const S = calcScoreVec();
  const sL2 = Math.hypot(...S) || 1;

  const ranked = Object.keys(profiles).map(key=>{
    const p = ['D1','D2','D3','D4','D5'].map(d => profiles[key][d]/10); // [-1,1]
    const pL2 = Math.hypot(...p) || 1;

    const cos = (S.reduce((a,v,i)=>a+v*p[i],0))/(sL2*pL2);
    const L1n = S.reduce((a,v,i)=>a+Math.abs(v-p[i]),0) / 10;
    const L2n = Math.hypot(...S.map((v,i)=>v-p[i])) / Math.sqrt(20);

    const score = 0.5*cos + 0.5*(1 - (0.6*L1n + 0.4*L2n));
    return {key, score};
  }).sort((a,b)=>b.score-a.score);

  let pick = ranked[0].key;
  const EPS = 0.03; // 상위 접전 시 민감도
  if (ranked.length>1 && (ranked[0].score - ranked[1].score) < EPS) {
    pick = (seededRandomFromScores() < 0.5) ? ranked[0].key : ranked[1].key;
  }
  if (!results[pick]) { // 결과 텍스트 없는 경우 대비
    const alt = ranked.find(r => results[r.key]);
    pick = alt ? alt.key : 'tanjiro';
  }
  showResult(pick);
}


  // 막대
 const maxScore = 35; 
const minScore = -35; 
dimFills[0].style.width = `${Math.max(0, Math.min(100, ((scores.D1 - minScore) / (maxScore - minScore)) * 100))}%`;
dimFills[1].style.width = `${Math.max(0, Math.min(100, ((scores.D2 - minScore) / (maxScore - minScore)) * 100))}%`;
dimFills[2].style.width = `${Math.max(0, Math.min(100, ((scores.D3 - minScore) / (maxScore - minScore)) * 100))}%`;
dimFills[3].style.width = `${Math.max(0, Math.min(100, ((scores.D4 - minScore) / (maxScore - minScore)) * 100))}%`;
dimFills[4].style.width = `${Math.max(0, Math.min(100, ((scores.D5 - minScore) / (maxScore - minScore)) * 100))}%`;


  // 멘토링 점수(간단 유지)
  const mentoringScores = {
    rengoku:19, mitsuri:17, himejima:18, tanjiro:14, sanemi:15, shinobu:16,
    giyu:12, uzui:16, muichiro:11, iguro:15, nezuko:9, kokushibo:3, akaza:4,
    doma:1, gyokko:2, hantengu:1, gyutaro:2, ubuyashiki:20, muzan:0, zenitsu:13
  };
  const m = mentoringScores[key] ?? 10;
  let msg = `후배사랑 멘토링 적합도: ${m}/20`;
  if(m>=16) msg += `\n당신은 모두에게 귀감이 되는 최고의 멘토입니다!`;
  else if(m>=11) msg += `\n충분한 자질을 갖춘 멘토입니다. 따뜻함이 큰 힘이 돼요.`;
  else if(m>=6) msg += `\n잠재력이 있어요. 당신만의 방식으로 이끌 수 있습니다.`;
  else msg += `\n개인 플레이에서 더 빛날 수 있어요!`;
  mentoringRecommendation.textContent = msg;
}

function showChart(){
  switchScreen('chart');
  chartOwnerName.textContent = results[lastResultKey].name;
  const c = compatibilityData[lastResultKey] || compatibilityData.default;
  let html = '';
  if(c.love) html += `<h4>❤️ 연애 궁합</h4><p>${c.love}</p>`;
  if(c.friend) html += `<h4>🤝 친구/동료 궁합</h4><p>${c.friend}</p>`;
  if(c.warning) html += `<h4>⚠️ 주의할 상성</h4><p>${c.warning}</p>`;
  if(c.strong_against) html += `<h4>🔺 강한 상성</h4><p>${c.strong_against}</p>`;
  if(c.weak_against) html += `<h4>🔻 약한 상성</h4><p>${c.weak_against}</p>`;
  dynamicChartContent.innerHTML = html || '<p>준비된 궁합 정보가 없습니다.</p>';
}

function showResultView(){ switchScreen('result'); }
function restartQuiz(){ switchScreen('start'); }

</script>
</body>
</html>

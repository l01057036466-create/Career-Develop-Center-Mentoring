<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>귀살대 최종 선별 테스트 v6.0</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
    :root{
      --bg-dark:#1a1a2e;--bg-mid:#16213e;--primary:#e94560;--secondary:#0f3460;
      --text-light:#e0e0e0;--text-mid:#c0c0c0;--font-main:'Noto Sans KR',sans-serif;
    }
    *{box-sizing:border-box}
    body{font-family:var(--font-main);background:var(--bg-dark);color:var(--text-light);
      display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;text-align:center}
    .container{background:var(--bg-mid);border-radius:15px;padding:20px 30px;border:1px solid var(--primary);
      box-shadow:0 0 30px rgba(233,69,96,.3);width:90%;max-width:680px}
    h1,h2,h3{color:var(--primary)}
    #start-screen h1{font-size:2.2em;margin:0 0 10px}
    #start-screen p{font-size:1.1em;color:var(--text-mid);line-height:1.6}
    #intro-text{font-size:.95em;color:var(--text-mid);background:var(--bg-dark);padding:15px;border-radius:10px;margin-top:20px;text-align:justify}
    button{font-family:var(--font-main);background:var(--primary);color:#fff;border:none;padding:14px 26px;border-radius:25px;
      font-size:1.1em;cursor:pointer;transition:.2s;margin-top:16px;font-weight:bold}
    button:hover{transform:scale(1.04);filter:brightness(.95)}
    .secondary-btn{background:var(--secondary);margin-left:10px}
    .question-container,.result-container,.chart-container{display:none}
    #question-text{font-size:1.25em;margin-bottom:18px;font-weight:bold;line-height:1.6;min-height:88px}
    .answer-btn{display:block;width:100%;text-align:left;background:var(--secondary);margin:8px 0;padding:14px;border-radius:12px;font-size:.98em}
    .answer-btn:hover{transform:scale(1.02);background:#1f4f8b}
    #progress-bar-container{width:100%;background:var(--secondary);border-radius:6px;margin-top:18px;height:10px}
    #progress-bar{width:0%;height:100%;background:var(--primary);border-radius:6px;transition:width .25s}
    .result-container h2{font-size:1.4em}
    #result-image{width:190px;height:190px;border-radius:50%;object-fit:cover;border:4px solid var(--primary);margin:6px auto 10px}
    #result-main-trait{font-size:2.0em;font-weight:800;color:#fff;margin:6px 0}
    #result-sub-trait{font-size:1.1em;color:var(--text-mid);font-weight:700}
    #result-description{font-size:1.02em;text-align:justify;line-height:1.8;margin-top:18px;color:var(--text-light);white-space:pre-wrap}
    .chart-container{text-align:left;max-height:80vh;overflow-y:auto;padding-right:6px}
    .chart-container h3{text-align:center;font-size:1.6em}
    #dynamic-chart-content h4{color:#fff;border-left:4px solid var(--primary);padding-left:10px;margin-top:22px}
    #dynamic-chart-content p{margin:8px 0 0 14px;line-height:1.6}
    .button-group{display:flex;justify-content:center}
    .stats-container{margin-top:22px;padding-top:18px;border-top:1px solid var(--secondary)}
    .stat-item{display:flex;align-items:center;gap:10px;margin:10px 0}
    .stat-title{font-weight:800;font-size:.9em;min-width:40px}
    .stat-bar{height:14px;background:var(--secondary);flex:1;border-radius:999px;position:relative;overflow:hidden}
    .stat-fill{background:linear-gradient(90deg,#e94560,#ff7e5f);height:100%;border-radius:999px;width:50%}
    #mentoring-score-container{background:var(--bg-dark);padding:14px;border-radius:10px;margin-top:16px}
    #mentoring-recommendation{font-size:1.02em;font-weight:700;white-space:pre-wrap}
    .note{font-size:.85em;color:var(--text-mid);margin-top:6px}
  </style>
</head>
<body>
<div class="container">
  <div id="start-screen">
    <h1>⚔️ 귀살대 최종 선별 테스트 v6.0 ⚔️</h1>
    <p>단순한 심리테스트를 넘어, 당신의 내면 ‘호흡’을 5차원 성향으로 분석합니다.</p>
    <div id="intro-text">
      <p>질문에 대한 선택을 바탕으로 <b>개인↔대의 / 이성↔감성 / 자유↔규율 / 현실↔희망 / 수비↔공격</b> 5축의 점수를 쌓고,
      정규화한 뒤 캐릭터 프로필과 <b>코사인 유사도</b>로 매칭합니다. (결과 편향 최소화)</p>
      <p class="note">Tip: 답변 순서는 매번 섞여 선택 편향도 줄였습니다.</p>
    </div>
    <button onclick="startQuiz()">테스트 시작</button>
  </div>

  <div id="quiz-screen" class="question-container">
    <p id="question-text"></p>
    <div id="answer-buttons"></div>
    <div id="progress-bar-container"><div id="progress-bar"></div></div>
  </div>

  <div id="result-screen" class="result-container">
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
    <p class="note">※ 이미지가 로딩되지 않으면 출처 사이트의 핫링크 정책 때문일 수 있어요. 그럴 땐 이미지를 저장 후 로컬/직접 호스팅을 권장합니다.</p>
  </div>

  <div id="chart-screen" class="chart-container">
    <h3><span id="chart-owner-name"></span><span> 님의 궁합표</span></h3>
    <div id="dynamic-chart-content"></div>
    <div class="button-group">
      <button onclick="showResultView()">결과로 돌아가기</button>
    </div>
  </div>
</div>

<script>
/* ========= 유틸 / 모델 파라미터 ========= */
// 차원 키
const DIMS = ['D1','D2','D3','D4','D5'];
// 차원 가중치 (필요시 미세조정)
const DIM_WEIGHTS = { D1:1, D2:1, D3:1, D4:1, D5:1 };
// 유사도 계산 방식: 코사인(방향 일치) – 크기 편향 제거
const cosineSim = (a,b)=>{
  let dot=0,na=0,nb=0;
  for(const k of DIMS){ dot += a[k]*b[k]; na += a[k]*a[k]; nb += b[k]*b[k]; }
  return (na===0||nb===0) ? -1 : dot/(Math.sqrt(na)*Math.sqrt(nb));
};
// 벡터 정규화(가중치 포함)
const normalize = v=>{
  const out={}; let len=0;
  for(const k of DIMS){ const w=v[k]*DIM_WEIGHTS[k]; out[k]=w; len+=w*w; }
  len=Math.sqrt(len)||1; for(const k of DIMS){ out[k]=out[k]/len; } return out;
};
// 진행바 스케일을 질문셋으로부터 자동 계산
const dimCapacity = {D1:0,D2:0,D3:0,D4:0,D5:0};
/* ========= DOM 캐시 ========= */
const startScreen=document.getElementById('start-screen');
const quizScreen=document.getElementById('quiz-screen');
const resultScreen=document.getElementById('result-screen');
const chartScreen=document.getElementById('chart-screen');
const questionText=document.getElementById('question-text');
const answerButtons=document.getElementById('answer-buttons');
const progressBar=document.getElementById('progress-bar');
const resultImage=document.getElementById('result-image');
const resultMainTrait=document.getElementById('result-main-trait');
const resultSubTrait=document.getElementById('result-sub-trait');
const resultDescription=document.getElementById('result-description');
const chartOwnerName=document.getElementById('chart-owner-name');
const dynamicChartContent=document.getElementById('dynamic-chart-content');
const dimFills=[
  document.getElementById('dim1-fill'),document.getElementById('dim2-fill'),
  document.getElementById('dim3-fill'),document.getElementById('dim4-fill'),
  document.getElementById('dim5-fill')
];
const mentoringRecommendation=document.getElementById('mentoring-recommendation');

/* ========= 데이터: 질문 ========= */
// (기존 질문은 유지)
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

// 답변 편향 줄이기: 보기 셔플
const shuffle = arr => arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);

/* ========= 결과 리소스 ========= */
const results = {
  rengoku:{ name:"렌고쿠 쿄쥬로", main:"열정 넘치는 행동대장", sub:"[개척자 타입]",
    score:19, image:"https://i.namu.wiki/i/FYQRjmFAnpY0oJdphZb567Serv53K-mgArE7XtBimxmG4gZ7AjJylJFvhEAO9PSb2y3feViY--ltEDgqjIjZxhKCvumY0c68TxGji8rqDBxTSK_apTcCmhJ6_6orcLmmYKngVfTOi_2IGUPVlfOOJQ.webp",
    desc:"불꽃의 호흡처럼… (생략 없이 기존 상세 설명 사용 가능)" },
  uzui:{ name:"우즈이 텐겐", main:"화려한 해결사", sub:"[아티스트 타입]",
    score:16, image:"https://i.namu.wiki/i/CWXL0d8ayNZgQVoCTU6FXZPU3ILoSOml5G83Pq3VaZGnZ0ob2iGfM_i4ocva0evhWeR9ET9ONUbjkZlG8sLzXZF6ZwuZhCrq2aYeekXEe5KdrYQJuZxgru2o-bcPEx--hoVYuwR50SlEoHlcA2bCTw.webp",
    desc:"음의 울림처럼…" },
  mitsuri:{ name:"칸로지 미츠리", main:"사랑을 전파하는 치유자", sub:"[인플루언서 타입]",
    score:17, image:"https://i.namu.wiki/i/RTUUC3Dk9G1EupDqummngeccBmF4ywFkrPSmINv6u-4qUGyaI8EHTbnz0wFnbsHfefM2Xdc-ygPQsMgiZQDfo1rT2IsZPoDPSqACvXuDCgOD3UzUxeod2o6EB82IyV4lwYi2jogc_Yvpaecg31EcIw.webp",
    desc:"봄꽃처럼…" },
  tanjiro:{ name:"카마도 탄지로", main:"따뜻한 공감 능력자", sub:"[개척자 타입]",
    score:14, image:"https://i.namu.wiki/i/XDxdrDb5EfET9eod7H1StURXE21RMy-DRRAVrvnB14-qsZeKe7HEOhl9XQInz9FzAexvWEQr9T2ZduP6wU6O-y4khafcN1JUvM5_nyDIN_x8rl8kxdkaF_TDF6zwo9LzSxuPZmGDqAeYMSQ3YAe8yQ.webp",
    desc:"저녁놀처럼…" },
  himejima:{ name:"히메지마 교메이", main:"자비로운 철벽 수호자", sub:"[수호자 타입]",
    score:18, image:"https://i.namu.wiki/i/DizYLyHynCnn1H4-p5rhkZYNonbgMBB9P7_84GvzLSSB8sRR12GzhZypejR_4Xkpho2h5X3Gy7FKcmog7VJxzZ6vnvx_WswtUJkmN-e2laxm4TvuBCb-MatkmRPX4zYu2U-ZzvGMOV3DGJC9g6Ikzw.webp",
    desc:"바위처럼…" },
  sanemi:{ name:"시나즈가와 사네미", main:"상처 입은 야수", sub:"[츤데레 타입]",
    score:15, image:"https://i.namu.wiki/i/vtysQEoI0PR0z4Thi9do6zDaGXZFSeAl4beixXJ4hkIWROIFk-179VNJyuVQNSRXS99H5YD4TXE_zmI_owkY9OGyJvTwXhKIszxGTESlici-MhtdEY1sKOkSjXh24zjSIm0PscZXRaoS3cXj1kGa1Q.webp",
    desc:"거센 바람처럼…" },
  shinobu:{ name:"코쵸우 시노부", main:"얼음처럼 차가운 복수자", sub:"[전략가 타입]",
    score:16, image:"https://i.namu.wiki/i/UNnmEprZxx8jwmpEfEO6VG02crb1E_q2wpwezu4Cg2sC2LpAHxWQnRdVxqMwxgZkBAWdVZDIaD3pFt0FO2MGEpcLKtVuzOAIDXKpt8pOp3de3bx11r43X-XXMDI25xog9p8SQ5a23wPqSLF84BgEbw.webp",
    desc:"나비처럼…" },
  giyu:{ name:"토미오카 기유", main:"고요한 물의 검사", sub:"[독립적인 해결사 타입]",
    score:12, image:"https://i.namu.wiki/i/sdO-jb_R-nRT2IxknBUv2ob3r6pVGVuhaRYTe_bdFFNQuSSxbLmu8WWyl7EziDR5y49yFa9JP2z2Ak1QLvqKiouMWX_b9IBgeBwN-9wI_bamYg71FwG3GiWfHdMnQo0W2T2hSstE9I8oXsIpenNPqw.webp",
    desc:"고요한 강물처럼…" },
  muichiro:{ name:"토키토 무이치로", main:"고독한 안개의 천재", sub:"[마이웨이 타입]",
    score:11, image:"https://i.namu.wiki/i/pQT4ncOS09c7lVc1mq83EHdSuGG4H8XcFFfJS5VNxqYxVowS70-WGNSaX42jLK4GnNtP7cNFe5zI-1Kl8cuauaNwoQRyHaZOqKJYQZ4IhmJkkZkW3w2m1AUSjmo9bNZhHuyJvYKTrjWN6VZVZXZ-tA.webp",
    desc:"무심해 보이지만…" },
  iguro:{ name:"이구로 오바나이", main:"집요한 완벽주의자", sub:"[완벽주의자 타입]",
    score:15, image:"https://i.namu.wiki/i/-B_P1YtCgbxGof8tvQfphBbalj-EiuLhuUF-o5SnBFcaTh7cg61ZzuV4a4suZpkqYjnSknmTP_YnPOLCFECs95m7Swwb_MwZSes0OujJBkbnV_5Wa_0W7rGv9iuP0gjRGFT-wSDlntYvkDdCqoYWdw.webp",
    desc:"뱀처럼…" },
  nezuko:{ name:"카마도 네즈코", main:"침묵의 수호자", sub:"[헌신적인 서포터 타입]",
    score:9, image:"https://i.namu.wiki/i/ljupIWGFjseSV10tlg1NstpX5zt8vTiCkL4sfODxxDGvWzEEQnk4bBA5KoO7sQ0pJOl_yfsoSKTkPuNLy8hcj-6zGqXiDscizgkYpa1eH4mKGS3v4aUlkv7koWA9NiC_nmvQ_cktpwtT1Ls9g-C4FA.webp",
    desc:"달빛 아래 피어난 꽃처럼…" },
  kokushibo:{ name:"코쿠시보", main:"정점을 추구하는 구도자", sub:"[엘리트 타입]",
    score:3, image:"https://i.namu.wiki/i/1L5DmaN58jvhrKOSMM0aR_RsXgYrS7Yenl2w_MT6R-SzKp-vw8PjSy0kJbSxgAJEdklcH5Db8t8g0_peDpxHnR-U0YEymEP1bxUOWDadsoT3IFBNiR-GCB0Oj3orQO_RtIfcfopOZrD3qhaoJ-EeYg.webp",
    desc:"달그림자처럼…" },
  akaza:{ name:"아카자", main:"무한 단련의 파이터", sub:"[파이터 타입]",
    score:4, image:"https://i.namu.wiki/i/HjCMR-PnIMJs7CHtyEooCWhPgc2lViPytv-lMleF80MRr3qZcNNoW5xbHNexwmUFfsN5vm5NOm8lYKlaq1JZSpGDqeYewtyCafp3mZJ8hQbR9RhsL6UXBf-6yJUDEKXyu6j80UHYGfkt8f3274A9gQ.webp",
    desc:"상처와 단련의 모순…" },
  doma:{ name:"도우마", main:"공허한 미소의 예술가", sub:"[매혹적 관찰자 타입]",
    score:1, image:"https://i.namu.wiki/i/KJkyZSZt3q04I3Id1_0loqDrklJ94Zx6hO0CGF7vuU9dymvMoQ5lBAXZP3cNzbVSnBzlcciQNnFKKpDEseF0WT1WjlVuqWdpEl-t9HKY-IUoayJAKkJ8rJkWFmeirt1fMOM-sxlloNkyOtKv2IGEpQ.webp",
    desc:"얼음처럼…" },
  gyokko:{ name:"교코", main:"기괴한 창조의 조각가", sub:"[나르시시스트 타입]",
    score:2, image:"https://i.namu.wiki/i/xIJzdKk1z77d6W1Le4o4_RZv0aexqV_cWYFCwydpUvTJPRjQVcXpL_7EPIiP_Qeacnmq6xp6Q91H3BK1vmfQvgGwPYz2i_um3xXNYIEiLnVYwXdWJ6uHJwu0UlY3XDTjrCdQI0eEg2T9WhC-x_tMGg.webp",
    desc:"항아리처럼…" },
  hantengu:{ name:"한텐구", main:"분열하는 내면의 생존자", sub:"[피해자 타입]",
    score:1, image:"https://i.namu.wiki/i/EO09L9k1_oLwzDsEi2FP6POB3DRCbtolMCHKUrRbos69zotbe9JufB_K35eT-Bku2HQHmGH116n_zUmSd5h3Ybt3mJWBKU-K656GOicHyhLRziNwJ0Qw72zQ2cc7U0xHc4vuaPkzG8AIbtbrIpqAQw.webp",
    desc:"여러 겹의 얼굴…" },
  gyutaro:{ name:"규타로 & 다키", main:"그림자 속 현실주의자", sub:"[현실주의자 타입]",
    score:2, image:"https://i.namu.wiki/i/yfN0oqKRLO4vQ2cAVwNkurSFMxXl107eMGNgp8sA0nOlwoNv0yCkctjlUVSps3iufOtm0q8IetV2tghH0au7XFr86YRyuWjGIZmD5o7TyA-tq_FU4mnfIWT5e1zcT8GIJnDVDKzqT-vzAWrt6WKS5w.webp",
    desc:"두 얼굴의 공존…" },
  ubuyashiki:{ name:"우부야시키 카가야", main:"모든 것을 포용하는 통찰가", sub:"[성인(聖人) 타입]",
    score:20, image:"https://i.namu.wiki/i/XDGCRQloqu_r7vfiiK85QTrEIw_JbzOUtaiN5XziI5DEM3JGpwyLU9OHz16wI5raV8EttmGmXRqQzK8vQcLmXLNgaIQ2IlI6rSBVzEEg8dc8FP5jb1LE_B6xdjPAwEn084O-8vsyzMdgpI6uMKUvgw.webp",
    desc:"균형과 혜안…" },
  muzan:{ name:"키부츠지 무잔", main:"모든 것을 지배하는 정복자", sub:"[군주 타입]",
    score:0, image:"https://i.namu.wiki/i/Wo9UiCNf2RLI-YpjyR5RDGnge_fZfS-i_C2sO45kWJQ7FJSzEivsrbDoiGjft3GkTNA3ikcIEgXifBZgBUc9TfdPTADfPsEFhqoatMPOgCvFDBwg0_bSPu8c9nbpxDQu1ULJOSNX87R_aWRwRr1lZA.webp",
    desc:"영원과 완전함…" },
  zenitsu:{ name:"아가츠마 젠이츠", main:"겁많은 번개의 기사", sub:"[본능 각성 타입]",
    score:13, image:"https://i.namu.wiki/i/-L9hjGLA9LxsdJCuSUycLYX_vG39VqF5taJrofYruH51lEtX16l_WKutPN26s8SRWGpp-e8mUMJNwyZR_GKgkB7Pal1CyoUb8ebPX96aDeY0wGAtt01FjQhqRryr-vJsojXutXCK3w4-er8sPWz5_A.webp",
    desc:"평소엔 두렵고 약해 보여도, 임계점에서 번개처럼 각성해 핵심을 벤다. 타인 의존과 애정 욕구가 크지만, 지켜야 할 대상 앞에서는 누구보다 용감해지는 모순이 강점이자 매력." }
};

/* ========= 프로필(5차원 좌표) =========
   방향만 보므로 대략적 위치면 충분. 서로 겹치지 않게 고르게 분포시켰습니다.
*/
const profiles = {
  rengoku:   {D1: 8,  D2: 6,  D3: 5,  D4: 8,  D5: 7},
  mitsuri:   {D1: 7,  D2:10,  D3:-4, D4: 9,  D5: 2},
  himejima:  {D1:10,  D2: 8,  D3: 8,  D4: 2,  D5:-6},
  tanjiro:   {D1: 9,  D2: 9,  D3: 2,  D4:10,  D5: 0},
  sanemi:    {D1: 4,  D2:-8,  D3: 6,  D4:-6,  D5: 8},
  shinobu:   {D1: 2,  D2:-9,  D3: 9,  D4:-5,  D5: 4},
  giyu:      {D1: 3,  D2:-7,  D3: 7,  D4:-8,  D5:-3},
  uzui:      {D1: 1,  D2: 5,  D3:-8,  D4: 6,  D5: 6},
  muichiro:  {D1:-5,  D2:-5,  D3:-2, D4:-4,  D5: 3},
  iguro:     {D1: 2,  D2:-8,  D3:10,  D4:-7,  D5: 1},
  nezuko:    {D1: 8,  D2: 7,  D3:-6,  D4: 5,  D5:-7},
  kokushibo: {D1:-8,  D2:-6,  D3: 9,  D4:-9,  D5: 9},
  akaza:     {D1:-6,  D2:-4,  D3: 6,  D4:-3,  D5:10},
  doma:      {D1:-10, D2: 4,  D3:-7, D4: 3,  D5:-5},
  gyokko:    {D1:-9,  D2: 1,  D3:-10,D4: 0,  D5:-2},
  hantengu:  {D1:-4,  D2:-10, D3:-5, D4:-10, D5:-10},
  gyutaro:   {D1:-7,  D2:-7,  D3: 3,  D4:-8,  D5: 5},
  ubuyashiki:{D1:10,  D2:10,  D3: 4,  D4: 7,  D5:-8},
  muzan:     {D1:-10, D2:-10, D3: 8,  D4:-10, D5: 9},
  zenitsu:   {D1: 4,  D2: 7,  D3:-2, D4: 3,  D5:-2}
};
// 정규화된 프로필 미리 계산
const normProfiles = {}; for(const k in profiles){ normProfiles[k]=normalize(profiles[k]); }

/* ========= 궁합 데이터 (일부만 예시/필요 항목만 노출) ========= */
const compatibilityData = {
  rengoku:{ love:"❤️ 운명의 상대 (칸로지 미츠리): 뜨거운 열정 × 따스한 사랑.",
            friend:"🤝 최고의 동료 (우즈이 텐겐): 화려함과 추진력의 시너지.",
            warning:"⚠️ 피해야 함 (코쿠시보): 헌신을 이해 못할 수 있음." },
  tanjiro:{ love:"❤️ 운명의 상대 (미츠리, 네즈코)", friend:"🤝 동료 (렌고쿠, 기유)", warning:"⚠️ 무잔" },
  giyu:{ love:"❤️ 시노부", friend:"🤝 탄지로", warning:"⚠️ 사ने미" },
  nezuko:{ love:"❤️ 젠이츠", friend:"🤝 탄지로", warning:"⚠️ 도우마" },
  shinobu:{ love:"❤️ 기유", friend:"🤝 교메이", warning:"⚠️ 도우마" },
  sanemi:{ love:"❤️ 카나에(설정)", friend:"🤝 교메이", warning:"⚠️ 기유" },
  iguro:{ love:"❤️ 미츠리", friend:"🤝 무이치로", warning:"⚠️ 텐겐" },
  muichiro:{ friend:"🤝 탄지로", warning:"⚠️ 아카자", strong_against:"🔺 교코" },
  himejima:{ friend:"🤝 전 귀살대원", warning:"⚠️ 무잔" },
  uzui:{ love:"❤️ (아내 3명)", friend:"🤝 렌고쿠", warning:"⚠️ 코쿠시보" },
  akaza:{ love:"❤️ 코유키", strong_against:"🔺 렌고쿠", weak_against:"🔻 탄지로" },
  kokushibo:{ friend:"🤝 아카자", strong_against:"🔺 교메이", weak_against:"🔻 요리이치" },
  doma:{ friend:"🤝 코쿠시보", warning:"⚠️ 시노부/이노스케" },
  gyokko:{ friend:"🤝 한텐구", weak_against:"🔻 무이치로" },
  hantengu:{ friend:"🤝 교코", warning:"⚠️ 탄지로" },
  gyutaro:{ love:"❤️ 다키", warning:"⚠️ 텐겐" },
  ubuyashiki:{ friend:"🤝 전 귀살대원", warning:"⚠️ 무잔" },
  muzan:{ weak_against:"🔻 요리이치", warning:"⚠️ 우부야시키" },
  zenitsu:{ love:"❤️ 네즈코: 당신의 용기를 끌어내 줄 단짝.", friend:"🤝 탄지로: 불안할 때 붙잡아 줄 사람.", warning:"⚠️ 사네미: 거친 태도에 위축되기 쉬움." },
  default:{ friend:"🤝 탄지로", warning:"⚠️ 무잔" }
};

/* ========= 상태 ========= */
let currentQuestionIndex = 0;
let scores = {D1:0,D2:0,D3:0,D4:0,D5:0};
let lastResultKey = '';

/* ========= 로직 ========= */
function startQuiz(){
  startScreen.style.display='none';
  quizScreen.style.display='block';
  // 질문별 최대 기여치 누적(진행바 스케일)
  for(const k of DIMS) dimCapacity[k]=0;
  questions.forEach(q=>{
    const maxAbs = {D1:0,D2:0,D3:0,D4:0,D5:0};
    q.a.forEach(ans=>{
      for(const k of DIMS) maxAbs[k]=Math.max(maxAbs[k],Math.abs(ans.v[k]||0));
    });
    for(const k of DIMS) dimCapacity[k]+=maxAbs[k];
  });
  showQuestion();
}

function showQuestion(){
  while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  const currentQ = questions[currentQuestionIndex];
  questionText.innerText = currentQ.q;
  shuffle(currentQ.a).forEach(answer=>{
    const btn=document.createElement('button');
    btn.innerText=answer.t; btn.className='answer-btn';
    btn.addEventListener('click',()=>selectAnswer(answer.v));
    answerButtons.appendChild(btn);
  });
  progressBar.style.width = `${((currentQuestionIndex+1)/questions.length)*100}%`;
}

function selectAnswer(values){
  for(const k in values){ scores[k]+=values[k]; }
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length) showQuestion();
  else calculateResult();
}

function calculateResult(){
  // 정규화 점수
  const normUser = normalize(scores);
  let bestKey=null, bestSim=-2;
  for(const key in normProfiles){
    const sim = cosineSim(normUser, normProfiles[key]);
    if(sim>bestSim){ bestSim=sim; bestKey=key; }
  }
  showResult(bestKey);
}

function fillBar(idx, value){
  // value: 실점 / dimCapacity → 0~1 → 좌→우(개인→대의 등)에서 "양수 쪽" 채움
  const cap = dimCapacity[DIMS[idx]]||1;
  // [-cap, cap] → [0,100]
  const pct = Math.max(0, Math.min(100, ((value+cap)/(2*cap))*100 ));
  dimFills[idx].style.width = `${pct}%`;
}

function showResult(key){
  lastResultKey = key;
  const r = results[key] || results.tanjiro;
  quizScreen.style.display='none'; chartScreen.style.display='none'; resultScreen.style.display='block';
  resultImage.src = r.image; resultMainTrait.innerText = r.main; resultSubTrait.innerText = r.sub; resultDescription.innerText = r.desc || "";
  // 진행바
  fillBar(0, scores.D1); fillBar(1, scores.D2); fillBar(2, scores.D3); fillBar(3, scores.D4); fillBar(4, scores.D5);
  // 멘토링 점수
  const s = r.score ?? 10;
  let text = `후배사랑 멘토링 적합도: ${s}/20`;
  if (s>=16) text += "\n당신은 모두에게 귀감이 되는 최고의 멘토입니다!";
  else if (s>=11) text += "\n훌륭한 자질이 충분합니다.";
  else if (s>=6) text += "\n잠재력이 있어요. 조금만 용기를!";
  else text += "\n팀 활동보단 개인 플레이에서 더 빛납니다!";
  if (s>=11) text += "\n\n[후배사랑 멘토링]은 바로 당신을 위한 무대!";
  mentoringRecommendation.innerText = text;
}

function showChart(){
  resultScreen.style.display='none'; chartScreen.style.display='block';
  const my = results[lastResultKey] || results.tanjiro;
  chartOwnerName.innerText = my.name;
  const comp = compatibilityData[lastResultKey] || compatibilityData.default;
  let h='';
  if(comp.love) h+=`<h4>❤️ 연애 궁합</h4><p>${comp.love.substring(2)}</p>`;
  if(comp.friend) h+=`<h4>🤝 친구 궁합</h4><p>${comp.friend.substring(2)}</p>`;
  if(comp.warning) h+=`<h4>⚠️ 피해야 함</h4><p>${comp.warning.substring(2)}</p>`;
  if(comp.strong_against) h+=`<h4>🔺 강한 상대</h4><p>${comp.strong_against.substring(2)}</p>`;
  if(comp.weak_against) h+=`<h4>🔻 약한 상대</h4><p>${comp.weak_against.substring(2)}</p>`;
  dynamicChartContent.innerHTML = h;
}
function showResultView(){ chartScreen.style.display='none'; resultScreen.style.display='block'; }
function restartQuiz(){
  currentQuestionIndex=0; scores={D1:0,D2:0,D3:0,D4:0,D5:0};
  resultScreen.style.display='none'; chartScreen.style.display='none'; startScreen.style.display='block';
}
</script>
</body>
</html>

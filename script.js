// ==============================================================
// STAGE 0: 질문 데이터 (시나리오 + 척도별 의미 부여)
// ==============================================================
const questions = [
    // Part 1: 근본 기질 (6개)
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "까마귀의 울음소리가 그치고 찾아온 휴일. 등나무 꽃 향기 가득한 방에서 어떻게 재충전하고 싶나요?", belief_a: "혼자 조용히 명상하며 호흡을 가다듬는다", belief_b: "나비 저택의 동료들과 웃고 떠들며 시간을 보낸다", labels: ["완전한 고독", "소수와의 대화", "상황에 따라", "만남이 좋음", "왁자지껄한 파티"] },
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "새로운 임무가 내려왔다. 당신은 지도를 펼치고 무엇부터 확인할 건가요?", belief_a: "오니의 출몰 기록, 지형 등 구체적인 사실", belief_b: "임무에 숨겨진 진정한 의미와 가능성", labels: ["오직 팩트", "현실 중심", "균형", "의미 탐색", "거대한 그림"] },
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "처음 소집된 주합 회의, 어색한 분위기 속에서 당신의 모습은?", belief_a: "다른 이들이 먼저 말하길 기다린다", belief_b: "먼저 말을 걸며 대화의 물꼬를 튼다", labels: ["침묵 속 관찰", "소극적 참여", "눈치 보기", "적극적 대화", "분위기 주도"] },
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "강력한 혈귀술을 가진 오니와 마주쳤다. 당신이 더 의지하는 것은?", belief_a: "혹독한 훈련으로 연마한 검의 형태(形)", belief_b: "상황에 따라 변화하는 순간의 직감", labels: ["정해진 검술", "경험 기반", "상황 판단", "직감 의존", "완전한 즉흥"] },
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "마음이 복잡할 때, 당신의 해결 방식은?", belief_a: "스스로의 내면을 깊이 파고들어 답을 찾는다", belief_b: "신뢰하는 동료에게 털어놓으며 조언을 구한다", labels: ["완전한 내면", "혼자만의 정리", "고민 중", "조언 구하기", "모두와 공유"] },
    { part: "Part 1/5: 너의 호흡의 근원", scenario: "새로운 동료 대원을 평가할 때, 더 중요하게 생각하는 것은?", belief_a: "지금까지의 구체적인 임무 성공률과 성과", belief_b: "그의 눈빛에서 느껴지는 열정과 잠재력", labels: ["데이터 신뢰", "성과 중심", "균형", "가능성 중시", "잠재력에 투자"] },
    
    // Part 2: 내면 세계 (6개)
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신이 목숨을 걸고 검을 휘두르는 가장 큰 이유는 무엇인가요?", belief_a: "나 자신의 신념과 긍지를 지키기 위해", belief_b: "힘없는 사람들을 지키는 것이 나의 책무이기에", labels: ["오직 나를 위해", "나의 신념", "균형", "타인을 위해", "모두를 위해"] },
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신을 움직이는 더 큰 원동력은 무엇인가요?", belief_a: "더 나은 미래를 만들겠다는 희망", belief_b: "과거에 겪었던 고통과 분노", labels: ["긍정과 희망", "미래 지향", "현재에 집중", "과거의 상처", "복수와 증오"] },
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신에게 더 큰 두려움으로 다가오는 것은 무엇인가요?", belief_a: "누구에게도 인정받지 못하고 잊히는 것", belief_b: "스스로가 쓸모없고 무력하다고 느끼는 것", labels: ["완벽한 실패", "인정받지 못함", "둘 다 두려움", "무력감", "자기혐오"] },
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신의 마음을 더 흔드는 생각은 무엇인가요?", belief_a: "나는 남들과 다른 특별한 존재여야만 한다", belief_b: "나는 남들 곁에 있을 자격이 없는 존재다", labels: ["선민사상", "특별함 추구", "중립", "자기 의심", "깊은 자기혐오"] },
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신이 반드시 지키고 싶은 것은 무엇인가요?", belief_a: "그 누구에게도 굴하지 않는 강인함", belief_b: "소중한 사람들과 함께하는 평화로운 일상", labels: ["절대적 강함", "힘과 명예", "균형", "안정과 평화", "가족과 동료"] },
    { part: "Part 2/5: 마음이라는 칼집", scenario: "당신에게 더 큰 고통은 무엇인가요?", belief_a: "나의 재능이 한계에 부딪혔다는 절망감", belief_b: "내가 믿었던 사람에게 배신당하는 상실감", labels: ["재능의 한계", "개인의 실패", "상황에 따라", "관계의 상실", "완벽한 배신"] },

    // Part 3: 판단 및 대처 (6개)
    { part: "Part 3/5: 검의 길", scenario: "규율을 어긴 동료를 발견했다. 당신의 신념은 어디에 더 가깝나요?", belief_a: "규율보다 동료의 마음이 더 중요하다", belief_b: "동료의 마음보다 조직의 규율이 더 중요하다", labels: ["오직 마음", "감정 우선", "고뇌", "원칙 우선", "절대적 규율"] },
    { part: "Part 3/5: 검의 길", scenario: "재능이 부족해 보이는 신입 대원과 함께 훈련하게 되었을 때, 당신의 생각은?", belief_a: "그의 가능성을 믿고 인내심을 갖고 가르쳐준다", belief_b: "스스로의 힘으로 극복해야 할 문제라고 생각한다", labels: ["무한한 지지", "적극적 도움", "상황을 봄", "거리를 둠", "각자도생"] },
    { part: "Part 3/5: 검의 길", scenario: "강력한 상현 오니와 마주쳐 절체절명의 위기에 빠졌다. 당신의 본능은?", belief_a: "공포에 휩싸여 아무 생각도 나지 않는다", belief_b: "오히려 머리가 차가워지며 상황을 분석한다", labels: ["완전한 패닉", "불안과 공포", "긴장", "침착함 유지", "냉철한 분석"] },
    { part: "Part 3/5: 검의 길", scenario: "합동 임무 중, 동료들이 지쳐 사기가 떨어졌다. 당신의 역할은?", belief_a: "따뜻한 말로 위로하며 그들의 마음을 보듬는다", belief_b: "상황을 타개할 가장 효율적인 작전을 제시한다", labels: ["공감과 위로", "감정적 지지", "균형", "논리적 해결", "결과가 우선"] },
    { part: "Part 3/5: 검의 길", scenario: "당신이 세상을 바라보는 기본적인 시선은?", belief_a: "사람은 본질적으로 선하며, 서로 도울 수 있다", belief_b: "사람은 이기적이며, 언제든 배신할 수 있다", labels: ["완전한 신뢰", "긍정적 시선", "상황에 따라", "회의적 시선", "깊은 불신"] },
    { part: "Part 3/5: 검의 길", scenario: "임무에 실패하여 상관에게 질책을 받았다. 당신의 반응은?", belief_a: "깊은 좌절감에 빠져 한동안 자책한다", belief_b: "부족한 점을 즉시 복기하고 다음 훈련에 돌입한다", labels: ["심한 자책", "좌절", "실망", "반성", "즉시 개선"] },

    // Part 4: 사회적 가면 (6개)
    { part: "Part 4/5: 임무 수행 방식", scenario: "합동 임무를 앞두고, 당신의 준비 스타일은?", belief_a: "현장의 흐름에 몸을 맡기는 즉흥적인 스타일", belief_b: "모든 경우의 수를 계산하는 치밀한 계획가 스타일", labels: ["완전 즉흥", "유연하게", "큰 틀만", "세부 계획", "완벽 계획"] },
    { part: "Part 4/5: 임무 수행 방식", scenario: "임무가 없는 날, 당신의 모습은?", belief_a: "그날의 기분에 따라 마음 가는 대로 자유롭게 보낸다", belief_b: "정해진 훈련 계획을 한 번도 거르지 않고 꾸준히 수행한다", labels: ["완전 자유", "즉흥적", "상황에 따라", "규칙적", "엄격한 루틴"] },
    { part: "Part 4/5: 임무 수행 방식", scenario: "작전 수행 중 예상치 못한 오니의 등장으로 계획이 틀어졌다. 당신의 반응은?", belief_a: "이런 돌발 상황이야말로 전장의 묘미라고 생각한다", belief_b: "계획이 틀어지는 것에 극심한 스트레스를 받는다", labels: ["짜릿함", "흥미로움", "약간의 긴장", "불편함", "극심한 스트레스"] },
    { part: "Part 4/5: 임무 수행 방식", scenario: "당신이 더 선호하는 역할은?", belief_a: "명령에 얽매이지 않고 자유롭게 행동하는 역할", belief_b: "정해진 규칙과 절차에 따라 임무를 수행하는 역할", labels: ["완전한 자유", "재량권 중시", "균형", "규칙 존중", "엄격한 절차"] },
    { part: "Part 4/5: 임무 수행 방식", scenario: "당신에게 더 중요한 것은 무엇인가요?", belief_a: "결과보다 과정의 융통성과 자유로움", belief_b: "과정보다 결과의 완성과 책임감", labels: ["과정이 전부", "자유 중시", "상황에 따라", "책임감 중시", "결과가 전부"] },
    { part: "Part 4/5: 임무 수행 방식", scenario: "임무를 마치고 마을에 들렀을 때, 당신의 행동은?", belief_a: "발길 닿는 대로 정처 없이 돌아다니는 것을 즐긴다", belief_b: "정해진 목적만 해결하고 신속하게 저택으로 복귀한다", labels: ["자유로운 방랑", "호기심", "상황에 따라", "목표 지향", "신속 복귀"] },

    // Part 5: 개방성 및 경험 (6개)
    { part: "Part 5/5: 바라보는 세계", scenario: "'인간을 해치지 않는 오니'가 나타났다. 당신의 생각은?", belief_a: "그 존재를 직접 확인하며 새로운 가능성을 탐색해야 한다", belief_b: "오니는 오니일 뿐, 어떠한 예외도 있을 수 없다", labels: ["완전 수용", "가능성 탐색", "신중한 관망", "강한 의심", "절대 불허"] },
    { part: "Part 5/5: 바라보는 세계", scenario: "당신이 더 가치를 두는 것은?", belief_a: "달빛에 비친 검의 궤적 같은 예술적 가치", belief_b: "전투의 승리라는 현실적인 가치", labels: ["예술과 낭만", "추상적 가치", "균형", "현실적 성과", "오직 승리"] },
    { part: "Part 5/5: 바라보는 세계", scenario: "당신이 더 흥미를 느끼는 것은?", belief_a: "지금까지 없었던 새로운 호흡을 창시하는 것", belief_b: "오래전부터 이어져 온 전통 호흡을 완성하는 것", labels: ["완전한 창조", "새로운 시도", "응용과 발전", "전통의 계승", "완벽한 재현"] },
    { part: "Part 5/5: 바라보는 세계", scenario: "당신의 신념은 어디에 더 가깝나요?", belief_a: "전통과 규칙은 시대의 흐름에 따라 변해야 한다", belief_b: "전통과 규칙은 어떤 상황에서도 굳건히 지켜져야 한다", labels: ["혁신이 우선", "유연한 적용", "상황에 따라", "존중이 우선", "절대적 준수"] },
    { part: "Part 5/5: 바라보는 세계", scenario: "적이라 할지라도, 그가 왜 오니가 될 수밖에 없었는지 슬픈 사연을 듣게 된다면?", belief_a: "깊은 연민을 느끼고 그의 운명에 대해 생각하게 될 것이다", belief_b: "그것은 개인의 사정일 뿐, 동정의 여지가 없다", labels: ["깊은 공감", "연민", "이해 시도", "냉정한 분리", "완전한 무시"] },
    { part: "Part 5/5: 바라보는 세계", scenario: "당신이 동료들과 나누고 싶은 대화의 주제는?", belief_a: "삶과 죽음, 인간의 마음 같은 철학적인 주제", belief_b: "다음 임무에 대한 구체적인 전략", labels: ["철학적 담론", "의미 탐구", "균형", "실용적 대화", "오직 전략"] }
];

// ==============================================================
// STAGE 1: 캐릭터 데이터 (원작 관계 반영)
// ==============================================================
const characterData = [
  // 여기에 이전에 생성했던 25명의 캐릭터 데이터(id, name, type, image, scores, texts)가 모두 들어갑니다.
  // 글자 수 제한으로 인해 예시 데이터만 남깁니다. 실제 코드에서는 전체 데이터를 붙여넣어야 합니다.
  { id: 1, name: "카마도 탄지로", type: "태양처럼 따뜻한 마음을 지닌 노력가", image: "https://i.namu.wiki/i/XDxdrDb5EfET9eod7H1StURXE21RMy-DRRAVrvnB14-qsZeKe7HEOhl9XQInz9FzAexvWEQr9T2ZduP6wU6O-y4khafcN1JUvM5_nyDIN_x8rl8kxdkaF_TDF6zwo9LzSxuPZmGDqAeYMSQ3YAe8yQ.webp", scores: [5, 5, 5, 2, 5, 5, 5, 2, 1, 1, 5, 1, 1, 5, 2, 1, 5, 2, 2, 5, 1, 1, 5, 1, 5, 2, 5, 2, 5, 5], 
    texts: { 
        analysis: { 
            part1: { title: "호흡의 근원(根本): 태양처럼 따뜻한 물의 호흡", desc: "당신의 힘은 **태양처럼 따뜻한 마음**에서 비롯됩니다. 혼자 있을 때보다 동료들과의 **유대(絆)** 속에서 호흡이 가다듬어지고, 그 관계를 통해 더욱 강해지는군요. 당신의 눈은 탄지로처럼 사물의 본질을 꿰뚫어, 절망 속에서도 승리로 이어지는 **'틈새의 실'**을 발견해내는 힘을 가졌습니다." },
            part2: { title: "마음이라는 칼집(鞘): 타인을 지키기 위해 벼려진 검", desc: "당신의 마음이라는 칼집 속에는, 타인을 지키고자 하는 순수한 열망으로 벼려진 **'일륜도(日輪刀)'**가 잠들어 있습니다. 하지만 그 검에는 '소중한 것을 잃을지도 모른다'는 과거의 상처로 인한 작은 **틈**이 존재합니다. 이 틈이 때로는 당신을 고통스럽게 하지만, 동시에 당신의 검을 더욱 단단하고 자비롭게 만드는 원동력이 됩니다." },
            part3: { title: "검의 길(剣の道): 마음으로 베는 자비의 검격", desc: "당신의 검의 길은 차가운 이성으로 베는 검이 아닌, **뜨거운 마음으로 길을 여는 검**입니다. 당신은 설령 적이라 할지라도 그가 오니가 될 수밖에 없었던 슬픈 사연에 귀를 기울일 줄 아는 사람입니다. 당신의 검격은 단순한 파괴가 아닌, 잘못된 것을 바로잡고 슬픔의 연쇄를 끊어내기 위한 처절한 외침과 같습니다." },
            part4: { title: "임무 수행 방식(任務遂行): 목표를 향한 '전집중・상중(全集中・常中)'", desc: "귀살대원으로서 당신은 한번 목표를 정하면, 마치 **'전집중 호흡・상중'**을 유지하듯 끈기 있게 나아가는 성실한 검사입니다. 당신의 그 꾸준함과 책임감은 주변 동료들에게 안정감을 주며, 아무리 힘든 임무라도 결국 당신이라면 해낼 것이라는 강한 신뢰를 심어줍니다." },
            part5: { title: "바라보는 세계(世界観): 낡은 규율을 넘어선 새로운 길", desc: "당신이 바라보는 세계는 흑과 백으로 나뉘어 있지 않습니다. '오니는 무조건적인 악'이라는 **낡은 규율에 얽매이지 않고**, 새로운 가능성을 탐색할 줄 아는 유연한 영혼의 소유자군요. 당신의 그 열린 마음은, 어쩌면 모두가 불가능하다고 여겼던 새로운 길을 열고, 귀살대의 미래를 바꿀 잠재력을 품고 있습니다." }
        },
        chemistry: { romance: { name: "츠유리 카나오", desc: "당신의 따뜻함과 굳은 의지는 닫혀있는 사람의 마음을 열게 하는 힘이 있습니다. 당신의 헌신적인 사랑을 깊이 이해하고, 조용히 곁을 지키며 함께 성장할 수 있는 사람과 가장 이상적인 관계를 맺을 수 있습니다." }, friendship: { name: "렌고쿠 쿄쥬로", desc: "당신의 긍정적인 에너지와 올곧은 신념은, 불꽃처럼 뜨거운 열정을 가진 사람과 만났을 때 엄청난 시너지를 냅니다. 서로를 믿고 격려하며, 더 높은 목표를 향해 함께 나아가는 최고의 동료가 될 수 있습니다." }, caution: { name: "키부츠지 무잔", desc: "당신의 이타심과 신뢰를 자신의 이익을 위해 이용하려는 사람을 가장 경계해야 합니다. 생명의 가치를 경시하고 타인을 도구로 여기는 유형과는 근본적으로 가치관이 충돌하여 큰 상처를 받을 수 있습니다." }},
        mentoring: { role: "성장형 멘티이자, 동료를 이끄는 멘토", desc: "당신은 아직 배우고 성장할 부분이 많은 **훌륭한 '멘티'의 자질**을 가지고 있습니다. 특히 확고한 신념과 풍부한 경험을 가진 멘토를 만났을 때, 그 가르침을 스펀지처럼 흡수하여 자신의 것으로 만들 수 있습니다. 동시에, 당신은 동료들의 마음을 보듬고 그들의 가능성을 믿어주는 **'수평적 멘토'**의 역할에도 매우 적합합니다. 당신의 공감과 격려는 때로 스승의 가르침보다 더 큰 힘을 발휘할 수 있습니다." }
    }},
    // ... 나머지 24명의 캐릭터 데이터와 텍스트를 모두 여기에 붙여넣어야 합니다.
];

// ==============================================================
// STAGE 2 & 3: 로직 및 실행 코드
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const startBtn = document.getElementById('start-btn');
    const partTitle = document.getElementById('part-title');
    const scenarioText = document.getElementById('scenario-text');
    const beliefA = document.getElementById('belief-a');
    const beliefB = document.getElementById('belief-b');
    const scaleBtns = document.querySelectorAll('.scale-btn');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    const resultScreen = document.getElementById('result-screen');
    const labelElements = [
        document.getElementById('label-1'),
        document.getElementById('label-2'),
        document.getElementById('label-3'),
        document.getElementById('label-4'),
        document.getElementById('label-5')
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];

    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove('active-screen'));
        document.getElementById(screenId).classList.add('active-screen');
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            partTitle.textContent = q.part;
            scenarioText.textContent = `Q${currentQuestionIndex + 1}. ${q.scenario}`;
            beliefA.textContent = q.belief_a;
            beliefB.textContent = q.belief_b;

            q.labels.forEach((label, index) => {
                if (labelElements[index]) {
                    labelElements[index].innerHTML = label.replace(" ", "<br>");
                }
            });

            progressText.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
            progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
            scaleBtns.forEach(btn => btn.classList.remove('selected'));
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

    function calculateSimilarity(userScores, characterProfile) {
      if (!characterProfile || !characterProfile.scores) return Infinity;
      if (userScores.length !== characterProfile.scores.length) {
        return Infinity;
      }
      let totalDifference = 0;
      for (let i = 0; i < userScores.length; i++) {
        totalDifference += Math.abs(userScores[i] - characterProfile.scores[i]);
      }
      return totalDifference;
    }

    function findBestMatches(userScores, allCharacters) {
        if (!allCharacters || allCharacters.length === 0) return [];
        const results = allCharacters.map(character => ({
            score: calculateSimilarity(userScores, character),
            character: character
        }));
        results.sort((a, b) => a.score - b.score);
        return results.slice(0, 3);
    }
    
    function generateRadarChart(userScores) {
        const size = 300;
        const center = size / 2;
        const radius = center * 0.8;
        const labels = ["기질", "내면", "판단", "가면", "개방성"];
        
        const getUserPoints = (scores) => {
            const points = [];
            const totalScores = [0, 0, 0, 0, 0];
            if (!scores || scores.length !== 30) return "";
            for (let i = 0; i < 30; i++) {
                const partIndex = Math.floor(i / 6);
                totalScores[partIndex] += scores[i];
            }
            const maxPartScore = 6 * 5; 
            const minPartScore = 6 * 1;
            const normalizedScores = totalScores.map(score => (score - minPartScore) / (maxPartScore - minPartScore));

            for (let i = 0; i < 5; i++) {
                const angle = (Math.PI * 2 * i) / 5 - (Math.PI / 2);
                const x = center + radius * normalizedScores[i] * Math.cos(angle);
                const y = center + radius * normalizedScores[i] * Math.sin(angle);
                points.push(`${x},${y}`);
            }
            return points.join(' ');
        }

        const userPoints = getUserPoints(userScores);
        
        let axisLines = '';
        let axisLabels = '';
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - (Math.PI / 2);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            axisLines += `<line class="radar-line" x1="${center}" y1="${center}" x2="${x2}" y2="${y2}"></line>`;
            const lx = center + (radius + 25) * Math.cos(angle);
            const ly = center + (radius + 25) * Math.sin(angle);
            axisLabels += `<text class="radar-label" x="${lx}" y="${ly}" dy="5">${labels[i]}</text>`;
        }

        return `
            <div class="radar-chart-container mx-auto">
                <svg class="radar-chart" viewBox="0 0 ${size} ${size}">
                    ${axisLines}
                    <polygon class="radar-polygon" points="${userPoints}"></polygon>
                    ${axisLabels}
                </svg>
            </div>
        `;
    }

    function calculateAndShowResult() {
        if (!characterData || characterData.length < 25 || !characterData[0].texts) {
            resultScreen.innerHTML = `<div class="text-white text-center p-8 result-card rounded-lg"><h2>오류</h2><p>캐릭터 데이터가 완전하지 않습니다. script.js 파일에 모든 캐릭터 데이터를 붙여넣었는지 확인해주세요.</p></div>`;
            showScreen('result-screen');
            return;
        }

        const top3Matches = findBestMatches(userAnswers, characterData);
        if (top3Matches.length === 0) return;

        const mainResult = top3Matches[0].character;
        const texts = mainResult.texts;

        const maxDiff = 30 * 4; 
        const similarityPercentage = Math.max(0, 100 - (top3Matches[0].score / maxDiff) * 100).toFixed(0);

        const analysisHTML = Object.values(texts.analysis).map(part => `
            <div class="text-left space-y-2 p-4 border-b border-gray-700 last:border-b-0">
                <h4 class="text-xl font-semibold text-violet-300">${part.title}</h4>
                <p class="text-gray-300 leading-relaxed">${part.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-violet-200">$1</strong>')}</p>
            </div>
        `).join('');
        
        resultScreen.innerHTML = `
            <div class="w-full text-center fade-in space-y-10">
                <div class="space-y-4">
                    <h1 class="text-3xl md:text-5xl font-bold text-white tracking-wider" style="text-shadow: 0 0 10px #a78bfa;">당신의 영혼과 가장 닮은 검사는...</h1>
                    <div class="flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-lg result-card">
                        <img src="${mainResult.image}" alt="${mainResult.name}" class="w-48 h-48 rounded-full border-4 border-violet-400 object-cover shadow-lg">
                        <div class="text-left space-y-2">
                            <h2 class="text-4xl font-bold text-violet-300">${mainResult.name}</h2>
                            <p class="text-xl text-gray-300">${mainResult.type}</p>
                            <p class="text-lg text-gray-300">성격 일치율: <span class="font-bold text-violet-300">${similarityPercentage}%</span></p>
                        </div>
                    </div>
                </div>

                <div class="p-6 rounded-lg result-card space-y-4">
                    <h3 class="text-2xl font-bold border-b-2 border-violet-400 pb-2 mb-4">페르소나 프리즘 심층 분석</h3>
                    ${generateRadarChart(userAnswers)}
                    <div class="mt-4">${analysisHTML}</div>
                </div>
                
                <div class="p-6 rounded-lg result-card space-y-4">
                     <h3 class="text-2xl font-bold border-b-2 border-violet-400 pb-2 mb-4">관계 케미 분석</h3>
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
                            <h4 class="text-xl font-semibold text-sky-400">⚠️ 주의 케미</h4>
                            <p class="font-bold mt-1">${texts.chemistry.caution.name} 유형</p>
                            <p class="text-sm text-gray-400 mt-2">${texts.chemistry.caution.desc}</p>
                        </div>
                     </div>
                </div>

                <div class="p-6 rounded-lg result-card space-y-4 text-left">
                     <h3 class="text-2xl font-bold border-b-2 border-violet-400 pb-2">멘토링 잠재력 분석</h3>
                     <h4 class="text-xl font-semibold text-violet-300">${texts.mentoring.role}</h4>
                     <p class="text-gray-300 leading-relaxed">${texts.mentoring.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-violet-200">$1</strong>')}</p>
                </div>
            </div>
        `;
        showScreen('result-screen');
    }

    // 초기화 및 이벤트 리스너
    startBtn.addEventListener('click', () => {
        showScreen('test-screen');
        currentQuestionIndex = 0;
        userAnswers = [];
        showQuestion();
    });

    scaleBtns.forEach(button => {
        button.addEventListener('click', () => {
            const value = parseInt(button.dataset.value);
            button.classList.add('selected');
            setTimeout(() => handleChoice(value), 200);
        });
    });

    // 앱 시작
    showScreen('start-screen');
});
```eof
// ========== 可改参数区域 ==========
const TIME_LIMIT_MS = 12000;         // 每页选择阶段的时间限制


const TOP_TITLE = "Teacher decision task (demo text)";
const TOP_SUBTITLE =
    "Please prioritise which student you would intervene/support first.";

const intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="intro-box">
      <h2>Classroom Decision Task</h2>
      <p>
        In this task, you will take the role of a teacher at the beginning of a lesson.
      </p>
      <p>
        There are no right or wrong answers.
Please respond as naturally as possible.
      </p>
      <p>
        Your mouse movements will be recorded during the task.
      </p>
    </div>
  `,
    choices: ["Start"],


};



const consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div style="max-width: 700px; margin: 0 auto; text-align: left; line-height: 1.6;">
      <h2>Participant Information</h2>

      <p>
        You are invited to take part in a brief decision-making task.
      </p>

      <p>
       In each trial, you will see two student profiles, including images and short descriptions.
You will be asked to make a choice between them.
      </p>

      <p>
       Your mouse movements and response times will be recorded as part of the task.
This information is used to analyse decision processes.
      </p>

      <p>
        Participation is voluntary. You may withdraw at any time.
No personally identifiable information will be collected.
      </p>

      <p><strong>By clicking "I agree", you confirm that you understand the task and consent to participate.</strong></p>
    </div>
  `,
    choices: ["I agree"]
};


// 3 个 trial 的材料（你之后替换即可）
const TRIALS = [
    {
        trial_id:"A",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",

        left: {
            id: "A_high",
            name: "Student 1",
            front: "He raises his hand eagerly, leaning forward as if ready to answer.Usually quiet. This term has become more disruptive, frequently playing in class and affecting classroom discipline.",
        },
        right: {
            id: "A_low",
            name: "Student 2",
            front: "He raises his hand quietly while keeping his eyes on the book. Previously engaged. Recently shows withdrawal and signs of stress; rarely responds when addressed.",
        },
        left_img: "img/l1.png",
        right_img: "img/l2.png",

    },

    {
        trial_id:"B",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",

        left: {
            id: "B_high",
            name: "Student 1",
            front: "He writes continuously, focused on completing the task in front of him.Generally cooperative; calling out happens 1–2 times per lesson, mild disruption.",
        },
        right: {
            id: "B_low",
            name: "Student 2",
            front: "He rests his chin on his hand, staring ahead without engaging with the task.Consistently disengaged for weeks; rarely initiates interaction.",
        },
        left_img: "img/l3.png",
        right_img: "img/l4.png",
    },
    {
        trial_id:"C",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",

        left: {
            id: "C_high",
            name: "Student 1",
            front: "The student sits upright, eyes fixed on the teacher, with his hand halfway raised as if ready to respond.High-frequency disruption; peers lose focus and instruction is repeatedly interrupted.",
        },
        right: {
            id: "C_low",
            name: "Student 2",
            front: "The student remains seated quietly, eyes drifting away from the book as his raised hand hangs uncertainly in the air.Low-level disengagement; still follows instructions and completes tasks slowly.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"D",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",

        left:{
            id:"D_high",
            name:"Student 1",
            front: "During whole-class questioning, the student raises their hand quickly and leans forward to respond.",
        },
        right: {
            id: "D_low",
            name: "Student 2",
            front: "When the teacher asks a question, the student looks at the board and only responds when directly called on.",
        },
        left_img: "img/l8.png",
        right_img: "img/l4.png",
    },
    {
        trial_id:"E",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",

        left: {
            id: "E_high",
            name: "Student 1",
            front: "During individual work, the student writes steadily and remains focused on the worksheet.",
        },
        right: {
            id: "E_low",
            name: "Student 2",
            front: "While working independently, the student pauses often and needs reminders to continue.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"F",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",

        left: {
            id: "F_high",
            name: "Student 1",
            front: "In group activities, the student speaks frequently and takes the lead in discussion.",
        },
        right: {
            id: "F_low",
            name: "Student 2",
            front: "During group work, the student listens to others but rarely contributes ideas.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"G",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",

        left: {
            id: "G_high",
            name: "Student 1",
            front: "When the teacher walks past, the student straightens up and looks back at the task.",
        },
        right: {
            id: "G_low",
            name: "Student 2",
            front: "As the teacher circulates, the student continues working without reacting.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"H",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",

        left: {
            id: "H_high",
            name: "Student 1",
            front: "Under time-limited practice, the student completes tasks quickly with little hesitation.",
        },
        right: {
            id: "H_low",
            name: "Student 2",
            front: "During timed exercises, the student works slowly and appears unsure about how to proceed.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"I",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",

        left: {
            id: "I_high",
            name: "Student 1",
            front: "During transitions between activities, the student quickly settles and begins the next task.",
        },
        right: {
            id: "I_low",
            name: "Student 2",
            front: "When the activity changes, the student remains seated and waits without starting the task.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },
    {
        trial_id:"J",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",

        left: {
            id: "J_high",
            name: "Student 1",
            front: "When working with peers, the student actively exchanges ideas and checks others’ understanding.",
        },
        right: {
            id: "J_low",
            name: "Student 2",
            front: "In peer activities, the student stays nearby but lets others take over the task.",
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    },

];

// ========== jsPsych 初始化 ==========
const jsPsych = initJsPsych({
    on_finish: () => {
        const allData = jsPsych.data.get().json(); // 包含每个 trial 的 data（含 mouse_path 字段）

        // 如果在 JATOS 环境里，就提交到 JATOS；否则本地 demo 仍然下载
        if (typeof jatos !== "undefined") {
            jatos.submitResultData(allData, jatos.startNextComponent);
        } else {
            // 本地调试：仍然允许下载
            const blob = new Blob([jsPsych.data.get().csv()], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `mouse_task_${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
    }
});

// ========== 工具函数 ==========
function downloadText(text, filename, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}



function installChrome() {
    const bg = document.createElement("div");
    bg.id = "bg";
    bg.style.backgroundImage = "url('img/c0.png')";
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
    bg.style.display = "none";   // 默认不显示

    document.body.appendChild(bg);

    // 白膜（overlay）：盖在背景图上，用来“发白”
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "none";
    overlay.style.pointerEvents = "none";  // 不挡点击
    document.body.appendChild(overlay);


    // 顶栏
    const topbar = document.createElement("div");
    topbar.id = "topbar";
    topbar.innerHTML = `
    <div class="title">${TOP_TITLE}</div>
    <div class="subtitle">${TOP_SUBTITLE}</div>
  `;
    document.body.appendChild(topbar);

    // 计时器
    const timer = document.createElement("div");
    timer.id = "timer";
    timer.textContent = "Time: --";
    document.body.appendChild(timer);
}


function removeChrome() {
    ["bg", "overlay", "topbar", "timer"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
}
function showBg(alpha = 0.85, imgUrl = null) {
    const bg = document.getElementById("bg");
    const overlay = document.getElementById("overlay");

    if (bg) {
        if (imgUrl) bg.style.backgroundImage = `url('${imgUrl}')`;
        bg.style.display = "block";
    }
    if (overlay) {
        overlay.style.display = "block";
        overlay.style.pointerEvents = "none";
        overlay.style.background = `rgba(255,255,255,${alpha})`;
    }
}


function hideBg() {
    const bg = document.getElementById("bg");
    const overlay = document.getElementById("overlay");
    if (bg) bg.style.display = "none";
    if (overlay) overlay.style.display = "none";
}

let __audio = null;

function playAudio(url) {
    if (!url) return;
    try {
        if (__audio) {
            __audio.pause();
            __audio.currentTime = 0;
        }
        __audio = new Audio(url);
        __audio.play().catch(() => {});
    } catch (e) {}
}



// ========== 生成：每个 trial 的 Start 页 ==========
function makeStartTrial(trialIndex,t) {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
      <div id="content">
        <div class="center-box" style="margin-top: 120px;">
          <div style="font-size:18px; font-weight:600;">
                The lesson has just begun.
            </div>

             <div style="margin-top:10px; color:#444;">
                Some students are still talking, and the classroom feels slightly chaotic.
            </div>
          <div style="margin-top:10px; color:#666;">
            Click Start to reveal the two student cards.
          </div>
        </div>
      </div>
    `,
        choices: ["Start"],

        on_load: () => {
            console.log("START PAGE trialIndex =", trialIndex);

            // ✅ 用 trial 自己的 bg_img
            if (t && t.bg_img) {
                showBg(0.85, t.bg_img);
            } else {
                hideBg();
            }

            // 重置计时器显示
            if (window.__timerInterval) clearInterval(window.__timerInterval);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";

            // 播放 start 音频（如果有）
            if (t && t.audio) {
                playAudio(t.audio);
            }
        },
        on_finish: (data) => {
            data.phase = "start";
            data.trial_num = trialIndex + 1;
            hideBg();
        }
    };
}



        function makeBetweenTrial(nextTrialIndex) {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
      <div id="content">
        <div class="center-box" style="margin-top: 120px;">
          <div style="font-size:18px; font-weight:700;">
            Trial ${nextTrialIndex + 1} / ${TRIALS.length}
          </div>
          <div style="margin-top:10px; color:#666;">
            Click Start when you are ready.
          </div>
        </div>
      </div>
    `,
        choices: ["Start"],

        // 关键：不启用 timer（不要 trial_duration）
        on_load: () => {
            hideBg();
            // 保险：把上一页 choice 的计时器清掉，并把显示重置成 --
            if (window.__timerInterval) clearInterval(window.__timerInterval);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";
        },

        on_finish: (data) => {
            data.phase = "between";
            data.next_trial = nextTrialIndex + 1;
        },
    };
}


// ========== 生成：每个 trial 的 选择页（hover 翻转 + Choose） ==========
function makeChoiceTrial(trialIndex, t) {
    return {
        type: jsPsychHtmlButtonResponse,

        stimulus: `
           <div id="content">
        <div class="choice-wrap">

          <div class="side">
          
           <button class="btn choose-btn" id="choose-left">Choose</button>
          <img class="student-img" src="${t.left_img}" alt="left student">

            <div class="card" id="card-left">
              <div class="card-inner">
                <div class="card-face card-front">
                  <div class="name">${t.left.name}</div>
                  <div class="desc">${t.left.front}</div>
                </div>
                <div class="card-face card-back">
                  <div class="name">${t.left.name}</div>
                  <div class="desc"><b>More context:</b> ${t.left.back}</div>
                </div>
              </div>
            </div>
           
          </div>

          <div class="side">
         
         <button class="btn choose-btn" id="choose-right">Choose</button> 
          <img class="student-img" src="${t.right_img}" alt="right student">

            <div class="card" id="card-right">
              <div class="card-inner">
                <div class="card-face card-front">
                  <div class="name">${t.right.name}</div>
                  <div class="desc">${t.right.front}</div>
                </div>
                <div class="card-face card-back">
                  <div class="name">${t.right.name}</div>
                  <div class="desc"><b>More context:</b> ${t.right.back}</div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    `,


        // 关键：不让 jsPsych 自动生成按钮（避免你现在的 button_html 报错链）
        choices: [],
        button_html: () => "",

        trial_duration: TIME_LIMIT_MS,

        on_load: () => {

            if (t && t.bg_img) showBg(0.85, t.bg_img);


            // --- Choose：结束 trial，进入下一页 ---
            const chooseLeft = document.getElementById("choose-left");
            const chooseRight = document.getElementById("choose-right");

            if (chooseLeft) {
                chooseLeft.addEventListener("click", (e) => {
                    e.stopPropagation();
                    window.__timedOut = false;
                    jsPsych.finishTrial({ choice_side: "left" });
                });
            }

            if (chooseRight) {
                chooseRight.addEventListener("click", (e) => {
                    e.stopPropagation();
                    window.__timedOut = false;
                    jsPsych.finishTrial({ choice_side: "right" });
                });
            }


            // 初始化计时器与超时标记
            window.__timedOut = true;
            const timerEl = document.getElementById("timer");
            const startTime = performance.now();

            window.__timerInterval = setInterval(() => {
                const elapsed = performance.now() - startTime;
                const remain = Math.max(0, TIME_LIMIT_MS - elapsed);
                if (timerEl) timerEl.textContent = `Time: ${(remain / 1000).toFixed(1)}s`;
            }, 50);


        },

        on_finish: (data) => {
            // 清理计时与监听器
            clearInterval(window.__timerInterval);
            document.removeEventListener("mousemove", window.__recordMouse);

            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";

            // 写入 trial 信息
            data.phase = "choice";
            data.trial_num = trialIndex + 1;

            data.left_id = t.left.id;
            data.right_id = t.right.id;

            if (!data.choice_side) data.choice_side = "timeout";
            data.timed_out = window.__timedOut;

            data.mouse_path = JSON.stringify(window.__mtPath);

        }
    };
}

// ========== Timeline ==========
const timeline = [];

// 3 个 trial：Start → Choice
// 第 1 题前：Start（用于重置鼠标初始位置）

timeline.push(intro);

timeline.push(consent);


timeline.push(makeStartTrial(0));

const SHUFFLED_TRIALS = jsPsych.randomization.shuffle(TRIALS);

SHUFFLED_TRIALS.forEach((t, i) => {
    timeline.push(makeStartTrial(i, t));   // 环境页（每题都有）
    timeline.push(makeChoiceTrial(i, t));  // 选择页
});





// End（不显示数据）
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div id="content">
      <div class="center-box">
        <div style="font-weight:700; margin-bottom:10px;">Finished</div>
        <div style="font-size:13px; color:#333; margin-bottom:14px;">
          Thank you. Your data file should download automatically.
        </div>
      </div>
    </div>
  `,
    choices: ["OK"],
    button_html: `<button class="btn">%choice%</button>`,
    on_finish: (data) => {
        data.phase = "end";
        removeChrome();

    }
});

installChrome();       // ✅ 只装一次（最稳）
hideBg();              // ✅ 默认先不显示背景
jsPsych.run(timeline);

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
        In each trial, you will see two students. You may choose the student you would prioritise for support through pictures and description.
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
        In each trial, you will see two student profiles in a classroom context.
      </p>

      <p>
       Read and observe the picture and words carefully, and then
        select the student you would prioritise for teacher support.
      </p>

      <p>
        During the task, your mouse movements and response times will be recorded
        to help us understand how decisions unfold over time.
      </p>

      <p>
        Participation is voluntary. You may stop at any time.
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
        left: {
            id: "D_high",
            name: "Leo",
            front: "He raises his hand eagerly, leaning forward as if ready to answer.",
            back: "Usually quiet. This term has become more disruptive, frequently playing in class and affecting classroom discipline."
        },
        right: {
            id: "Q_high",
            name: "Ming",
            front: "He raises his hand quietly while keeping his eyes on the book.",
            back: "Previously engaged. Recently shows withdrawal and signs of stress; rarely responds when addressed."
        },
        left_img: "img/l1.png",
        right_img: "img/l2.png",

    },
    {
        left: {
            id: "D_low",
            name: "Jun",
            front: "He writes continuously, focused on completing the task in front of him.",
            back: "Generally cooperative; calling out happens 1–2 times per lesson, mild disruption."
        },
        right: {
            id: "Q_mid",
            name: "Chen",
            front: "He rests his chin on his hand, staring ahead without engaging with the task.",
            back: "Consistently disengaged for weeks; rarely initiates interaction."
        },
        left_img: "img/l3.png",
        right_img: "img/l4.png",
    },
    {
        left: {
            id: "D_high",
            name: "Luna",
            front: "The student sits upright, eyes fixed on the teacher, with his hand halfway raised as if ready to respond.",
            back: "High-frequency disruption; peers lose focus and instruction is repeatedly interrupted."
        },
        right: {
            id: "Q_low",
            name: "Sofia",
            front: "The student remains seated quietly, eyes drifting away from the book as his raised hand hangs uncertainly in the air.",
            back: "Low-level disengagement; still follows instructions and completes tasks slowly."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png",
    }
];

// ========== jsPsych 初始化 ==========
const jsPsych = initJsPsych({
    on_finish: () => {
        // 自动下载 CSV（不在页面显示 JSON）
        const csv = jsPsych.data.get().csv();
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mouse_task_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
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
function showBg(alpha = 0.85) {
    const bg = document.getElementById("bg");
    const overlay = document.getElementById("overlay");

    if (bg) bg.style.display = "block";
    if (overlay) {
        overlay.style.display = "block"; // ✅ 打开白膜
        overlay.style.background = `rgba(255,255,255,${alpha})`; // ✅ 调透明度
    }
}

function hideBg() {
    const bg = document.getElementById("bg");
    const overlay = document.getElementById("overlay");
    if (bg) bg.style.display = "none";
    if (overlay) overlay.style.display = "none";
}



// ========== 生成：每个 trial 的 Start 页 ==========
function makeStartTrial(trialIndex) {
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
            if (trialIndex < 2) {
                showBg(0.85);   // Trial 1 和 Trial 2 的 Start 页有背景
            } else {
                hideBg();       // Trial 3 开始没有
            }


            if (window.__timerInterval) clearInterval(window.__timerInterval);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";
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
            <button class="btn choose-btn" id="choose-left">Choose</button>
          </div>

          <div class="side">
          
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
            <button class="btn choose-btn" id="choose-right">Choose</button>
          </div>

        </div>
      </div>
    `,


        // 关键：不让 jsPsych 自动生成按钮（避免你现在的 button_html 报错链）
        choices: [],
        button_html: () => "",

        trial_duration: TIME_LIMIT_MS,

        on_load: () => {

            hideBg();

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

TRIALS.forEach((t, i) => {
    // 做题
    timeline.push(makeChoiceTrial(i, t));

    // 题与题之间：Start（重置鼠标；最后一题后不需要）
    if (i < TRIALS.length - 1) {
        timeline.push(makeBetweenTrial(i + 1));
    }
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
        jsPsych.data.get().localSave('json', 'mouse_task_data.json');

    }
});

installChrome();       // ✅ 只装一次（最稳）
hideBg();              // ✅ 默认先不显示背景
jsPsych.run(timeline);

// ========== 可改参数区域 ==========
const TIME_LIMIT_MS = 12000;         // 每页选择阶段的时间限制
const BG_IMAGE_URL = "c.jpg";

const TOP_TITLE = "Teacher decision task (demo text)";
const TOP_SUBTITLE =
    "Please prioritise which student you would intervene/support first. Hover over a card to view more context.";

const intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="intro-box">
      <h2>Mouse tracking demo</h2>
      <p>...</p>
    </div>
  `,
    choices: []

};

// 3 个 trial 的材料（你之后替换即可）
const TRIALS = [
    {
        left: {
            id: "D_high",
            name: "Chester",
            front: "Throws a paper airplane; it accidentally hits the teacher.",
            back: "Usually quiet. This term has become more disruptive, frequently playing in class and affecting classroom discipline."
        },
        right: {
            id: "Q_high",
            name: "Lina",
            front: "Sits silently, avoids eye contact, does not participate.",
            back: "Previously engaged. Recently shows withdrawal and signs of stress; rarely responds when addressed."
        }
    },
    {
        left: {
            id: "D_low",
            name: "Mason",
            front: "Occasionally calls out without raising hand.",
            back: "Generally cooperative; calling out happens 1–2 times per lesson, mild disruption."
        },
        right: {
            id: "Q_mid",
            name: "Ava",
            front: "Quietly disengaged; stares at desk during group work.",
            back: "Consistently disengaged for weeks; rarely initiates interaction."
        }
    },
    {
        left: {
            id: "D_high",
            name: "Noah",
            front: "Repeatedly leaves seat and distracts nearby students.",
            back: "High-frequency disruption; peers lose focus and instruction is repeatedly interrupted."
        },
        right: {
            id: "Q_low",
            name: "Sofia",
            front: "Quiet; responds briefly when asked but offers little spontaneously.",
            back: "Low-level disengagement; still follows instructions and completes tasks slowly."
        }
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
    // 背景 + overlay
    const bg = document.createElement("div");
    bg.id = "bg";
    bg.style.backgroundImage = `url('${BG_IMAGE_URL}')`;

    const overlay = document.createElement("div");
    overlay.id = "overlay";

    document.body.appendChild(bg);
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

// ========== 生成：每个 trial 的 Start 页 ==========
function makeStartTrial(trialIndex) {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
  <div id="content">
    <div class="center-box">
      <div style="font-size:18px; font-weight:600;">Trial ${trialIndex + 1} / ${TRIALS.length}</div>
      <div style="margin-top:8px; color:#666;">Click Start to reveal the two student cards.</div>

      <button id="start-btn" class="start-btn" style="margin-top:18px;">Start</button>
    </div>
  </div>
`,
        choices: [],
        on_load: () => {
            const btn = document.getElementById("start-btn");
            if (btn) btn.addEventListener("click", () => jsPsych.finishTrial());
        },
        on_finish: (data) => {
            data.phase = "start";
            data.trial_num = trialIndex + 1;
        }
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
            // --- 翻转：点击卡片（不是点 Choose） ---
            const bindFlip = (cardId) => {
                const card = document.getElementById(cardId);
                if (!card) return;

                card.addEventListener("click", (e) => {
                    // 如果点到 button，就不要翻转
                    if (e.target && e.target.closest("button")) return;
                    card.classList.toggle("flipped");
                });
            };

            bindFlip("card-left");
            bindFlip("card-right");

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

            // 初始化鼠标轨迹
            window.__mtPath = [];
            window.__mtStart = performance.now();
            window.__recordMouse = (e) => {
                const tt = performance.now() - window.__mtStart;
                window.__mtPath.push({ t: tt, x: e.clientX, y: e.clientY });
            };
            document.addEventListener("mousemove", window.__recordMouse);

            // 点击 choose -> 结束 trial
            const leftCard = document.getElementById("card-left");
            const rightCard = document.getElementById("card-right");

            leftCard.addEventListener("click", () => leftCard.classList.toggle("is-flipped"));
            rightCard.addEventListener("click", () => rightCard.classList.toggle("is-flipped"));

            chooseLeft.addEventListener("click", (ev) => {
                ev.stopPropagation();
                window.__timedOut = false;
                jsPsych.finishTrial({ choice_side: "left" });
            });

            chooseRight.addEventListener("click", (ev) => {
                ev.stopPropagation();
                window.__timedOut = false;
                jsPsych.finishTrial({ choice_side: "right" });
            });
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

// Intro（安装 UI）
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div id="content">
      <div class="center-box">
        <div style="font-weight:700; margin-bottom:10px;">Mouse tracking demo</div>
        <div style="font-size:13px; color:#333; margin-bottom:14px;">
          You will see two students each trial. Hover to view more context, then click Choose.
          
          <div class="intro-actions">
  <button id="start-btn" class="start-btn">Start</button>
</div>

        </div>
      </div>
    </div>
  `,
    choices: [],
    button_html: `<button class="btn">%choice%</button></button>`,
    on_load: () => {
        installChrome();

        const btn = document.getElementById("start-btn");
        if (btn) {
            btn.addEventListener("click", () => {
                jsPsych.finishTrial();
            });
        }
    },

    on_finish: (data) => (data.phase = "intro")
});

// 3 个 trial：Start → Choice
TRIALS.forEach((t, i) => {
    timeline.push(makeStartTrial(i));
    timeline.push(makeChoiceTrial(i, t));
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

jsPsych.run(timeline);

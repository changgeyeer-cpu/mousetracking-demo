// ========== 可改参数区域 ==========
const TIME_LIMIT_MS = 12000;

const TOP_TITLE = "Teacher decision task";
const TOP_SUBTITLE =
    "Please prioritise which student you would intervene/support first.";

// ========== Intro ==========
const intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="intro-box">
      <h2>Classroom Decision Task</h2>
      <p>
        In this task, you will take the role of a teacher at the beginning of a lesson.
      </p>
      <p>
        There are no right or wrong answers. Please respond as naturally as possible.
      </p>
      <p>
        Your mouse movements will be recorded during the task.
      </p>
    </div>
  `,
    choices: ["Start"]
};

// ========== Consent ==========
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

// ========== 你的 trials（保留你自己的内容） ==========
const TRIALS = [
    {
        trial_id: "A",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",
        left: {
            id: "A_high",
            name: "Student 1",
            front: "He raises his hand eagerly, leaning forward as if ready to answer. Usually quiet. This term has become more disruptive, frequently playing in class and affecting classroom discipline.",
            back: "Usually quiet, but now more disruptive than before."
        },
        right: {
            id: "A_low",
            name: "Student 2",
            front: "He raises his hand quietly while keeping his eyes on the book. Previously engaged. Recently shows withdrawal and signs of stress; rarely responds when addressed.",
            back: "Previously engaged, but now shows withdrawal and stress."
        },
        left_img: "img/l1.png",
        right_img: "img/l2.png"
    },
    {
        trial_id: "B",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",
        left: {
            id: "B_high",
            name: "Student 1",
            front: "He writes continuously, focused on completing the task in front of him. Generally cooperative; calling out happens 1–2 times per lesson, mild disruption.",
            back: "Generally cooperative, with only mild occasional disruption."
        },
        right: {
            id: "B_low",
            name: "Student 2",
            front: "He rests his chin on his hand, staring ahead without engaging with the task. Consistently disengaged for weeks; rarely initiates interaction.",
            back: "Consistently disengaged for weeks."
        },
        left_img: "img/l3.png",
        right_img: "img/l4.png"
    },
    {
        trial_id: "C",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",
        left: {
            id: "C_high",
            name: "Student 1",
            front: "The student sits upright, eyes fixed on the teacher, with his hand halfway raised as if ready to respond. High-frequency disruption; peers lose focus and instruction is repeatedly interrupted.",
            back: "High-frequency disruption affects peers and instruction."
        },
        right: {
            id: "C_low",
            name: "Student 2",
            front: "The student remains seated quietly, eyes drifting away from the book as his raised hand hangs uncertainly in the air. Low-level disengagement; still follows instructions and completes tasks slowly.",
            back: "Low-level disengagement, but still follows instructions."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "D",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",
        left: {
            id: "D_high",
            name: "Student 1",
            front: "During whole-class questioning, the student raises their hand quickly and leans forward to respond.",
            back: "Responds quickly and actively."
        },
        right: {
            id: "D_low",
            name: "Student 2",
            front: "When the teacher asks a question, the student looks at the board and only responds when directly called on.",
            back: "Responds only when called on."
        },
        left_img: "img/l8.png",
        right_img: "img/l4.png"
    },
    {
        trial_id: "E",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",
        left: {
            id: "E_high",
            name: "Student 1",
            front: "During individual work, the student writes steadily and remains focused on the worksheet.",
            back: "Focused throughout the task."
        },
        right: {
            id: "E_low",
            name: "Student 2",
            front: "While working independently, the student pauses often and needs reminders to continue.",
            back: "Needs reminders to stay on task."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "F",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",
        left: {
            id: "F_high",
            name: "Student 1",
            front: "In group activities, the student speaks frequently and takes the lead in discussion.",
            back: "Often leads peer discussion."
        },
        right: {
            id: "F_low",
            name: "Student 2",
            front: "During group work, the student listens to others but rarely contributes ideas.",
            back: "Participates passively."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "G",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",
        left: {
            id: "G_high",
            name: "Student 1",
            front: "When the teacher walks past, the student straightens up and looks back at the task.",
            back: "Re-engages when monitored."
        },
        right: {
            id: "G_low",
            name: "Student 2",
            front: "As the teacher circulates, the student continues working without reacting.",
            back: "Continues steadily without visible change."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "H",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",
        left: {
            id: "H_high",
            name: "Student 1",
            front: "Under time-limited practice, the student completes tasks quickly with little hesitation.",
            back: "Fast and confident under time pressure."
        },
        right: {
            id: "H_low",
            name: "Student 2",
            front: "During timed exercises, the student works slowly and appears unsure about how to proceed.",
            back: "Slow and hesitant under time pressure."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "I",
        bg_img: "img/c11.png",
        audio: "audio/q.mp3",
        left: {
            id: "I_high",
            name: "Student 1",
            front: "During transitions between activities, the student quickly settles and begins the next task.",
            back: "Transitions efficiently."
        },
        right: {
            id: "I_low",
            name: "Student 2",
            front: "When the activity changes, the student remains seated and waits without starting the task.",
            back: "Slow to start after transitions."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    },
    {
        trial_id: "J",
        bg_img: "img/c1.png",
        audio: "audio/n.mp3",
        left: {
            id: "J_high",
            name: "Student 1",
            front: "When working with peers, the student actively exchanges ideas and checks others’ understanding.",
            back: "Actively supports peers."
        },
        right: {
            id: "J_low",
            name: "Student 2",
            front: "In peer activities, the student stays nearby but lets others take over the task.",
            back: "Lets others take over."
        },
        left_img: "img/l6.png",
        right_img: "img/l7.png"
    }
];

// ========== jsPsych 初始化 ==========
const jsPsych = initJsPsych({});

// ========== 工具函数 ==========
function installChrome() {
    const bg = document.createElement("div");
    bg.id = "bg";
    bg.style.backgroundImage = "url('img/c0.png')";
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
    bg.style.display = "none";
    document.body.appendChild(bg);

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "none";
    overlay.style.pointerEvents = "none";
    document.body.appendChild(overlay);

    const topbar = document.createElement("div");
    topbar.id = "topbar";
    topbar.innerHTML = `
    <div class="title">${TOP_TITLE}</div>
    <div class="subtitle">${TOP_SUBTITLE}</div>
  `;
    document.body.appendChild(topbar);

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

// ========== 鼠标轨迹记录 ==========
function startMouseTracking(trialIndex) {
    window.__mtPath = [];
    window.__mtStartTime = performance.now();

    window.__recordMouse = function (e) {
        const x = e.clientX;
        const y = e.clientY;
        const t = performance.now() - window.__mtStartTime;

        window.__mtPath.push({
            trial_num: trialIndex + 1,
            x: Math.round(x),
            y: Math.round(y),
            t: Math.round(t)
        });
    };

    document.addEventListener("mousemove", window.__recordMouse);
}

function stopMouseTracking() {
    if (window.__recordMouse) {
        document.removeEventListener("mousemove", window.__recordMouse);
    }
}

// ========== 每题 Start 页 ==========
function makeStartTrial(trialIndex, t) {
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
            if (t && t.bg_img) {
                showBg(0.85, t.bg_img);
            } else {
                hideBg();
            }

            if (window.__timerInterval) clearInterval(window.__timerInterval);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";

            if (t && t.audio) {
                playAudio(t.audio);
            }
        },
        on_finish: (data) => {
            data.phase = "start";
            data.trial_num = trialIndex + 1;
            data.trial_id = t.trial_id;
            hideBg();
        }
    };
}

// ========== 每题 Choice 页 ==========
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
                  <div class="desc"><b>More context:</b> ${t.left.back || ""}</div>
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
                  <div class="desc"><b>More context:</b> ${t.right.back || ""}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
        choices: [],
        button_html: () => "",
        trial_duration: TIME_LIMIT_MS,

        on_load: () => {
            if (t && t.bg_img) showBg(0.85, t.bg_img);

            window.__timedOut = true;
            startMouseTracking(trialIndex);

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

            const cardLeft = document.getElementById("card-left");
            const cardRight = document.getElementById("card-right");

            if (cardLeft) {
                cardLeft.addEventListener("mouseenter", () => {
                    cardLeft.classList.add("flipped");
                });
                cardLeft.addEventListener("mouseleave", () => {
                    cardLeft.classList.remove("flipped");
                });
            }

            if (cardRight) {
                cardRight.addEventListener("mouseenter", () => {
                    cardRight.classList.add("flipped");
                });
                cardRight.addEventListener("mouseleave", () => {
                    cardRight.classList.remove("flipped");
                });
            }

            const timerEl = document.getElementById("timer");
            const startTime = performance.now();

            window.__timerInterval = setInterval(() => {
                const elapsed = performance.now() - startTime;
                const remain = Math.max(0, TIME_LIMIT_MS - elapsed);
                if (timerEl) timerEl.textContent = `Time: ${(remain / 1000).toFixed(1)}s`;
            }, 50);
        },

        on_finish: (data) => {
            clearInterval(window.__timerInterval);
            stopMouseTracking();

            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "Time: --";

            data.phase = "choice";
            data.trial_num = trialIndex + 1;
            data.trial_id = t.trial_id;

            data.left_id = t.left.id;
            data.right_id = t.right.id;
            data.left_name = t.left.name;
            data.right_name = t.right.name;

            if (!data.choice_side) data.choice_side = "timeout";
            data.timed_out = window.__timedOut;

            data.mouse_path = JSON.stringify(window.__mtPath || []);
        }
    };
}

// ========== 自动结束页 ==========
const autoEndTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div id="content">
      <div class="center-box">
        <div style="font-weight:700; margin-bottom:10px;">Finished</div>
        <div style="font-size:13px; color:#333; margin-bottom:14px;">
          Submitting your responses...
        </div>
      </div>
    </div>
  `,
    choices: [],
    button_html: () => "",
    trial_duration: 1200,
    response_ends_trial: false,
    on_load: () => {
        console.log("autoEndTrial loaded");

        removeChrome();

        const allDataJson = jsPsych.data.get().json();
        const allDataCsv = jsPsych.data.get().csv();

        console.log("data prepared", allDataJson);

        if (typeof jatos !== "undefined" && jatos) {
            console.log("jatos found, submitting...");
            jatos.submitResultData(allDataJson, () => {
                console.log("submit success, ending study...");
                jatos.endStudy();
            });
        } else {
            console.log("jatos not found, downloading csv...");
            const blob = new Blob([allDataCsv], {
                type: "text/csv;charset=utf-8;"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `mouse_task_${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
    },
    on_finish: (data) => {
        data.phase = "end";
    }
};

// ========== Timeline ==========
const timeline = [];
timeline.push(intro);
timeline.push(consent);

const SHUFFLED_TRIALS = jsPsych.randomization.shuffle(TRIALS);

SHUFFLED_TRIALS.forEach((t, i) => {
    timeline.push(makeStartTrial(i, t));
    timeline.push(makeChoiceTrial(i, t));
});

timeline.push(autoEndTrial);

installChrome();
hideBg();
jsPsych.run(timeline);
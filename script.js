document.addEventListener("DOMContentLoaded", () => {

const bg = document.getElementById("bg");
const chapter = document.getElementById("chapter");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const music = document.getElementById("music");
const fade = document.getElementById("fade");

/* 🎧 MUSIC (your track) */
music.src = "https://files.catbox.moe/kpq69l.mp3";
music.loop = true;
music.volume = 0.5;

/* 🌌 SCENE */
function setScene(title, img) {

    fade.style.opacity = 1;

    setTimeout(() => {

        chapter.innerText = title;
        chapter.style.opacity = 1;
        chapter.style.transform = "translateY(0)";

        bg.style.backgroundImage = `url(${img})`;
        bg.style.transform = "scale(1.08)";

        fade.style.opacity = 0;

    }, 600);
}

/* ⌨️ TYPE */
function typeText(text, cb) {

    textBox.innerHTML = "";

    let i = 0;

    function type() {
        if (i < text.length) {
            textBox.innerHTML += text[i];
            i++;
            setTimeout(type, 16);
        } else {
            if (cb) cb();
        }
    }

    type();
}

/* 💬 CHOICES */
function showChoices(list) {

    choicesBox.innerHTML = "";

    list.forEach((c, i) => {

        setTimeout(() => {

            const d = document.createElement("div");
            d.className = "choice";
            d.innerText = c.text;
            d.onclick = c.next;

            choicesBox.appendChild(d);

            setTimeout(() => {
                d.style.opacity = 1;
                d.style.transform = "translateY(0)";
            }, 50);

        }, i * 120);

    });
}

/* 🎮 STORY START (FIXED AUTOPLAY) */
function start() {

    document.addEventListener("click", () => {
        music.play().catch(()=>{});
    }, { once: true });

    setScene("CHAPTER I — YOU OPENED THIS",
    "https://files.catbox.moe/dkf0xz.jpg");

    typeText("Hey…\nIf you opened this, you're in WWM.", () => {

        showChoices([
            { text: "I miss you.", next: ch2 },
            { text: "I just clicked.", next: ch2 }
        ]);

    });
}

/* 🌙 CHAPTERS */

function ch2() {

    setScene("CHAPTER II — OUR CO-OP WORLD",
    "https://files.catbox.moe/svu9i0.jpg");

    typeText("You always come when I call you.\nEven when you say wait.", () => {

        showChoices([
            { text: "Because it’s you.", next: ch3 },
            { text: "It’s just habit.", next: ch3 }
        ]);

    });
}

function ch3() {

    setScene("CHAPTER III — WE DON’T PLAY NORMAL",
    "https://files.catbox.moe/egg71a.jpg");

    typeText("We never really play normal in WWM.", () => {

        showChoices([
            { text: "Our chaos.", next: ch4 },
            { text: "It’s just fun.", next: ch4 }
        ]);

    });
}

function ch4() {

    setScene("CHAPTER IV — I NOTICE YOU",
    "https://files.catbox.moe/yy2rgf.jpg");

    typeText("I notice when you're there.", () => {

        showChoices([
            { text: "I notice you too.", next: end1 },
            { text: "So what?", next: end2 }
        ]);

    });
}

/* 🖤 ENDING */

function end1() {

    setScene("ENDING — STAY IN QUEUE",
    "https://files.catbox.moe/y1t04b.jpg");

    typeText("Good.\nStay in queue with me.", () => {

        showChoices([{ text: "Restart", next: start }]);

    });
}

/* START GAME */
start();

});

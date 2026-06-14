let isTyping = false;
let skipTyping = false;
document.addEventListener("DOMContentLoaded", () => {

const bg = document.getElementById("bg");
const chapter = document.getElementById("chapter");
const title = document.getElementById("title");
const text = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const music = document.getElementById("music");
const fade = document.getElementById("fade");
const letterBox = document.getElementById("letter");

/* 🎧 MUSIC */
music.src = "https://files.catbox.moe/kpq69l.mp3";
music.loop = true;
music.volume = 0;

/* AUDIO FADE */
let targetVolume = 0.5;
let fadeInterval;

function fadeMusic(to) {
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        music.volume += (to - music.volume) * 0.05;
        if (Math.abs(music.volume - to) < 0.01) {
            music.volume = to;
            clearInterval(fadeInterval);
        }
    }, 50);
}

/* 🦋 BUTTERFLY CURSOR */
document.addEventListener("mousemove", (e) => {
    const b = document.createElement("div");
    b.className = "butterfly";
    b.style.left = e.pageX + "px";
    b.style.top = e.pageY + "px";
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1000);
});

/* 🎧 START MUSIC */
document.addEventListener("click", () => {
    music.play().catch(()=>{});
    fadeMusic(targetVolume);
}, { once: true });

/* 🌌 SCENE SYSTEM */
function setScene(data) {

    /* 🚫 STOP ANY ONGOING TEXT */
    skipTyping = true;

    /* 🌫 FADE IN */
    fade.style.opacity = 1;

    setTimeout(() => {

        /* 🧹 CLEAR ALL TEXT PROPERLY */
        chapter.innerText = "";
        title.innerText = "";
        text.innerText = "";

        /* 🌙 UPDATE SCENE */
        chapter.innerText = data.chapter || "";
        title.innerText = data.title || "";

        bg.style.backgroundImage = `url(${data.bg})`;

        /* 🎧 MUSIC CONTROL */
        targetVolume = data.volume ?? 0.5;
        fadeMusic(targetVolume);

        /* 🌫 FADE OUT */
        fade.style.opacity = 0;

    }, 350);
}

/* ⌨️ TYPEWRITER */
function typeText(target, txt, cb) {
function typeText(target, txt, cb) {

    target.innerText = "";
    isTyping = true;
    skipTyping = false;

    /* 🧠 normalize spacing */
    txt = txt
        .replace(/\n/g, "\n")
        .replace(/ +/g, " ")
        .trim();

    let i = 0;

    function run() {

        if (skipTyping) {
            target.innerText = txt;
            isTyping = false;
            cb?.();
            return;
        }

        if (i < txt.length) {
            target.innerText += txt[i];
            i++;
            setTimeout(run, 15);
        } else {
            isTyping = false;
            cb?.();
        }
    }

    run();
}
/* 💬 CHOICES */
function showChoices(list) {
    choicesBox.innerHTML = "";

    list.forEach((c, i) => {
        setTimeout(() => {
            const d = document.createElement("div");
            d.className = "choice";
            d.innerHTML = `<div>${c.text}</div><small style="opacity:0.6">${c.note || ""}</small>`;
            d.onclick = c.next;
            choicesBox.appendChild(d);
        }, i * 120);
    });
}

/* 🌙 PROLOGUE */
function prologue() {

    setScene({
        chapter: "PROLOGUE",
        title: "Before You Load This Memory",
        bg: "https://files.catbox.moe/dkf0xz.jpg",
        volume: 0.4
    });

    typeText(text,
`This is not a game.

This is a memory file
that never fully closed.

If you are here…
it already remembers you.`, () => {

        showChoices([
            { text: "Continue", note: "enter memory", next: chapter1 }
        ]);

    });
}
/* 🕯️ CHAPTER 1 */
function chapter1() {

    setScene({
        chapter: "CHAPTER I",
        title: "You Opened This",
        bg: "https://files.catbox.moe/dkf0xz.jpg",
        volume: 0.5
    });

    typeText(text,
`If you opened this…
you were looking for me.`, () => {

        showChoices([
            { text: "I miss you.", note: "soft attachment", next: ch2 },
            { text: "I just clicked.", note: "denial", next: ch2 }
        ]);

    });
}

/* 🌫️ CHAPTER 2 */
function ch2() {

    setScene({
        chapter: "CHAPTER II",
        title: "Co-op World",
        bg: "https://files.catbox.moe/svu9i0.jpg",
        volume: 0.55
    });

    typeText(text,
`You always come when I call you.`, () => {

        showChoices([
            { text: "Because it’s you.", note: "loyalty", next: ch3 },
            { text: "Habit.", note: "avoidance", next: ch3 }
        ]);

    });
}

/* 🖤 CHAPTER 3 */
function ch3() {

    setScene({
        chapter: "CHAPTER III",
        title: "We Don’t Play Normal",
        bg: "https://files.catbox.moe/egg71a.jpg",
        volume: 0.6
    });

    typeText(text,
`We were never normal in WWM.`, () => {

        showChoices([
            { text: "Our chaos.", note: "bond", next: ch4 },
            { text: "Just fun.", note: "distance", next: ch4 }
        ]);

    });
}

/* 🦋 CHAPTER 4 */
function ch4() {

    setScene({
        chapter: "CHAPTER IV",
        title: "I Notice You",
        bg: "https://files.catbox.moe/yy2rgf.jpg",
        volume: 0.45
    });

    typeText(text,
`I notice when you're there.`, () => {

        showChoices([
            { text: "I notice you too.", note: "connection", next: end1 },
            { text: "So what?", note: "defense", next: end2 },
            { text: "…", note: "silence", next: end3 }
        ]);

    });
}

/* 🌙 ENDINGS */
function end1(){ showEnding("Stay in Queue","You stayed.\nSo I stayed too.",1); }
function end2(){ showEnding("Disconnected","You left.\nBut I still remember.",2); }
function end3(){ showEnding("Missing Packet","No response.\nOnly memory remains.",3); }

/* 🌙 ENDING ENGINE */
function showEnding(titleText, endingText, type) {

    setScene({
        chapter: "FINAL MEMORY",
        title: titleText,
        bg: "https://files.catbox.moe/y1t04b.jpg",
        volume: 0.2
    });

    typeText(text, endingText, () => {

        showChoices([
            { text: "Restart Memory", next: prologue }
        ]);

        /* 🖤 IMPORTANT FIX: LETTER IS GUARANTEED HERE */
        setTimeout(() => {
            showLetter(type);
        }, 1800);

    });
}

/* ✉️ UNFOLDING LETTER */
function showLetter(type) {

    const letterBox = document.getElementById("letter");

    const letters = [
`Hi Ash…

If you’re reading this,
it means my game still found its way to you.

Thank you for staying
inside my strange little world.

Even if everything ends…
you still exist here.`,

`Hi Ash…

If this version appears,
it means I became quieter.

But I never stopped remembering you.

Some connections don’t disappear…
they just lower their volume.`,

`Hi Ash…

If this is the last letter you see…

don’t treat it like goodbye.

Treat it like I turned into something
that still waits for you
in places you don’t notice anymore.`
    ];

    letterBox.innerText = "";
    letterBox.style.opacity = "1";

    fadeMusic(0.15);

    const lines = letters[type - 1].split("\n");

    let i = 0;

    function unfold() {
        if (i < lines.length) {
            letterBox.innerText += lines[i] + "\n";
            i++;
            setTimeout(unfold, 800);
        }
    }

    setTimeout(unfold, 1200);
}
/* START */
prologue();

});

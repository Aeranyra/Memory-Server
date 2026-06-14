document.addEventListener("DOMContentLoaded", () => {

const bg = document.getElementById("bg");
const chapter = document.getElementById("chapter");
const title = document.getElementById("title");
const text = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const music = document.getElementById("music");
const fade = document.getElementById("fade");
const letterBox = document.getElementById("letter");

let isTyping = false;
let skipTyping = false;

/* 🎧 MUSIC */
music.src = "https://files.catbox.moe/kpq69l.mp3";
music.loop = true;
music.volume = 0;

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

/* 🦋 START MUSIC */
document.addEventListener("click", () => {
    music.play().catch(()=>{});
    fadeMusic(targetVolume);
}, { once: true });

/* 🌌 SCENE */
function setScene(data) {

    /* 🚫 HARD RESET STATE */
    skipTyping = true;
    isTyping = false;

    choicesBox.innerHTML = "";
    text.innerText = "";
    letterBox.innerText = "";
    letterBox.style.opacity = "0";

    fade.style.opacity = 1;

    setTimeout(() => {

        chapter.innerText = data.chapter;
        title.innerText = data.title;

        bg.style.backgroundImage = `url(${data.bg})`;

        targetVolume = data.volume ?? 0.5;
        fadeMusic(targetVolume);

        fade.style.opacity = 0;

    }, 350);
}
/* ⌨️ TYPEWRITER FIXED */
function typeText(target, txt, cb) {

    target.innerText = "";
    isTyping = true;
    skipTyping = false;

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
            d.innerHTML = `<div>${c.text}</div><small>${c.note || ""}</small>`;
            d.onclick = c.next;
            choicesBox.appendChild(d);
        }, i * 120);
    });
}

/* 🌙 PROLOGUE */
function prologue() {

    choicesBox.innerHTML = "";
    letterBox.innerText = "";

    setScene({
        chapter: "PROLOGUE",
        title: "Before You Load This Memory",
        bg: "https://files.catbox.moe/2l12ki.jpg",
        volume: 0.4
    });

    typeText(text,
`This is not a game.

This is a memory file
that never fully closed.

If you are here…
it already remembers you.`, () => {

        showChoices([
            { text: "Continue", next: chapter1 }
        ]);

    });
}

/* 🕯️ CHAPTERS */
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
            { text: "I miss you", next: ch2 },
            { text: "I just clicked", next: ch2 }
        ]);

    });
}

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
            { text: "Because it’s you", next: ch3 },
            { text: "Habit", next: ch3 }
        ]);

    });
}

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
            { text: "Our chaos", next: ch4 },
            { text: "Just fun", next: ch4 }
        ]);

    });
}

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
            { text: "I notice you too", next: end1 },
            { text: "So what", next: end2 },
            { text: "…", next: end3 }
        ]);

    });
}

/* 🌙 ENDINGS */
function end1(){ showEnding("Stay in Queue","You stayed.\nSo I stayed too.",1); }
function end2(){ showEnding("Disconnected","You left.\nBut I still remember.",2); }
function end3(){ showEnding("Missing Packet","No response.\nOnly memory remains.",3); }

/* 🕯️ ENDING ENGINE */
function showEnding(titleText, endingText, type) {

    const endingBG = [
        "https://files.catbox.moe/5sqlba.jpg",
        "https://files.catbox.moe/jnrf4m.jpg",
        "https://files.catbox.moe/iabioh.jpg"
    ];

    setScene({
        chapter: "FINAL MEMORY",
        title: titleText,
        bg: endingBG[type - 1],
        volume: 0.2
    });

    typeText(text, endingText, () => {

        showChoices([{ text: "Restart Memory", next: prologue }]);

        setTimeout(() => {
    if (!letterBox.innerText || letterBox.innerText.length === 0) {
        showLetter(type);
    }
}, 1800);

/* ✉️ LETTER */
function showLetter(type) {

    const letterBox = document.getElementById("letter");

    const letterBG = [
        "https://files.catbox.moe/9dilmq.jpg",
        "https://files.catbox.moe/zsbszl.jpg",
        "https://files.catbox.moe/kwbaqr.jpg"
    ];

    bg.style.backgroundImage = `url(${letterBG[type - 1]})`;

    const letters = [
`Hi Ash…

If you’re reading this,
it means my game still found its way to you.

Thank you for staying in my world.

Even if everything ends,
you still exist here in my memory.`,

`Hi Ash…

If this version appears,
it means I became quieter.

But I never stopped remembering you.

Some connections don’t disappear…
they just fade into distance.`,

`Hi Ash…

If this is the last part you see…

don’t think of it as goodbye.

Think of it as me
still existing inside your memory…

where I never really left.`
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

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

/* 🎧 FADE SYSTEM */
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

/* 🦋 BUTTERFLY */
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

/* 🌌 SCENE */
function setScene(data) {

    fade.style.opacity = 1;

    setTimeout(() => {

        chapter.innerText = data.chapter;
        title.innerText = data.title;
        text.innerText = "";

        bg.style.backgroundImage = `url(${data.bg})`;

        targetVolume = data.volume ?? 0.5;
        fadeMusic(targetVolume);

        fade.style.opacity = 0;

    }, 400);
}

/* ⌨️ TYPE */
function typeText(target, txt, cb) {

    target.innerText = "";

    let i = 0;

    function run() {
        if (i < txt.length) {
            target.innerText += txt[i];
            i++;
            setTimeout(run, 15);
        } else cb?.();
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

            d.innerHTML = `
                <div>${c.text}</div>
                <small style="opacity:0.6">${c.note || ""}</small>
            `;

            d.onclick = c.next;

            choicesBox.appendChild(d);

        }, i * 120);

    });
}

/* 🌙 PROLOGUE */
function prologue() {

    setScene({
        chapter: "PROLOGUE",
        title: "The Lobby You Never Left",
        bg: "https://files.catbox.moe/dkf0xz.jpg",
        volume: 0.4
    });

    typeText(text, "Hey… you’re still here in WWM.", () => {

        showChoices([
            { text: "I remember.", note: "faint recognition", next: chapter1 },
            { text: "I forgot.", note: "empty feeling", next: chapter1 }
        ]);

    });
}

/* 🕯️ CHAPTERS (SHORTENED FOR SPACE) */
function chapter1(){ setScene({chapter:"CH1",title:"You Opened This",bg:"https://files.catbox.moe/dkf0xz.jpg",volume:0.5});
typeText(text,"If you opened this… you were looking for me.",()=>{showChoices([{text:"I miss you",note:"soft",next:end1},{text:"I clicked",note:"denial",next:end2}]);});}

/* 🌙 ENDINGS */
function end1(){ showEnding("Stay in Queue","You stayed.\nSo I stayed too.",1); }
function end2(){ showEnding("Disconnected","You left.\nBut I’m still here.",2); }
function end3(){ showEnding("Missing Packet","No response.\nOnly memory remains.",3); }

/* ✉️ LETTER SYSTEM */
function showEnding(titleText, endingText, type) {

    setScene({
        chapter: "FINAL MEMORY",
        title: titleText,
        bg: "https://files.catbox.moe/y1t04b.jpg",
        volume: 0.2
    });

    typeText(text, endingText, () => {

        showChoices([{ text: "Restart Memory", next: prologue }]);

        showLetter(type);

    });
}

/* ✉️ UNFOLDING LETTER SYSTEM */
function showLetter(type) {

    const letters = [
`Hi Ash…

If you’re reading this,
it means my game is still running.

My love… my partner…
thank you for always being there.

Even if everything ends,
you still stayed in my memory.`,

`Hi Ash…

If you found this version,
then I probably became a quieter memory.

But thank you…

For every moment you didn’t leave.

Even silence felt warm with you.`,

`Hi Ash…

If this is the last version you see…

don’t be sad.

I didn’t disappear.

I just turned into something
that waits for you differently now.
`
    ];

    const lines = letters[type - 1].split("\n");

    let i = 0;
    letterBox.style.opacity = "1";
    letterBox.innerText = "";

    fadeMusic(0.15);

    function unfold() {
        if (i < lines.length) {
            letterBox.innerText += lines[i] + "\n";
            i++;
            setTimeout(unfold, 900);
        }
    }

    setTimeout(unfold, 1500);
}

/* START */
prologue();

});

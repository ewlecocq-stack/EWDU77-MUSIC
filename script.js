
/* =====================================
   EWDU77 MUSIC V4
   MULTI AUDIO PLAYER
===================================== */

const players = document.querySelectorAll(".custom-player");

players.forEach(player => {

    const music = player.querySelector("audio");
    const playBtn = player.querySelector(".play-btn");
    const progress = player.querySelector(".progress");
    const time = player.querySelector(".time");
    const volume = player.querySelector(".volume");


    // FORMATAGE DU TEMPS

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${minutes}:${String(secs).padStart(2, "0")}`;
    }


    // MISE À JOUR DU LECTEUR

    function updatePlayer() {

        const duration = music.duration;

        if (!Number.isFinite(duration) || duration <= 0) {
            return;
        }

        const percent =
            (music.currentTime / duration) * 100;

        progress.value = percent;

        progress.style.background = `
            linear-gradient(
                to right,
                #c04aff ${percent}%,
                #392449 ${percent}%
            )
        `;

        time.textContent =
            `${formatTime(music.currentTime)} / ${formatTime(duration)}`;
    }


    // PLAY / PAUSE

    playBtn.addEventListener("click", async () => {

        if (music.paused) {

            // Arrêter les autres morceaux
            document.querySelectorAll(".custom-player audio")
                .forEach(other => {

                    if (other !== music) {
                        other.pause();
                    }

                });

            try {

                await music.play();

            } catch (error) {

                console.error(
                    "Impossible de lire cette musique :",
                    error
                );

            }

        } else {

            music.pause();

        }

    });


    // ÉTAT DU BOUTON

    music.addEventListener("play", () => {

        playBtn.textContent = "Ⅱ";
        playBtn.setAttribute("aria-label", "Pause");

    });

    music.addEventListener("pause", () => {

        playBtn.textContent = "▶";
        playBtn.setAttribute("aria-label", "Lire");

    });


    // BARRE DE PROGRESSION

    music.addEventListener("timeupdate", updatePlayer);
    music.addEventListener("loadedmetadata", updatePlayer);
    music.addEventListener("durationchange", updatePlayer);

    progress.addEventListener("input", () => {

        if (
            Number.isFinite(music.duration) &&
            music.duration > 0
        ) {

            music.currentTime =
                (Number(progress.value) / 100) * music.duration;

            updatePlayer();

        }

    });


    // VOLUME

    volume.addEventListener("input", () => {

        music.volume = Number(volume.value);

    });

    music.volume = 0.7;


    // FIN DE MUSIQUE

    music.addEventListener("ended", () => {

        playBtn.textContent = "▶";
        playBtn.setAttribute("aria-label", "Lire");

        progress.value = 0;

        updatePlayer();

    });


    // ERREURS AUDIO

    music.addEventListener("error", () => {

        console.error(
            "Fichier audio introuvable ou illisible :",
            music.currentSrc
        );

    });

});


// ANIMATIONS AU DÉFILEMENT

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});


document.querySelectorAll(
    ".music-card, .artist"
).forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


console.log("⚡ EWDU77 MUSIC V4 INITIALISÉ");
console.log("🎵 3 morceaux chargés dans la discographie");

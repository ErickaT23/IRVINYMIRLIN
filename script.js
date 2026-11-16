document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audioPlayer") || document.getElementById("musica");
    var progressBar = document.getElementById("progress-bar");
    var currentTimeDisplay = document.getElementById("current-time");
    var durationTimeDisplay = document.getElementById("duration-time");

    var modal = document.getElementById('photo-modal');
    var seal = document.getElementById("seal");
    let currentSlide = 0;   
    const wishes = [];

    // Función para abrir el sobre y reproducir la música
    function openEnvelopeAndPlayMusic() {
        var envelopeTop = document.getElementById("envelope-top");
        var envelopeBottom = document.getElementById("envelope-bottom");
        var envelope = document.getElementById("envelope");
        var invitation = document.getElementById("invitation");
      
        envelopeTop.style.transform = 'translateY(-100vh)';
        envelopeBottom.style.transform = 'translateY(100vh)';
      
        setTimeout(function() {
            envelope.classList.add('hidden');
            invitation.classList.remove('hidden');
        }, 1000);
      
        if (!audio) return;

        audio.play().then(function() {
            updateProgress(); 
        }).catch(function(error) {
            console.log('Playback failed: ', error);
        });
      }
      
      // 👇 Esta línea es la clave:
      window.openEnvelopeAndPlayMusic = openEnvelopeAndPlayMusic;
      

    // ✅ Solo un listener para el sello (corregido)
    seal.addEventListener("click", function(event) {
        event.stopPropagation();
        seal.disabled = true; // evita múltiples clics
        openEnvelopeAndPlayMusic();
    });

    function updateProgress() {
        audio.addEventListener("timeupdate", function() {
            if (!progressBar) return;
            var progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;

            var currentMinutes = Math.floor(audio.currentTime / 60);
            var currentSeconds = Math.floor(audio.currentTime % 60);
            if (currentTimeDisplay) currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

            if (!isNaN(audio.duration)) {
                var durationMinutes = Math.floor(audio.duration / 60);
                var durationSeconds = Math.floor(audio.duration % 60);
                if (durationTimeDisplay) durationTimeDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
            }
        });
    }

    if (progressBar) {
        progressBar.addEventListener("input", function() {
            var newTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });
    }

    const targetDate = new Date('2026-11-28T00:00:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown').textContent = "Gracias por habernos acompañado en este día tan especial.";
        }
    }, 1000);

    // Aparición de textos con scroll
    const elementsToFade = document.querySelectorAll('.fade-in-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        const delay = [...elementsToFade].indexOf(element) * 0.05;
        element.style.transitionDelay = `${delay}s`;
        observer.observe(element);
    });

    // Galería
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('photo-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Optimización visual
    const title = document.querySelector(".title");
    if (title) title.classList.add("visible");

    // Buenos deseos
    function displayWishes() {
        const wishesDiv = document.getElementById('wishes');
        wishesDiv.innerHTML = wishes.map(wish => `<p><strong>${wish.name}:</strong> ${wish.message}</p>`).join('');
    }

    function toggleWishForm() {
        document.getElementById('wish-form').classList.toggle('hidden');
    }

    function toggleWishes() {
        const wishesDiv = document.getElementById('wishes');
        wishesDiv.classList.toggle('hidden');
      }      

      window.toggleWishes = toggleWishes;


    window.changePhoto = function(element) {
        const mainPhoto = document.getElementById('main-photo');
        const modalPhoto = document.getElementById('main-photo-modal');
        const source = element.currentSrc || element.src;

        mainPhoto.src = source;
        modalPhoto.src = source;
        openModal();
    };

    function openModal() {
        document.getElementById('photo-modal').classList.add('is-open');
    }

    function closeModal() {
        document.getElementById('photo-modal').classList.remove('is-open');
    }

    window.toggleDetails = function() {
        var details = document.getElementById("accountDetails");
        details.style.display = (details.style.display === "none" || details.style.display === "") ? "block" : "none";
    }

    if (typeof submitWish === 'function') {
        window.submitWish = submitWish;
    }
    window.toggleWishForm = toggleWishForm;
    window.toggleWishes = toggleWishes;
});
window.toggleDetails = function() {
    var details = document.getElementById("accountDetails");
    details.style.display = (details.style.display === "none" || details.style.display === "") 
        ? "block" 
        : "none";
}

window.abrirConfirmacion = function () {
    const form = document.getElementById("rsvp-form");
    const field = document.getElementById("rsvp-passes-field");
    const input = document.getElementById("rsvp-passes");
    const guest = window.currentGuest;
    if (!form || !guest) return;
    form.classList.remove("hidden");
    const hasAssignedPasses = Number.isInteger(guest.passes);
    if (hasAssignedPasses) {
        input.max = guest.passes;
        input.value = guest.passes;
    } else {
        input.removeAttribute("max");
        input.value = "";
        field.hidden = true;
    }
    document.querySelectorAll('input[name="rsvp-response"]').forEach(radio => {
        radio.onchange = () => {
            field.hidden = radio.value === "no_asistira" || !hasAssignedPasses;
            input.required = radio.value !== "no_asistira" && hasAssignedPasses;
        };
    });
};

window.enviarConfirmacion = async function () {
    const guest = window.currentGuest;
    const response = document.querySelector('input[name="rsvp-response"]:checked')?.value;
    const input = document.getElementById("rsvp-passes");
    const hasAssignedPasses = Number.isInteger(guest?.passes);
    const cantidad = response !== "confirmado" ? null : hasAssignedPasses ? Number(input.value) : "Libre";
    if (!guest || !response || (response === "confirmado" && hasAssignedPasses && (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > guest.passes))) {
        alert("Ingresa una cantidad válida de asistentes.");
        return;
    }
    const rsvp = { id: guest.id, nombre: guest.name, respuesta: response, cantidad, fecha: new Date().toISOString() };
    try {
        if (window.EventDatabase?.saveEventData) await window.EventDatabase.saveEventData("rsvp", guest.id, rsvp);
    } catch (error) {
        console.error("Error al guardar la confirmación:", error);
        alert("No se pudo guardar la confirmación. Intenta nuevamente.");
        return;
    }
    const texto = response === "confirmado"
        ? hasAssignedPasses
            ? `Hola, soy ${guest.name} y confirmo mi asistencia a la boda de Irvin Godoy y Mirlin Quiñónez. Seremos ${cantidad} ${cantidad === 1 ? "persona" : "personas"}.`
            : `Hola, soy ${guest.name} y confirmo mi asistencia a la boda de Irvin Godoy y Mirlin Quiñónez.`
        : `Hola, soy ${guest.name} y no podré asistir a la boda de Irvin Godoy y Mirlin Quiñónez.`;
    window.location.href = `https://wa.me/50250044845?text=${encodeURIComponent(texto)}`;
};
  

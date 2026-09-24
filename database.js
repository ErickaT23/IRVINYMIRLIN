// Importar Firebase y Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, get, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Configuración Firebase (reemplaza con la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyAqOZQ5YFOdhL6dblHI5wIx10m6n4xt2Fg",
  authDomain: "buenosdeseos-twodesign.firebaseapp.com",
  databaseURL: "https://buenosdeseos-twodesign-default-rtdb.firebaseio.com",
  projectId: "buenosdeseos-twodesign",
  storageBucket: "buenosdeseos-twodesign.firebasestorage.app",
  messagingSenderId: "577908051871",
  appId: "1:577908051871:web:27fbd4e06b3d18da14b7aa"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const eventId = window.eventConfig?.eventId || "irvinymirlin2026";
const eventPath = (section) => `eventos/${eventId}/${section}`;

console.log("✅ Firebase conectado correctamente!");

// Función para enviar un buen deseo
window.submitWish = function () {
  const name = document.getElementById("wish-name").value.trim();
  const message = document.getElementById("wish-message").value.trim();

  if (name !== "" && message !== "") {
    push(ref(db, eventPath("deseos")), {
      nombre: name,
      mensaje: message,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert("¡Tu buen deseo ha sido enviado! 🌟");
      document.getElementById("wish-name").value = "";
      document.getElementById("wish-message").value = "";

      // Ocultar formulario
      document.getElementById('wish-form').classList.add('hidden');

      // Mostrar lista de deseos y actualizarla
      const wishesDiv = document.getElementById('wishes');
      if (wishesDiv.classList.contains('hidden')) {
          wishesDiv.classList.remove('hidden');
      }
      cargarDeseos();
    })
    .catch((error) => {
      console.error("Error al guardar el deseo:", error);
    });
  } else {
    alert("Por favor, completa ambos campos antes de enviar.");
  }
};

// Función para cargar y mostrar los buenos deseos desde Firebase
function cargarDeseos() {
  const wishesDiv = document.getElementById('wishes');
  const wishesRef = ref(db, eventPath("deseos"));

  onValue(wishesRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      wishesDiv.innerHTML = "<p>No hay deseos aún. Sé el primero 💌</p>";
      return;
    }
    const arrayWishes = Object.values(data).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    wishesDiv.innerHTML = arrayWishes.map(wish => `
      <p><strong>${wish.nombre}:</strong> ${wish.mensaje}</p>
    `).join('');
  });
}

// Exponer cargarDeseos globalmente para usar desde HTML u otros scripts
window.cargarDeseos = cargarDeseos;

export async function getEventData(section) {
  const snapshot = await get(ref(db, eventPath(section)));
  return snapshot.exists() ? snapshot.val() : {};
}

export async function saveEventData(section, id, data) {
  await set(ref(db, `${eventPath(section)}/${id}`), data);
}

window.EventDatabase = { getEventData, saveEventData, eventId };

// Funciones para mostrar/ocultar formulario y lista
window.toggleWishForm = function() {
  const form = document.getElementById('wish-form');
  form.classList.toggle('hidden');
};

window.toggleWishes = function() {
  const wishesDiv = document.getElementById('wishes');
  wishesDiv.classList.toggle('hidden');
};

// Cargar deseos automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarDeseos();
});

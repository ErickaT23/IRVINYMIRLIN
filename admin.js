import { getEventData, saveEventData } from "./database.js";

const list = document.getElementById("guests");
const status = document.getElementById("status");
const render = async () => {
  const guests = await getEventData("invitados");
  const rsvp = await getEventData("rsvp");
  list.innerHTML = Object.values(guests).filter(Boolean).map(g => {
    const response = rsvp[g.id];
    return `<li>${g.nombre} (${g.pases ?? "Libre"}) · ${response?.respuesta || "Pendiente"} · Confirmados: ${response?.cantidad ?? "-"}</li>`;
  }).join("");
};
document.getElementById("guest-form").addEventListener("submit", async event => {
  event.preventDefault();
  await saveEventData("invitados", document.getElementById("guest-id").value.trim(), {
    id: document.getElementById("guest-id").value.trim(), nombre: document.getElementById("guest-name").value.trim(), pases: document.getElementById("guest-passes").value ? Number(document.getElementById("guest-passes").value) : null, activo: true
  });
  status.textContent = "Invitado guardado.";
  event.target.reset();
  await render();
});
render();

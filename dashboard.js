import { getEventData } from "./database.js";

const guests = await getEventData("invitados");
const rsvp = await getEventData("rsvp");
const rows = Object.values(guests).filter(Boolean);
const entries = rows.map(guest => ({ guest, response: rsvp[guest.id] }));
const confirmed = entries.filter(entry => entry.response?.respuesta === "confirmado");
const declined = entries.filter(entry => entry.response?.respuesta === "no_asistira");
const pending = entries.length - confirmed.length - declined.length;
const attendeeCount = confirmed.reduce((total, entry) => total + (Number.isInteger(entry.response?.cantidad) ? entry.response.cantidad : 0), 0);

document.getElementById("total-guests").textContent = rows.length;
document.getElementById("confirmed-count").textContent = confirmed.length;
document.getElementById("attendee-count").textContent = attendeeCount || "Libre";
document.getElementById("pending-count").textContent = pending;
document.getElementById("summary").textContent = `${rows.length} invitados · ${confirmed.length} confirmaciones recibidas`;

const table = document.getElementById("rows");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");

function statusLabel(status) {
  return status === "confirmado" ? "Confirmado" : status === "no_asistira" ? "No asistirá" : "Pendiente";
}

function render() {
  const query = search.value.trim().toLowerCase();
  const filter = statusFilter.value;
  const filtered = entries.filter(({ guest, response }) => {
    const status = response?.respuesta || "pendiente";
    return guest.nombre.toLowerCase().includes(query) && (filter === "todos" || status === filter);
  });
  empty.hidden = filtered.length > 0;
  table.innerHTML = filtered.map(({ guest, response }) => {
    const status = response?.respuesta || "pendiente";
    return `<tr><td>${guest.nombre}</td><td>${guest.pases ?? "Libre"}</td><td><span class="status ${status}">${statusLabel(status)}</span></td><td>${response?.cantidad ?? "-"}</td></tr>`;
  }).join("");
}

search.addEventListener("input", render);
statusFilter.addEventListener("change", render);
render();

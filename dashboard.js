import { getEventData } from "./database.js";

const guests = await getEventData("invitados");
const rsvp = await getEventData("rsvp");
const rows = Object.values(guests).filter(Boolean);
const entries = rows.map(guest => ({ guest, response: rsvp[guest.id] }));
const confirmed = entries.filter(entry => entry.response?.respuesta === "confirmado");
const declined = entries.filter(entry => entry.response?.respuesta === "no_asistira");
const pending = entries.length - confirmed.length - declined.length;
const withPasses = entry => Number.isInteger(entry.guest.pases);
const attendeeCount = confirmed.filter(withPasses).reduce((total, entry) => total + entry.response.cantidad, 0);
const freeConfirmedCount = confirmed.filter(entry => !withPasses(entry)).length;
const declinedPassCount = declined.filter(withPasses).length;
const declinedFreeCount = declined.filter(entry => !withPasses(entry)).length;

document.getElementById("total-guests").textContent = rows.length;
document.getElementById("attendee-count").textContent = attendeeCount;
document.getElementById("free-confirmed-count").textContent = freeConfirmedCount;
document.getElementById("pending-count").textContent = pending;
document.getElementById("declined-pass-count").textContent = declinedPassCount;
document.getElementById("declined-free-count").textContent = declinedFreeCount;
document.getElementById("summary").textContent = `${rows.length} invitaciones · ${confirmed.length} confirmaciones recibidas`;

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
    const confirmedAmount = response?.cantidad ?? "-";
    return `<tr><td>${guest.nombre}</td><td>${guest.pases ?? "Libre"}</td><td><span class="status ${status}">${statusLabel(status)}</span></td><td>${confirmedAmount}</td></tr>`;
  }).join("");
}

search.addEventListener("input", render);
statusFilter.addEventListener("change", render);
render();

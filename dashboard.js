import { getEventData } from "./database.js";

const guests = await getEventData("invitados");
const rsvp = await getEventData("rsvp");
const rows = Object.values(guests).filter(Boolean);
document.getElementById("summary").textContent = `Invitados: ${rows.length} · Confirmaciones: ${Object.keys(rsvp).length}`;
document.getElementById("rows").innerHTML = rows.map(guest => {
  const response = rsvp[guest.id];
  return `<tr><td>${guest.nombre}</td><td>${guest.pases ?? "Libre"}</td><td>${response?.respuesta || "Pendiente"}</td><td>${response?.cantidad ?? "-"}</td></tr>`;
}).join("");

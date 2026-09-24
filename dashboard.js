import { getEventData } from "./database.js";

const guests = await getEventData("invitados");
const rsvp = await getEventData("rsvp");
const rows = Object.values(guests);
document.getElementById("summary").textContent = `Invitados: ${rows.length} · Confirmaciones: ${Object.keys(rsvp).length}`;
document.getElementById("rows").innerHTML = rows.map(guest => `<tr><td>${guest.nombre}</td><td>${guest.pases}</td><td>${rsvp[guest.id]?.respuesta || "Pendiente"}</td></tr>`).join("");

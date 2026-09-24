import { getEventData, saveEventData } from "./database.js";

const list = document.getElementById("guests");
const status = document.getElementById("status");
const render = async () => {
  const guests = await getEventData("invitados");
  list.innerHTML = Object.values(guests).map(g => `<li>${g.nombre} (${g.pases} pases)</li>`).join("");
};
document.getElementById("guest-form").addEventListener("submit", async event => {
  event.preventDefault();
  await saveEventData("invitados", document.getElementById("guest-id").value.trim(), {
    id: document.getElementById("guest-id").value.trim(), nombre: document.getElementById("guest-name").value.trim(), pases: Number(document.getElementById("guest-passes").value), activo: true
  });
  status.textContent = "Invitado guardado.";
  event.target.reset();
  await render();
});
render();

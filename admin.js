import { getEventData, saveEventData } from "./database.js";

const form = document.getElementById("guest-form");
const list = document.getElementById("guests");
const status = document.getElementById("status");
const search = document.getElementById("guest-search");
const cancelButton = document.getElementById("cancel-button");
let guests = {};
let editingId = null;

const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

async function loadGuests() {
  guests = await getEventData("invitados");
  render();
}

function guestRows() {
  return Object.values(guests).filter(Boolean).sort((a, b) => Number(a.id) - Number(b.id));
}

function render() {
  const query = search.value.trim().toLowerCase();
  const rows = guestRows().filter(guest => guest.nombre.toLowerCase().includes(query) || String(guest.id).includes(query));
  const activeCount = guestRows().filter(guest => guest.activo !== false).length;
  document.getElementById("list-summary").textContent = `${guestRows().length} invitados · ${activeCount} activos`;
  list.innerHTML = rows.length ? rows.map(guest => {
    const active = guest.activo !== false;
    return `<article class="guest-row ${active ? "" : "inactive"}"><span class="guest-id">#${escapeHtml(guest.id)}</span><span class="guest-name">${escapeHtml(guest.nombre)}</span><span class="guest-passes">${guest.pases ?? "Libre"}</span><span class="badge ${active ? "active" : "inactive"}">${active ? "Activa" : "Inactiva"}</span><span class="row-actions"><button class="edit-button" data-action="edit" data-id="${escapeHtml(guest.id)}">Editar</button><button class="toggle-button" data-action="toggle" data-id="${escapeHtml(guest.id)}">${active ? "Desactivar" : "Activar"}</button></span></article>`;
  }).join("") : '<p class="empty">No hay invitados que coincidan.</p>';
}

function showStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? "#a15f55" : "";
}

function resetForm() {
  editingId = null;
  form.reset();
  document.getElementById("guest-active").checked = true;
  document.getElementById("form-title").textContent = "Nuevo invitado";
  document.getElementById("save-button").textContent = "Guardar invitado";
  cancelButton.classList.add("hidden");
}

function editGuest(id) {
  const guest = guests[id];
  if (!guest) return;
  editingId = id;
  document.getElementById("guest-id").value = guest.id;
  document.getElementById("guest-name").value = guest.nombre;
  document.getElementById("guest-passes").value = guest.pases ?? "";
  document.getElementById("guest-active").checked = guest.activo !== false;
  document.getElementById("form-title").textContent = "Editar invitado";
  document.getElementById("save-button").textContent = "Actualizar invitado";
  cancelButton.classList.remove("hidden");
  document.getElementById("guest-name").focus();
}

async function toggleGuest(id) {
  const guest = guests[id];
  if (!guest) return;
  await saveEventData("invitados", id, { ...guest, activo: guest.activo === false });
  showStatus(`Invitado ${guest.activo === false ? "activado" : "desactivado"}.`);
  await loadGuests();
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const id = document.getElementById("guest-id").value.trim();
  const nombre = document.getElementById("guest-name").value.trim();
  const passesValue = document.getElementById("guest-passes").value;
  if (!id || !nombre) return;
  if (!editingId && guests[id]) {
    showStatus("Ese ID ya existe. Usa otro o edita el invitado.", true);
    return;
  }
  const data = { id, nombre, pases: passesValue ? Number(passesValue) : null, activo: document.getElementById("guest-active").checked };
  await saveEventData("invitados", id, data);
  showStatus(editingId ? "Invitado actualizado en Firebase." : "Invitado creado en Firebase.");
  resetForm();
  await loadGuests();
});

list.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "edit") editGuest(button.dataset.id);
  if (action === "toggle") toggleGuest(button.dataset.id).catch(error => { console.error(error); showStatus("No se pudo actualizar el estado.", true); });
});

search.addEventListener("input", render);
cancelButton.addEventListener("click", resetForm);
loadGuests().catch(error => { console.error(error); showStatus("No se pudieron cargar los invitados.", true); });

import { getEventData } from "./database.js";

  document.addEventListener("DOMContentLoaded", async function () {
    function getQueryParams() {
      const params = {};
      const queryString = window.location.search.substring(1);
      if (!queryString) return params;

      const pairs = queryString.split("&");
      for (const pair of pairs) {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent((value || "").replace(/\+/g, " "));
      }
      return params;
    }
  
    const queryParams = getQueryParams();
    const guestId = queryParams.id;
  
    const guestData = await getEventData("invitados");
    const guestRecord = Array.isArray(guestData) ? guestData[guestId] : guestData[guestId];
    const guest = guestRecord && {
      id: guestRecord.id || guestId,
      name: guestRecord.nombre,
      passes: Number.isInteger(guestRecord.pases) ? guestRecord.pases : null,
      gender: "mixto"
    };
  
    if (guest) {
      // 👇 DISPONIBLE PARA script.js (WhatsApp, etc.)
      window.currentGuest = guest;
  
      let invitText = "";
  
      if (guest.passes === 1) {
        invitText = guest.gender === "femenino"
          ? `¡${guest.name}, está invitada!`
          : `¡${guest.name}, está invitado!`;
      } else {
        if (guest.gender === "femenino") {
          invitText = `¡${guest.name}, están invitadas!`;
        } else {
          invitText = `¡${guest.name}, están invitados!`;
        }
      }
  
      const guestNameEl = document.getElementById("guest-name");
      const passesEl = document.getElementById("passes");
  
      if (guestNameEl) guestNameEl.textContent = invitText;
       if (passesEl) passesEl.textContent = `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;
       const passesSection = document.querySelector(".invitation-info-section");
       if (passesSection && !Number.isInteger(guest.passes)) passesSection.hidden = true;
    } else {
      window.currentGuest = null;
  
      const guestNameEl = document.getElementById("guest-name");
      if (guestNameEl) guestNameEl.textContent = "¡Invitado no encontrado!";
  
      const section = document.querySelector(".invitation-info-section");
      if (section) section.style.display = "none";
    }
  });

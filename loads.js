const guests = [
    { id: "1", name: "Familia Zepeda Godoy", passes: null, gender: "mixto" },
    { id: "2", name: "Harold Zepeda y esposa", passes: null, gender: "mixto" },
    { id: "3", name: "Elva Consuelo e Hijos", passes: null, gender: "mixto" },
    { id: "4", name: "Jasson Godoy y familia", passes: null, gender: "mixto" },
    { id: "5", name: "Cristofer Godoy y familia", passes: null, gender: "mixto" },
    { id: "6", name: "Amilcar Orantes y esposa", passes: null, gender: "mixto" },
    { id: "7", name: "Marvin Godoy, esposa e hija", passes: null, gender: "mixto" },
    { id: "8", name: "Douglas y Nicolasa", passes: null, gender: "mixto" },
    { id: "9", name: "Luis Godoy e Hijos", passes: null, gender: "mixto" },
    { id: "10", name: "Julieta Escobar e hijos", passes: null, gender: "mixto" },
    { id: "11", name: "Elvia Godoy", passes: null, gender: "mixto" },
    { id: "12", name: "Santos López e hija", passes: null, gender: "mixto" },
    { id: "13", name: "Nixon Mejía y familia", passes: null, gender: "mixto" },
    { id: "14", name: "José Godoy y esposa", passes: null, gender: "mixto" },
    { id: "15", name: "Irma Godoy e hijas", passes: null, gender: "mixto" },
    { id: "16", name: "Armando Carrillo y familia", passes: null, gender: "mixto" },
    { id: "17", name: "Anibal y esposa", passes: null, gender: "mixto" },
    { id: "18", name: "Yojana Godoy y familia", passes: null, gender: "mixto" },
    { id: "19", name: "Familia González Trigueros", passes: null, gender: "mixto" },
    { id: "20", name: "Familia González Revolorio", passes: null, gender: "mixto" },
    { id: "21", name: "Familia González Barrera", passes: null, gender: "mixto" },
    { id: "22", name: "Familia Trigueros Corado", passes: null, gender: "mixto" },
    { id: "23", name: "Familia Revolorio Trigueros", passes: null, gender: "mixto" },
    { id: "24", name: "Familia Revolorio Bernal", passes: null, gender: "mixto" },
    { id: "25", name: "Familia Revolorio Marroquín", passes: null, gender: "mixto" },
    { id: "26", name: "Familia Revolorio Meléndez", passes: null, gender: "mixto" },
    { id: "27", name: "Familia Sandoval Revolorio", passes: null, gender: "mixto" },
    { id: "28", name: "Familia Revolorio Quiñonez", passes: null, gender: "mixto" },
    { id: "29", name: "Familia Najarro Quiñonez", passes: null, gender: "mixto" },
    { id: "30", name: "Familia Quiñonez Rivera", passes: null, gender: "mixto" },
    { id: "31", name: "Familia Quiñonez Trigueros", passes: null, gender: "mixto" },
    { id: "32", name: "Familia Quiñonez Bernal", passes: null, gender: "mixto" },
    { id: "33", name: "Familia Hernández Quiñonez", passes: null, gender: "mixto" },
    { id: "34", name: "Familia Ramírez Quiñonez", passes: null, gender: "mixto" },
    { id: "35", name: "Familia Nájera Quiñonez", passes: null, gender: "mixto" },
    { id: "36", name: "Familia Gómez Trigueros", passes: null, gender: "mixto" },
    { id: "37", name: "Familia Monroy Trigueros", passes: null, gender: "mixto" },
    { id: "38", name: "Familia Gómez Trigueros", passes: null, gender: "mixto" },
    { id: "39", name: "Caterin Bernal y esposa", passes: 2, gender: "mixto" },
    { id: "40", name: "Claudia Ariza", passes: 2, gender: "femenino" },
    { id: "41", name: "Lorena Quiñonez, Fernanda e hija", passes: null, gender: "mixto" },
    { id: "42", name: "Orlando Méndez", passes: 1, gender: "masculino" },
    { id: "43", name: "Mizrain Luhayza", passes: 1, gender: "masculino" },
    { id: "44", name: "Irvin Hernández", passes: 1, gender: "masculino" },
    { id: "45", name: "Leonel Gutiérrez", passes: 1, gender: "masculino" },
    { id: "46", name: "Ledia Barrera y familia", passes: null, gender: "mixto" },
    { id: "47", name: "Josué Yanes", passes: null, gender: "masculino" },
    { id: "48", name: "Osiel Escobar y Maritza Quiñonez", passes: null, gender: "mixto" },
    { id: "49", name: "Hilda Barco", passes: 1, gender: "femenino" },
    { id: "50", name: "Paty Montez", passes: 1, gender: "femenino" },
    { id: "51", name: "Castulo Orantes", passes: 1, gender: "masculino" },
    { id: "52", name: "Michael González", passes: 1, gender: "masculino" },
    { id: "53", name: "Beverly Castro", passes: 1, gender: "femenino" },
    { id: "54", name: "Iliana Aroche", passes: 1, gender: "femenino" },
    { id: "55", name: "Yasmin Barrientos", passes: 1, gender: "femenino" },
    { id: "56", name: "Yuli Quiñonez e hijos", passes: null, gender: "mixto" },
    { id: "57", name: "Rubia Trigueros", passes: null, gender: "femenino" },
    { id: "58", name: "Familia Quiñonez Girón", passes: null, gender: "mixto" },
    { id: "59", name: "Esmeralda Romero", passes: 1, gender: "femenino" },
    { id: "60", name: "Glenda Zepeda", passes: 1, gender: "femenino" },
    { id: "61", name: "Yosmin Mejía y familia", passes: null, gender: "mixto" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
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
  
    const guest = guests.find(g => g.id === guestId);
  
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

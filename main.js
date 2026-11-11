"use strict";

const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Menu mobile : fermer après clic sur un lien interne
const navigation = document.getElementById("navigation");
if (navigation && window.bootstrap) {
  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const menu = bootstrap.Collapse.getInstance(navigation);
      if (menu && navigation.classList.contains("show")) {
        menu.hide();
      }
    });
  });
}

// Bouton retour en haut
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
}

// Formulaire de contact : ouvre un brouillon e-mail au lieu d'envoyer directement
const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      const firstInvalid = contactForm.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const formData = new FormData(contactForm);
    const subject = `Demande de projet — ${formData.get("service")}`;
    const body = [
      `Nom : ${formData.get("nom")}`,
      `E-mail : ${formData.get("email")}`,
      `Téléphone : ${formData.get("telephone") || "Non renseigné"}`,
      `Besoin : ${formData.get("service")}`,
      `Budget indicatif : ${formData.get("budget") || "Non renseigné"}`,
      "",
      "Description du projet :",
      formData.get("message")
    ].join("\n");

    const mailto = `mailto:itastudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNotice) {
      formNotice.textContent = "Un brouillon a été préparé dans votre application e-mail. Vérifiez-le puis envoyez-le.";
    }

    window.location.href = mailto;
  });
}

// Présentation de l'équipe ITA Studio.
const approachSection = document.getElementById("approche");
if (approachSection && !document.getElementById("equipe")) {
  const teamStyles = document.createElement("style");
  teamStyles.textContent = `
    .team-section { background: #fff; }
    .team-grid { max-width: 1080px; margin: 0 auto; }
    .team-card { height: 100%; padding: 1.8rem; background: #fbfaf7; border: 1px solid rgba(24,60,50,.12); transition: transform .2s ease, box-shadow .2s ease; }
    .team-card:hover { transform: translateY(-4px); box-shadow: 0 16px 38px rgba(24,60,50,.1); }
    .team-avatar { display: grid; width: 92px; height: 92px; margin-bottom: 1.35rem; place-items: center; color: #183c32; background: #e5ebe4; border: 3px solid #fff; border-radius: 50%; box-shadow: 0 0 0 1px rgba(24,60,50,.12); font: 800 1.45rem Manrope,sans-serif; }
    .team-role { margin: 0 0 .45rem; color: #c56d4a; font-size: .73rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .team-card h3 { margin: 0 0 .65rem; color: #102b24; font: 700 1.15rem/1.35 Manrope,sans-serif; }
    .team-card__description { margin: 0; color: #647067; font-size: .93rem; }
    @media (prefers-reduced-motion: reduce) { .team-card { transition: none; } }
  `;
  document.head.appendChild(teamStyles);

  const teamMembers = [
    {
      initials: "BT",
      name: "Bindong II Thomas Geovani",
      role: "Architecte · Activités de terrain et suivi de chantier",
      description: "Chargé des activités de terrain et du suivi de chantier."
    },
    {
      initials: "PM",
      name: "Perle Paulette Rose Rita MOUENDOU MAMFOUMBI",
      role: "Architecte · Relations clients et partenaires",
      description: "Chargée des relations avec les clients et les partenaires."
    },
    {
      initials: "LM",
      name: "Luc Réné MOUTNGUI",
      role: "Projets et affaires financières",
      description: "Chargé des projets et responsable des affaires financières."
    }
  ];

  const teamSection = document.createElement("section");
  teamSection.className = "section-padding team-section";
  teamSection.id = "equipe";
  teamSection.setAttribute("aria-labelledby", "team-title");
  teamSection.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Le cabinet</p>
        <h2 class="section-title" id="team-title">Les architectes et responsables du cabinet</h2>
        <p>Les personnes qui accompagnent vos projets, du terrain aux relations avec nos partenaires.</p>
      </div>
      <div class="row g-4 team-grid" id="teamGrid"></div>
    </div>`;

  const teamGrid = teamSection.querySelector("#teamGrid");
  teamMembers.forEach((member) => {
    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";
    const card = document.createElement("article");
    card.className = "team-card";
    card.innerHTML = `
      <div class="team-avatar" aria-hidden="true">${member.initials}</div>
      <p class="team-role">${member.role}</p>
      <h3>${member.name}</h3>
      <p class="team-card__description">${member.description}</p>`;
    column.appendChild(card);
    teamGrid.appendChild(column);
  });

  approachSection.insertAdjacentElement("afterend", teamSection);

  const navList = document.querySelector("#navigation .navbar-nav");
  if (navList && !navList.querySelector('a[href="#equipe"]')) {
    const navItem = document.createElement("li");
    navItem.className = "nav-item";
    navItem.innerHTML = '<a class="nav-link" href="#equipe">L’équipe</a>';
    const servicesItem = navList.querySelector('a[href="#services"]')?.closest("li");
    navList.insertBefore(navItem, servicesItem || navList.firstChild);
    navItem.querySelector("a").addEventListener("click", () => {
      const menu = window.bootstrap?.Collapse.getInstance(navigation);
      if (menu && navigation.classList.contains("show")) menu.hide();
    });
  }
}

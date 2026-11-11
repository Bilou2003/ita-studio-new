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

// Portfolio : photos d'architecture africaine et images du site de référence ITA Studio.
const portfolioImages = [
  {
    src: "https://www.designboom.com/wp-content/dbsub/463737/2026-04-21/david-adjaye-designs-his-new-studio-in-accra-3-69e77fb87524c.jpg",
    alt: "Studio de David Adjaye à Accra, architecture africaine contemporaine",
    category: "Architecture · Accra",
    title: "Le studio d’Accra"
  },
  {
    src: "https://www.designboom.com/wp-content/dbsub/463737/2026-04-21/david-adjaye-designs-his-new-studio-in-accra-11-69e77fb875435.jpg",
    alt: "Autre vue du nouveau studio de David Adjaye à Accra",
    category: "Architecture · Ghana",
    title: "Une autre perspective"
  },
  {
    src: "https://drjnz.github.io/ita-studio/plan5.jpg",
    alt: "Villa contemporaine, image issue du portfolio ITA Studio",
    category: "Résidentiel · ITA Studio",
    title: "Villa contemporaine"
  },
  {
    src: "https://drjnz.github.io/ita-studio/plan6.jpg",
    alt: "Résidence moderne, image issue du portfolio ITA Studio",
    category: "Urbain · ITA Studio",
    title: "Résidence moderne"
  },
  {
    src: "https://drjnz.github.io/ita-studio/plan7.jpg",
    alt: "Espace intérieur contemporain, image issue du portfolio ITA Studio",
    category: "Intérieur · ITA Studio",
    title: "Espace contemporain"
  }
];

const projectGrid = document.querySelector("#projets .row.g-4");
if (projectGrid) {
  const initialCardColumn = projectGrid.querySelector(":scope > [class*='col-']");
  const initialCard = initialCardColumn?.querySelector(".project-card");

  // Duplique la carte modèle pour afficher toutes les images du portfolio.
  while (initialCardColumn && projectGrid.querySelectorAll(".project-card").length < portfolioImages.length) {
    projectGrid.appendChild(initialCardColumn.cloneNode(true));
  }

  projectGrid.querySelectorAll(".project-card").forEach((card, index) => {
    const project = portfolioImages[index];
    const image = card.querySelector("img");
    if (!project || !image) return;

    image.src = project.src;
    image.alt = project.alt;

    const details = card.querySelector(".project-info");
    if (details) {
      const category = details.querySelector("span");
      const title = details.querySelector("h3");
      const description = details.querySelector("p");
      if (category) category.textContent = project.category;
      if (title) title.textContent = project.title;
      if (description) description.textContent = "Inspiration architecturale";
    }
  });
}

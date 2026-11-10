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
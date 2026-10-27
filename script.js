const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu",
    );
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
} // Rendre toute la carte projet cliquable, avec prise en charge du clavier.
document.querySelectorAll(".project-card").forEach((card) => {
  const link = card.querySelector("a.project-open");
  if (!link) return;
  card.tabIndex = 0;
  card.setAttribute("role", "link");
  card.setAttribute(
    "aria-label",
    "Ouvrir la fiche du projet " +
      (card.querySelector("h3")?.textContent.trim() || ""),
  );
  card.classList.add("project-card-clickable");
  card.addEventListener("click", (event) => {
    if (event.target.closest("a,button")) return;
    window.location.href = link.href;
  });
  card.addEventListener("keydown", (event) => {
    if (event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = link.href;
    }
  });
});
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projects.forEach((card) => {
      card.hidden =
        filter !== "all" && !card.dataset.category.split(" ").includes(filter);
    });
  }),
);
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(
      "Contact portfolio - " + data.get("name"),
    );
    const body = encodeURIComponent(
      "Nom : " +
        data.get("name") +
        "\nEmail : " +
        data.get("email") +
        "\n\n" +
        data.get("message"),
    );
    window.location.href =
      "mailto:heehicham2@gmail.com?subject=" + subject + "&body=" + body;
  });
}

const projectDetails = {
  nova: {
    title: "NOVA",
    summary:
      "Application de recherche web développée en Rust, avec interface de recherche, collecte de contenus et organisation des résultats.",
    tags: [
      "Rust",
      "Actix Web",
      "Tera",
      "SQLite",
      "SQLx",
      "Reqwest",
      "Scraper",
      "TF-IDF",
      "SearXNG",
    ],
    tasks: [
      "Mettre en place un serveur web avec Actix Web et des routes HTTP.",
      "Créer les pages avec les templates Tera.",
      "Charger et exploiter des données stockées dans SQLite avec SQLx.",
      "Récupérer et analyser des pages web avec Reqwest et Scraper.",
      "Travailler sur l’indexation et le classement de résultats avec TF-IDF.",
      "Organiser l’interface de recherche et les catégories de résultats.",
    ],
    learning: [
      "Structurer une application en Rust et comprendre le rôle de ses différents composants.",
      "Créer un serveur web avec Actix Web et organiser les routes HTTP.",
      "Utiliser les templates Tera pour construire les pages de l'interface web.",
      "Connecter une application à SQLite avec SQLx et manipuler des données persistantes.",
      "Effectuer des requêtes web avec Reqwest et extraire des informations HTML avec Scraper.",
      "Découvrir le classement des résultats avec TF-IDF et le fonctionnement de SearXNG.",
      "Faire communiquer plusieurs composants techniques dans une même application.",
      "Analyser les erreurs, tester des corrections et améliorer progressivement une application."
    ],
    note: "Cette fiche reprend les éléments connus du projet NOVA. Ajuste chaque tâche selon les fonctions réellement finalisées dans ton dépôt.",
  },
  forum: {
    title: "Forum",
    summary:
      "Application web de forum en Go, avec comptes utilisateurs, publications et contrôle des accès.",
    tags: [
      "Go",
      "net/http",
      "SQLite",
      "HTML",
      "CSS",
      "Sessions",
      "bcrypt",
      "SMTP",
    ],
    tasks: [
      "Créer et organiser les routes HTTP pour les pages et les formulaires.",
      "Enregistrer les utilisateurs et les publications dans SQLite.",
      "Mettre en place la création de compte et la connexion avec vérification du mot de passe.",
      "Gérer les sessions et les cookies d’authentification.",
      "Créer l’affichage des publications, catégories et réactions.",
      "Distinguer les droits d’un visiteur de ceux d’un utilisateur connecté.",
      "Travailler sur la validation des formulaires et le parcours de réinitialisation du mot de passe.",
    ],
    learning: [
      "Construire une application web avec la bibliothèque standard net/http.",
      "Concevoir des tables SQL et faire évoluer une base existante.",
      "Comprendre les sessions, les cookies et les contrôles d’accès.",
      "Ne pas stocker les mots de passe en clair et utiliser le hachage bcrypt.",
      "Relier les formulaires HTML au traitement côté serveur.",
      "Déboguer des erreurs de routes, de base de données et de configuration SMTP.",
    ],
    note: "Les fonctionnalités liées aux e-mails dépendent de la configuration SMTP. Présente comme terminées uniquement celles qui fonctionnent dans ta version finale.",
  },
  "groupie-tracker": {
    title: "Groupie Tracker",
    summary:
      "Application Go qui exploite des données d’artistes et de groupes musicaux issues d’une API.",
    tags: ["Go", "API REST", "HTTP", "JSON", "HTML", "CSS", "JavaScript"],
    tasks: [
      "Interroger une API pour récupérer les données des artistes et des groupes.",
      "Traiter les réponses JSON dans le programme Go.",
      "Présenter les informations dans des pages web.",
      "Ajouter des filtres pour retrouver des groupes ou des artistes.",
      "Travailler sur l’affichage des dates ou lieux de concerts et la géolocalisation si présente dans la version livrée.",
    ],
    learning: [
      "Consommer une API et comprendre le format JSON.",
      "Gérer les données reçues et les erreurs de requête.",
      "Séparer récupération des données et affichage.",
      "Créer une interface de recherche et de filtrage.",
      "Relier les données géographiques à une interface web lorsque cette fonctionnalité est implémentée.",
    ],
    note: "Vérifie la liste exacte des filtres et des fonctions de géolocalisation présentes dans ton dépôt avant publication.",
  },
  "atm-management-system": {
    title: "ATM Management System",
    summary:
      "Projet en C autour d’un système de gestion de type distributeur automatique, avec fichiers et communication client-serveur.",
    tags: ["C", "Fichiers", "Sockets", "Client-serveur"],
    tasks: [
      "Organiser le programme en C et traiter les entrées utilisateur.",
      "Lire ou écrire des informations dans des fichiers pour les conserver.",
      "Mettre en place la communication par sockets entre un client et un serveur.",
      "Transmettre des requêtes et traiter les réponses entre les deux parties.",
      "Gérer les erreurs de saisie et de communication selon l’implémentation.",
    ],
    learning: [
      "Renforcer les bases du langage C et de la gestion mémoire.",
      "Comprendre la persistance de données avec des fichiers.",
      "Découvrir les sockets et le modèle client-serveur.",
      "Structurer les échanges entre deux programmes et diagnostiquer les erreurs réseau.",
    ],
    note: "La fiche décrit les axes connus du projet. Complète les opérations bancaires précises selon les fonctionnalités effectivement réalisées.",
  },
  "push-swap": {
    title: "Push-swap",
    summary:
      "Projet d’algorithmique consistant à trier des entiers avec deux piles et un ensemble limité d’opérations.",
    tags: ["Go / C à confirmer", "Algorithmes", "Piles", "Parsing"],
    tasks: [
      "Analyser et valider les arguments fournis en entrée.",
      "Représenter les nombres dans des structures de type pile.",
      "Implémenter les opérations autorisées sur les deux piles.",
      "Concevoir une stratégie de tri qui limite le nombre d’opérations.",
      "Tester plusieurs cas, notamment les entrées invalides et les listes déjà triées.",
    ],
    learning: [
      "Transformer un problème de tri en suite d’opérations contraintes.",
      "Manipuler des structures de données et leurs invariants.",
      "Améliorer un algorithme en tenant compte du nombre d’opérations.",
      "Écrire un parseur et tester les cas limites.",
    ],
    note: "Confirme le langage de la version que tu présentes : ton projet a été travaillé en C puis également en Go.",
  },
  "ascii-art": {
    title: "ASCII-Art / ASCII-Art-Web",
    summary:
      "Projets de génération de texte en art ASCII, avec une version web pour saisir du texte et afficher le résultat.",
    tags: ["Go", "HTTP", "Templates", "ASCII", "HTML", "CSS"],
    tasks: [
      "Lire le texte fourni et le convertir en représentation ASCII.",
      "Exploiter les fichiers de caractères (bannières) nécessaires au rendu.",
      "Traiter les sauts de ligne et les entrées particulières.",
      "Pour la version web, recevoir les données via un formulaire et afficher le résultat dans une page.",
      "Organiser les routes et les templates de la version web.",
    ],
    learning: [
      "Manipuler des fichiers et des chaînes de caractères en Go.",
      "Respecter un format de sortie précis.",
      "Comprendre le traitement d’un formulaire HTTP.",
      "Relier la logique métier à des templates HTML.",
    ],
    note: "Les tâches distinguent les versions terminal et web. Garde seulement celles qui correspondent à la version que tu présentes.",
  },
  "go-reloaded": {
    title: "Go-Reloaded",
    summary:
      "Outil de transformation de texte développé en Go. Il lit un fichier d’entrée, interprète des commandes de transformation, corrige la ponctuation et écrit le résultat dans un fichier de sortie.",
    tags: [
      "Go",
      "Traitement de texte",
      "Parsing",
      "Fichiers",
      "Tests automatisés",
    ],
    tasks: [
      "Lire un fichier d’entrée et enregistrer le résultat dans un fichier de sortie.",
      "Découper le texte en éléments pour faciliter l’analyse des commandes.",
      "Convertir des valeurs hexadécimales et binaires en nombres décimaux avec (hex) et (bin).",
      "Transformer la casse des mots avec (up), (low) et (cap).",
      "Appliquer une transformation à plusieurs mots avec des commandes comme (up, 3).",
      "Réorganiser la ponctuation et nettoyer les espaces dans les apostrophes.",
      "Corriger certains articles anglais en transformant « a » en « an ».",
      "Vérifier le comportement des transformations à l’aide de tests automatisés.",
    ],
    learning: [
      "Manipuler des fichiers en Go et gérer les erreurs de lecture et d’écriture.",
      "Découper et traiter du texte à l’aide de fonctions dédiées.",
      "Analyser des commandes et appliquer des règles de transformation.",
      "Utiliser les chaînes de caractères, les conversions numériques et les fonctions Unicode.",
      "Traiter la ponctuation et les cas particuliers du formatage de texte.",
      "Écrire des tests automatisés pour comparer les résultats attendus aux résultats obtenus.",
    ],
    note: "Fiche établie à partir du README.md, de main.go et de main_test.go du projet Go-Reloaded.",
  },
  "tetris-optimizer": {
    title: "Tetris Optimizer",
    summary:
      "Projet de formation dont les objectifs précis doivent être confirmés à partir du dépôt.",
    tags: ["Zone01", "Algorithmes", "À confirmer"],
    tasks: [
      "Décrire ici l’objectif exact donné dans le sujet.",
      "Lister les entrées, les contraintes et le résultat attendu.",
      "Présenter l’algorithme réellement implémenté et les tests effectués.",
    ],
    learning: [
      "À compléter à partir du code et du sujet : algorithmes, contraintes, tests ou optimisation selon le travail réel.",
    ],
    note: "Les informations disponibles ne suffisent pas à confirmer les tâches précises. Cette fiche est volontairement signalée comme à compléter.",
  },
  "math-skills": {
    title: "Math-Skills",
    summary:
      "Projet autour de l’analyse de données numériques et de calculs statistiques, à confirmer avec le dépôt.",
    tags: ["Statistiques", "Données", "Algorithmes", "À confirmer"],
    tasks: [
      "Lire les données d’entrée selon le format prévu par le sujet.",
      "Calculer les indicateurs statistiques demandés par le projet.",
      "Vérifier les résultats sur des exemples connus.",
      "Gérer les entrées invalides ou les cas limites.",
    ],
    learning: [
      "Interpréter un énoncé mathématique et le traduire en étapes de calcul.",
      "Vérifier la précision et la cohérence des résultats.",
      "Structurer le traitement de données numériques.",
    ],
    note: "À vérifier avec le sujet et le code source avant de publier cette description comme définitive.",
  },
  "gd-reloaded": {
    title: "GD-Reloaded",
    summary:
      "Projet de formation à documenter à partir de son sujet et de son code source.",
    tags: ["Zone01", "À confirmer"],
    tasks: [
      "Ajouter l’objectif précis du sujet.",
      "Décrire les fonctionnalités implémentées et les fichiers principaux.",
      "Lister les tests réalisés et les contraintes respectées.",
    ],
    learning: [
      "À compléter après vérification du projet : les apprentissages doivent correspondre aux tâches réellement réalisées.",
    ],
    note: "Les informations actuelles ne permettent pas de confirmer le contenu exact de GD-Reloaded.",
  },
};
const detailRoot = document.querySelector("#project-detail-page");
if (detailRoot) {
  const key = new URLSearchParams(window.location.search).get("id");
  const project = projectDetails[key];
  if (!project) {
    document.querySelector("#project-title").textContent = "Projet introuvable";
    document.querySelector("#project-summary").textContent =
      "Choisis un projet depuis la page Projets pour consulter sa fiche.";
    document.querySelector("#project-tasks").innerHTML =
      '<li><a href="projets.html">Retourner à la liste des projets</a></li>';
    document.querySelector("#project-learning").replaceChildren();
  } else {
    document.title = project.title + " | Portfolio développeur";
    document.querySelector("#project-title").textContent = project.title;
    document.querySelector("#project-summary").textContent = project.summary;
    const tags = document.querySelector("#project-tags");
    project.tags.forEach((tag) => {
      const el = document.createElement("span");
      el.textContent = tag;
      tags.appendChild(el);
    });
    const fillList = (selector, items) => {
      const list = document.querySelector(selector);
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
    };
    fillList("#project-tasks", project.tasks);
    fillList("#project-learning", project.learning);
    document.querySelector("#project-note").textContent = project.note;
  }
}

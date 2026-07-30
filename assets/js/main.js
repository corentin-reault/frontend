/**
 * Corentin Réault — Portfolio v3
 * Enhanced UX: smooth scroll, keyboard nav, section reveals, language toggle
 */
(function() {
  "use strict";

  // ==========================================
  // Translations (FR/EN)
  // ==========================================
  const translations = {
    fr: {
      "site-title": "Corentin Réault - Ingénieur SysOps & Réseau",
      "site-desc": "Portfolio de Corentin Réault, Ingénieur SysOps & Réseau. Expert Kubernetes, Cloud, CI/CD, Terraform, Réseau multi-vendeur, EVPN-VXLAN, Sécurité, Linux, Python et automatisation. Certifié CKA et CKS.",
      "skip-nav": "Aller au contenu principal",
      "profile-alt": "Photo de Corentin Réault",
      "subtitle": "Ingénieur SysOps & Réseau",
      "nav-home": "Accueil",
      "nav-resume": "CV",
      "nav-skills": "Compétences",
      "nav-portfolio": "Portfolio",
      "nav-contact": "Contact",
      "hero-cta": "Me contacter",
      "typed-items": "Ingénieur réseau, Ingénieur SysOps",
      "resume-title": "CV",
      "resume-desc": "Passionné par tous les domaines de l'informatique, mon parcours se focalise surtout sur le réseau ainsi que l'administration système.",
      "cv-download": "Télécharger le CV (PDF)",
      "resume-exp-title": "Expériences Professionelles",
      "resume-edu-title": "Formations",
      "resume-lang-title": "Langues maitrisées",
      "exp-1-title": "Ingénieur SysOps",
      "exp-1-date": "Mars 2024 - Aujourd'hui",
      "exp-1-company": "Rakuten France",
      "exp-1-desc-1": "Conception et optimisation d'architectures de reverse proxy / load balancing assurant haute disponibilité et déploiements sans interruption.",
      "exp-1-desc-2": "Mise en oeuvre d'une architecture sécurisée conforme PCI-DSS avec segmentation réseau et déploiement d'une DMZ pour les services web.",
      "exp-1-desc-3": "Pilotage technique de la création d'un cloud privé : industrialisation via Terraform, provisionning, configuration initiale, et coordination réseau inter-partenaires.",
      "exp-1-desc-4": "Déploiement et maintien de clusters Kubernetes, industrialisation des déploiements via Helm Charts (Go Templates) et accompagnement dans la migration des applications de Docker vers Kubernetes.",
      "exp-1-desc-5": "Migration de l'infrastructure d'automatisation de SaltStack vers Ansible, et industrialisation du provisioning et de la configuration de l'infrastructure via Terraform et Ansible.",
      "exp-2-title": "Stage - Architecte réseau",
      "exp-2-date": "Aout 2023 - Février 2024",
      "exp-2-company": "CEA-DAM",
      "exp-2-desc-1": "Participation à un projet de restructuration du réseau grâce à des technologies d'opérateurs et de data center",
      "edu-1-title": "Ingénieur réseau et télécommunications",
      "edu-1-date": "2018 - 2024",
      "edu-1-school": "Université de technologie de Troyes",
      "edu-2-title": "Elektrotechnik und Informationstechnik",
      "edu-2-date": "Mars 2023 - Aout 2023",
      "edu-2-school": "Darmstadt University of Applied Sciences",
      "edu-3-title": "CKA - Certified Kubernetes Administrator",
      "edu-3-date": "Avril 2026",
      "edu-3-school": "The Linux Foundation",
      "edu-4-title": "CKS - Certified Kubernetes Security Specialist",
      "edu-4-date": "Mai 2026",
      "edu-4-school": "The Linux Foundation",
      "lang-1-title": "Anglais",
      "lang-1-detail": "Linguaskills - niveau B2+/C1",
      "lang-2-title": "Allemand",
      "lang-2-detail": "Goethe Pro Test - Niveau A2/B1",
      "skills-title": "Dossier de compétences",
      "nav-recommendations": "Recommandations",
      "nav-timeline": "Parcours",
      "nav-skills-dropdown": "Compétences",
      "nav-certs-dropdown": "Certifications",
      "recommendations-title": "Recommandations",
      "skills-net-title": "Réseau",
      "skills-sys-title": "Système",
      "skills-prog-title": "Programmation",
      "skills-desc": "Un référentiel structuré de mes compétences techniques, par domaine, avec le niveau de maîtrise et le contexte d'application réel. Les niveaux sont auto-évalués et ancrés dans mon expérience concrète.",
      "dom1-title": "Infrastructures, Cloud & Conteneurisation",
      "dom1-level": "Avancé",
      "dom2-title": "Réseau & Sécurité",
      "dom2-level": "Avancé",
      "dom3-title": "Système, Observabilité & Reverse Proxy",
      "dom3-level": "Expert",
      "dom4-title": "Programmation & Automatisation",
      "dom4-level": "Ingénieur qui code pour automatiser",
      "dom4-subtitle": "Ingénieur qui code pour automatiser, pas développeur",
      "lvl-expert": "Expert",
      "lvl-advanced": "Avancé",
      "lvl-intermediate": "Intermédiaire",
      "lvl-operational": "Opérationnel",
      "lvl-personal": "Personnel",
      "lvl-culture": "Culture",
      "lvl-expert-advanced": "Expert / Avancé",
      "c-k8s-title": "Kubernetes",
      "c-k8s-desc": "Déploiement et opération de clusters en environnements de test et de production (3 nœuds control-plane, 6 à 9+ workers). Rédaction de charts Helm maison et accompagnement d'équipes sur les bonnes pratiques. Déploiements industrialisés via helmfile et pipelines CI/CD, avec GitOps en perspective. CKA + CKS ; sécurisation des clusters en production en cours (RBAC notamment).",
      "c-cicd-title": "CI/CD & Automatisation",
      "c-cicd-desc": "Migration Jenkins → GitHub Actions (gains de vitesse, factorisation, robustesse) et conception de pipelines d'entreprise. Intégration de checks Consul avec arrêt automatique d'urgence en cas d'anomalie détectée.",
      "c-terraform-title": "Terraform (IaC)",
      "c-terraform-desc": "Provisioning from scratch et création de modules réutilisables pour les équipes. Providers : Proxmox (bpg), phpIPAM, PowerDNS, VMware. Maîtrise de l'idempotence, des boucles et de la manipulation des states.",
      "c-ansible-title": "Ansible",
      "c-ansible-desc": "Playbooks, inventaires dynamiques, host_vars/group_vars (provisioning & configuration). Vue complémentaire avec NixOS : exécution distante et administration de parc vs configuration locale déclarative.",
      "c-ovh-title": "OVH Public Cloud (K8s managé)",
      "c-ovh-desc": "Expérience sur infrastructure personnelle : site public auto-hébergé sur un cluster Kubernetes managé OVH Public Cloud.",
      "c-routing-title": "Routing & Switching (multi-vendor)",
      "c-routing-desc": "Conception de zones OSPF et redistribution. Expérience de production sur Cisco, Arista, Extreme et Aruba. LACP (actif/passif, actif/actif).",
      "c-evpn-title": "EVPN-VXLAN",
      "c-evpn-desc": "Maîtrise des principes underlay/overlay et du multihoming ; mise en œuvre dans un projet de restructuration réseau.",
      "c-firewall-title": "Sécurité réseau & Firewall",
      "c-firewall-desc": "Stormshield en production, iptables maîtrisé. Finalisation de la mise en place d'une architecture segmentée avec DMZ conforme PCI-DSS, à partir d'un schéma existant.",
      "c-wireguard-title": "WireGuard",
      "c-wireguard-desc": "Déploiements en environnement professionnel et personnel.",
      "c-cilium-title": "Cilium / eBPF",
      "c-cilium-desc": "Déployé en environnement de test, en attente de mise en production.",
      "c-linux-title": "Linux",
      "c-linux-desc": "Daily driver Ubuntu (production) et RHEL ; NixOS et Arch en personnel. Angles d'approfondissement en cours (SELinux/AppArmor, rsyslog).",
      "c-containers-title": "Conteneurisation (Docker & Podman)",
      "c-containers-desc": "Maîtrise des deux outils, y compris en mode rootless.",
      "c-observability-title": "Observabilité",
      "c-observability-desc": "Déploiement et maîtrise complète de la chaîne (VMagent/scraping, règles Grok de parsing de logs, PromQL, Alertmanager → Slack). Stack Prometheus / VictoriaMetrics.",
      "c-lb-title": "Reverse Proxy & Load Balancing",
      "c-lb-desc": "Refonte d'une architecture existante mal optimisée (schéma validé, déploiement test puis prod). Reverse proxy L7, health checks, backends de secours, sans SSL termination. Projet à enjeu (continuité des ventes).",
      "c-python-title": "Python",
      "c-python-desc": "Scripting, applications d'automatisation (ex. webhook Alertmanager → tentative de remédiation automatique des microservices pour réduire les astreintes), templating Jinja2 (Ansible/SaltStack).",
      "c-go-title": "Go",
      "c-go-desc": "Petits binaires d'automatisation réutilisables et Go templating pour configurations Consul automatiques.",
      "c-bash-title": "Bash",
      "c-bash-desc": "Scripts quotidiens et one-liners d'administration.",
      "c-java-title": "Compréhension Java",
      "c-java-desc": "Acquisition en formation ; permet la lecture de stacks backend et la collaboration amont avec les équipes de développement.",
      "c-iac-title": "IaC (YAML / HCL)",
      "c-iac-desc": "Terraform, Ansible, GitHub Actions (langages de description et de déclaration).",
      "timeline-title": "Parcours",
      "timeline-desc": "Mon parcours en un coup d'œil.",
      "tl-1-title": "Ingénieur réseau et télécommunications",
      "tl-1-sub": "Université de technologie de Troyes",
      "tl-1-date": "2018 - 2024",
      "tl-1-desc": "Formation d'ingénieur généraliste avec spécialisation en réseaux et télécommunications.",
      "tl-2-title": "Stage - Architecte réseau",
      "tl-2-sub": "CEA-DAM",
      "tl-2-date": "Août 2023 - Février 2024",
      "tl-2-desc": "Projet de restructuration du réseau sur des technologies opérateur et data center.",
      "tl-3-title": "Ingénieur SysOps",
      "tl-3-sub": "Rakuten France",
      "tl-3-date": "Mars 2024 - Aujourd'hui",
      "tl-3-desc": "Reverse proxy / load balancing, architecture PCI-DSS, cloud privé (Terraform, Ansible), clusters Kubernetes et pipelines CI/CD.",
      "tl-4-title": "CKA - Certified Kubernetes Administrator",
      "tl-4-sub": "The Linux Foundation",
      "tl-4-date": "Avril 2026",
      "tl-5-title": "CKS - Certified Kubernetes Security Specialist",
      "tl-5-sub": "The Linux Foundation",
      "tl-5-date": "Mai 2026",
      "cert-title": "Certifications",
      "c-cka-title": "CKA - Certified Kubernetes Administrator",
      "c-cka-issuer": "The Linux Foundation",
      "c-cka-date": "Avril 2026",
      "c-cka-verify": "Vérifier",
      "c-cks-title": "CKS - Certified Kubernetes Security Specialist",
      "c-cks-issuer": "The Linux Foundation",
      "c-cks-date": "Mai 2026",
      "c-cks-verify": "Vérifier",
      "c-linguaskills-title": "Linguaskills",
      "c-linguaskills-issuer": "Cambridge English",
      "c-linguaskills-verify": "Vérifier",
      "c-goethe-title": "Goethe Pro Test",
      "c-goethe-issuer": "Goethe-Institut",
      "c-goethe-verify": "Vérifier",
      "contact-info-title": "Me contacter",
      "contact-info-desc": "Une question, une opportunité professionnelle, ou simplement envie de discuter tech ? N'hésitez pas !",
      "contact-title": "Contact",
      "contact-desc": "Remplissez le formulaire suivant pour prendre contact avec moi",
      "form-instructions": "Tous les champs marqués d'un astérisque sont obligatoires",
      "form-name-label": "Nom",
      "form-email-label": "Email",
      "form-phone-label": "Téléphone",
      "form-message-label": "Message",
      "form-submit": "CONTACTEZ-MOI !",
      "form-submit-text": "CONTACTEZ-MOI !",
      "popup-title": "Merci !",
      "popup-msg": "Vos détails ont bien été transmis. Je reviendrai rapidement vers vous.",
      "popup-close": "OK",
      "error-required": "Ce champ est obligatoire",
      "error-email": "Veuillez entrer une adresse email valide",
      "error-message-short": "Le message doit contenir au moins 10 caractères",
      "error-general": "Une erreur est survenue. Veuillez réessayer.",
      "footer": "© 2024 Corentin Réault. Tous droits réservés.",
      "theme-dark": "Mode sombre",
      "theme-light": "Mode clair",
      "loader-text": "Chargement",
    },
    en: {
      "site-title": "Corentin Réault - SysOps & Network Engineer",
      "site-desc": "Corentin Réault's portfolio - SysOps & Network Engineer. Expert in Kubernetes, Cloud, CI/CD, Terraform, Multi-vendor Networking, EVPN-VXLAN, Security, Linux, Python and automation. CKA and CKS certified.",
      "skip-nav": "Skip to main content",
      "profile-alt": "Photo of Corentin Réault",
      "subtitle": "SysOps & Network Engineer",
      "nav-home": "Home",
      "nav-resume": "Resume",
      "nav-skills": "Skills",
      "nav-portfolio": "Portfolio",
      "nav-contact": "Contact",
      "hero-cta": "Get in touch",
      "typed-items": "Network Engineer, SysOps Engineer",
      "resume-title": "Resume",
      "resume-desc": "Passionate about all areas of IT, my career focuses primarily on networking and system administration.",
      "cv-download": "Download CV (PDF)",
      "resume-exp-title": "Professional Experience",
      "resume-edu-title": "Education",
      "resume-lang-title": "Languages",
      "exp-1-title": "SysOps Engineer",
      "exp-1-date": "March 2024 - Present",
      "exp-1-company": "Rakuten France",
      "exp-1-desc-1": "Design and optimization of reverse proxy / load balancing architectures ensuring high availability and seamless deployments.",
      "exp-1-desc-2": "Implementation of a secure, PCI-DSS-compliant architecture with network segmentation and deployment of a DMZ for web services.",
      "exp-1-desc-3": "Technical leadership in the creation of a private cloud: standardization using Terraform, provisioning, initial configuration, and inter-partner network coordination.",
      "exp-1-desc-4": "Deployment and maintenance of Kubernetes clusters, standardization of deployments using Helm Charts (Go Templates), and support for migrating applications from Docker to Kubernetes.",
      "exp-1-desc-5": "Migration of the automation infrastructure from SaltStack to Ansible, and standardization of infrastructure provisioning and configuration using Terraform and Ansible.",
      "exp-2-title": "Internship - Network Architect",
      "exp-2-date": "August 2023 - February 2024",
      "exp-2-company": "CEA-DAM",
      "exp-2-desc-1": "Participated in a network restructuring project using operator and data center technologies",
      "edu-1-title": "Network and Telecommunications Engineer",
      "edu-1-date": "2018 - 2024",
      "edu-1-school": "University of Technology of Troyes",
      "edu-2-title": "Elektrotechnik und Informationstechnik",
      "edu-2-date": "March 2023 - August 2023",
      "edu-2-school": "Darmstadt University of Applied Sciences",
      "edu-3-title": "CKA - Certified Kubernetes Administrator",
      "edu-3-date": "April 2026",
      "edu-3-school": "The Linux Foundation",
      "edu-4-title": "CKS - Certified Kubernetes Security Specialist",
      "edu-4-date": "May 2026",
      "edu-4-school": "The Linux Foundation",
      "lang-1-title": "English",
      "lang-1-detail": "Linguaskills - B2+/C1 level",
      "lang-2-title": "German",
      "lang-2-detail": "Goethe Pro Test - A2/B1 level",
      "skills-title": "Skills",
      "nav-recommendations": "Recommendations",
      "nav-timeline": "Career",
      "nav-skills-dropdown": "Skills",
      "nav-certs-dropdown": "Certifications",
      "recommendations-title": "Recommendations",
      "skills-net-title": "Network",
      "skills-sys-title": "System",
      "skills-prog-title": "Programming",
      "skills-desc": "A structured reference of my technical skills, by domain, with the level of mastery and the real-world context of application. Levels are self-assessed and grounded in concrete experience.",
      "dom1-title": "Infrastructure, Cloud & Containerization",
      "dom1-level": "Advanced",
      "dom2-title": "Network & Security",
      "dom2-level": "Advanced",
      "dom3-title": "Systems, Observability & Reverse Proxy",
      "dom3-level": "Expert",
      "dom4-title": "Programming & Automation",
      "dom4-level": "Engineer who codes to automate",
      "dom4-subtitle": "Engineer who codes to automate, not a developer",
      "lvl-expert": "Expert",
      "lvl-advanced": "Advanced",
      "lvl-intermediate": "Intermediate",
      "lvl-operational": "Operational",
      "lvl-personal": "Personal",
      "lvl-culture": "Familiarity",
      "lvl-expert-advanced": "Expert / Advanced",
      "c-k8s-title": "Kubernetes",
      "c-k8s-desc": "Deployment and operation of clusters in test and production environments (3 control-plane nodes, 6 to 9+ workers). Authoring in-house Helm charts and supporting teams on best practices. Industrialized deployments via helmfile and CI/CD pipelines, with GitOps on the horizon. CKA + CKS; production cluster hardening in progress (RBAC notably).",
      "c-cicd-title": "CI/CD & Automation",
      "c-cicd-desc": "Jenkins → GitHub Actions migration (gains in speed, factorization, robustness) and enterprise pipeline design. Consul health checks with automatic emergency stop on detected anomaly.",
      "c-terraform-title": "Terraform (IaC)",
      "c-terraform-desc": "Provisioning from scratch and creation of reusable modules for teams. Providers: Proxmox (bpg), phpIPAM, PowerDNS, VMware. Mastery of idempotence, loops, and state manipulation.",
      "c-ansible-title": "Ansible",
      "c-ansible-desc": "Playbooks, dynamic inventories, host_vars/group_vars (provisioning & configuration). Complementary view with NixOS: remote execution and fleet administration vs. local declarative configuration.",
      "c-ovh-title": "OVH Public Cloud (managed K8s)",
      "c-ovh-desc": "Personal infrastructure experience: public site self-hosted on a managed Kubernetes cluster (OVH Public Cloud).",
      "c-routing-title": "Routing & Switching (multi-vendor)",
      "c-routing-desc": "OSPF area design and redistribution. Production experience across Cisco, Arista, Extreme and Aruba. LACP (active/passive, active/active).",
      "c-evpn-title": "EVPN-VXLAN",
      "c-evpn-desc": "Mastery of underlay/overlay principles and multihoming; implemented in a network restructuring project.",
      "c-firewall-title": "Network Security & Firewall",
      "c-firewall-desc": "Stormshield in production, iptables mastered. Completion of a segmented architecture with PCI-DSS-compliant DMZ, based on an existing design.",
      "c-wireguard-title": "WireGuard",
      "c-wireguard-desc": "Deployments in both professional and personal environments.",
      "c-cilium-title": "Cilium / eBPF",
      "c-cilium-desc": "Deployed in test environments, pending production rollout.",
      "c-linux-title": "Linux",
      "c-linux-desc": "Daily driver Ubuntu (production) and RHEL; NixOS and Arch personally. Deepening areas in progress (SELinux/AppArmor, rsyslog).",
      "c-containers-title": "Containerization (Docker & Podman)",
      "c-containers-desc": "Mastery of both tools, including rootless mode.",
      "c-observability-title": "Observability",
      "c-observability-desc": "Full deployment and mastery of the pipeline (VMagent/scraping, Grok log-parsing rules, PromQL, Alertmanager → Slack). Prometheus / VictoriaMetrics stack.",
      "c-lb-title": "Reverse Proxy & Load Balancing",
      "c-lb-desc": "Redesign of a poorly optimized existing architecture (validated design, test then prod rollout). L7 reverse proxy, health checks, backup backends, no SSL termination. High-stakes project (sales continuity).",
      "c-python-title": "Python",
      "c-python-desc": "Scripting, automation applications (e.g. Alertmanager webhook → automated microservice remediation attempts to cut on-call load), Jinja2 templating (Ansible/SaltStack).",
      "c-go-title": "Go",
      "c-go-desc": "Small reusable automation binaries and Go templating for automatic Consul configurations.",
      "c-bash-title": "Bash",
      "c-bash-desc": "Daily scripts and administration one-liners.",
      "c-java-title": "Java Comprehension",
      "c-java-desc": "Acquired in training; enables reading backend stacks and upstream collaboration with development teams.",
      "c-iac-title": "IaC (YAML / HCL)",
      "c-iac-desc": "Terraform, Ansible, GitHub Actions (description and declaration languages).",
      "timeline-title": "Career Path",
      "timeline-desc": "My career at a glance.",
      "tl-1-title": "Network and Telecommunications Engineer",
      "tl-1-sub": "University of Technology of Troyes",
      "tl-1-date": "2018 - 2024",
      "tl-1-desc": "General engineering degree with a specialization in networks and telecommunications.",
      "tl-2-title": "Internship - Network Architect",
      "tl-2-sub": "CEA-DAM",
      "tl-2-date": "August 2023 - February 2024",
      "tl-2-desc": "Network restructuring project using operator and data center technologies.",
      "tl-3-title": "SysOps Engineer",
      "tl-3-sub": "Rakuten France",
      "tl-3-date": "March 2024 - Present",
      "tl-3-desc": "Reverse proxy / load balancing, PCI-DSS architecture, private cloud (Terraform, Ansible), Kubernetes clusters and CI/CD pipelines.",
      "tl-4-title": "CKA - Certified Kubernetes Administrator",
      "tl-4-sub": "The Linux Foundation",
      "tl-4-date": "April 2026",
      "tl-5-title": "CKS - Certified Kubernetes Security Specialist",
      "tl-5-sub": "The Linux Foundation",
      "tl-5-date": "May 2026",
      "cert-title": "Certifications",
      "c-cka-title": "CKA - Certified Kubernetes Administrator",
      "c-cka-issuer": "The Linux Foundation",
      "c-cka-date": "April 2026",
      "c-cka-verify": "Verify",
      "c-cks-title": "CKS - Certified Kubernetes Security Specialist",
      "c-cks-issuer": "The Linux Foundation",
      "c-cks-date": "May 2026",
      "c-cks-verify": "Verify",
      "c-linguaskills-title": "Linguaskills",
      "c-linguaskills-issuer": "Cambridge English",
      "c-linguaskills-verify": "Verify",
      "c-goethe-title": "Goethe Pro Test",
      "c-goethe-issuer": "Goethe-Institut",
      "c-goethe-verify": "Verify",
      "contact-info-title": "Get in touch",
      "contact-info-desc": "A question, a professional opportunity, or just want to chat about tech? Don't hesitate!",
      "contact-title": "Contact",
      "contact-desc": "Fill out the following form to get in touch with me",
      "form-instructions": "All fields marked with an asterisk are required",
      "form-name-label": "Name",
      "form-email-label": "Email",
      "form-phone-label": "Phone number",
      "form-message-label": "Message",
      "form-submit": "CONTACT ME!",
      "form-submit-text": "CONTACT ME!",
      "popup-title": "Thank you!",
      "popup-msg": "Your details have been submitted successfully. I will get back to you shortly.",
      "popup-close": "OK",
      "error-required": "This field is required",
      "error-email": "Please enter a valid email address",
      "error-message-short": "Message must be at least 10 characters long",
      "error-general": "An error occurred. Please try again.",
      "footer": "© 2024 Corentin Réault. All rights reserved.",
      "theme-dark": "Dark mode",
      "theme-light": "Light mode",
      "loader-text": "Loading",
    }
  };

  // ==========================================
  // Utility helpers
  // ==========================================
  const select = (el, all = false) => {
    // Allow passing either a selector string or an Element/NodeList directly
    if (typeof el !== 'string') {
      if (all) {
        return el instanceof NodeList ? [...el] : [el].filter(Boolean);
      }
      // Single element: return the element itself (not wrapped in array)
      return el || null;
    }
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    // Support on(type, listener) for document/window events
    if (typeof el === 'function') {
      listener = el;
      el = document;
    }
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  // ==========================================
  // Language toggle
  // ==========================================
  const LANG_STORAGE_KEY = "preferred-lang";

  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      // localStorage unavailable — silently ignore
    }
  }

  // Current language: prefer stored, then html lang attr, then "fr"
  let currentLang = getStoredLang() || document.documentElement.lang || "fr";
  let typedInstance = null;

  function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.setAttribute("lang", lang);

    // Translate all [data-i18n] elements — use textContent for simple elements,
    // but for elements with child nodes (icons + text), only replace the
    // direct text nodes to preserve child elements like <i>.
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!t[key]) return;

      // If the element has only a single text node, use textContent (fast path)
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        el.textContent = t[key];
      } else {
        // Mixed content (icon + text): replace only the first non-empty
        // direct text node to avoid duplicating into whitespace nodes
        let replaced = false;
        el.childNodes.forEach(node => {
          if (node.nodeType === 3 && !replaced) {
            const trimmed = node.textContent.trim();
            if (trimmed.length > 0) {
              node.textContent = t[key];
              replaced = true;
            }
          }
        });
        // If no direct text node was found, append a text node
        // (handles cases where the translation target has no icon siblings)
      }
    });

    // Update meta tags with data-i18n-meta (description, OG, Twitter)
    document.querySelectorAll("meta[data-i18n-meta]").forEach(el => {
      const metaKey = el.getAttribute("data-i18n-meta");
      if (t[metaKey]) {
        el.setAttribute("content", t[metaKey]);
      }
    });

    // Update alt attributes on images with [data-i18n-alt]
    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
      const key = el.getAttribute("data-i18n-alt");
      if (t[key]) {
        el.setAttribute("alt", t[key]);
      }
    });

    // Update <title>
    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      const titleKey = titleEl.getAttribute("data-i18n");
      if (t[titleKey]) {
        titleEl.textContent = t[titleKey];
      }
    }

    // Update typed items — destroy and re-initialize Typed.js
    const typedEl = document.querySelector(".typed");
    if (typedEl) {
      const typedKey = "typed-items";
      if (t[typedKey]) {
        typedEl.setAttribute("data-typed-items", t[typedKey]);
      }
      // Re-initialize Typed.js with new strings
      if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
      }
      if (typeof Typed !== "undefined") {
        const typedStrings = t[typedKey].split(",");
        typedInstance = new Typed(".typed", {
          strings: typedStrings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }

    // Update theme toggle text on mobile
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    document.querySelectorAll(".theme-toggle-mobile span").forEach(el => {
      const key = isLight ? "theme-light" : "theme-dark";
      if (t[key]) el.textContent = t[key];
    });
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    // Persist choice
    storeLang(lang);

    // Update button states
    document.querySelectorAll(".lang-btn").forEach(btn => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateContent(lang);
  }

  // Initialize language buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const lang = this.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  // ==========================================
  // Theme toggle (light / dark mode)
  // ==========================================
  const THEME_STORAGE_KEY = "preferred-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      // silently ignore
    }
  }

  function applyTheme(theme) {
    const isLight = theme === "light";
    document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
    // Update icons
    const moonIcon = "fa-moon";
    const sunIcon = "fa-sun";
    document.querySelectorAll(".theme-toggle i, .theme-toggle-mobile i").forEach(el => {
      el.className = isLight ? `fa-solid ${sunIcon}` : `fa-solid ${moonIcon}`;
    });
    // Update text for mobile toggle
    document.querySelectorAll(".theme-toggle-mobile span").forEach(el => {
      const key = isLight ? "theme-light" : "theme-dark";
      const t = translations[currentLang];
      if (t && t[key]) el.textContent = t[key];
    });
    // Update theme-color meta
    const meta = document.querySelector("meta[name='theme-color']") || document.getElementById("theme-color-meta");
    if (meta) {
      meta.setAttribute("content", isLight ? "#f8fafc" : "#0a0f1a");
    }
    // Reinitialize particles with new theme colors
    if (window.initParticles) {
      window.initParticles(theme);
    }
  }

  // Initialize theme: stored preference, then system preference, then dark
  let currentTheme = getStoredTheme();
  if (!currentTheme) {
    currentTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  applyTheme(currentTheme);

  // Toggle function
  function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const newTheme = isLight ? "dark" : "light";
    storeTheme(newTheme);
    applyTheme(newTheme);
  }

  // Wire up toggle buttons
  document.querySelectorAll(".theme-toggle, .theme-toggle-mobile").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  // ==========================================
  // Smooth scrolling & navigation active state
  // ==========================================
  let navbarlinks = select(".top-nav-menu .nav-link", true);

  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    // First, deactivate all dropdown parents
    document.querySelectorAll(".nav-dropdown > .nav-link").forEach(el => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add("active");
        navbarlink.setAttribute("aria-current", "page");
        // Also highlight parent dropdown trigger
        let parentDropdown = navbarlink.closest(".nav-dropdown");
        if (parentDropdown) {
          let toggle = parentDropdown.querySelector(".dropdown-toggle");
          if (toggle) {
            toggle.classList.add("active");
            toggle.setAttribute("aria-current", "page");
          }
        }
      } else {
        navbarlink.classList.remove("active");
        navbarlink.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop - 64;
    window.scrollTo({
      top: Math.max(elementPos, 0),
      behavior: "smooth"
    });
  };

  // Scroll-to links — use event delegation to catch all .scrollto, even dropdown items
  document.addEventListener("click", function(e) {
    const scrollLink = e.target.closest(".scrollto");
    if (!scrollLink || !scrollLink.hash) return;
    if (select(scrollLink.hash)) {
      e.preventDefault();
      let body = select("body");
      let menu = select("#top-nav-menu");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
        let navbarToggle = select(".top-nav-toggle");
        navbarToggle.classList.toggle("fa-bars");
        navbarToggle.classList.toggle("fa-x");
        navbarToggle.setAttribute("aria-expanded", "false");
      }
      scrollto(scrollLink.hash);

      // Set focus to target section for accessibility
      let target = select(scrollLink.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  });

  // Scroll on page load with hash
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  // ==========================================
  // Mobile nav toggle
  // ==========================================
  on("click", ".top-nav-toggle", function(e) {
    let menu = select("#top-nav-menu");
    menu.classList.toggle("open");
    this.classList.toggle("fa-bars");
    this.classList.toggle("fa-x");
    const isExpanded = menu.classList.contains("open");
    this.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    this.setAttribute("aria-label", isExpanded ? "Close navigation menu" : "Open navigation menu");

    // Trap focus in mobile nav when open
    if (isExpanded) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  });

  // ==========================================
  // Back to top button
  // ==========================================
  let backToTop = select(".back-to-top");
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    };
    window.addEventListener("load", toggleBackToTop);
    onscroll(document, toggleBackToTop);

    on("click", ".back-to-top", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // Keyboard navigation enhancements
  // ==========================================
  on("keydown", (e) => {
      // Escape: close popup and mobile nav
      if (e.key === "Escape") {
        closePopup();
        const menu = select("#top-nav-menu");
        if (menu && menu.classList.contains("open")) {
          menu.classList.remove("open");
          const toggle = select(".top-nav-toggle");
          if (toggle) {
            toggle.classList.add("fa-bars");
            toggle.classList.remove("fa-x");
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
          }
        }
      }
    });

  // ==========================================
  // Section reveal on scroll (IntersectionObserver)
  // ==========================================
  function initSectionReveal() {
    // Skip if reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".skills-group, .resume-item").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // Observe skills groups and resume items for staggered reveal
    document.querySelectorAll(".skills-group").forEach((el, i) => {
      el.classList.add("section-reveal");
      el.style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });

    document.querySelectorAll("#resume .resume-item").forEach((el, i) => {
      el.classList.add("section-reveal");
      el.style.transitionDelay = `${i * 80}ms`;
      observer.observe(el);
    });
  }

  // ==========================================
    // AOS animation on scroll
    // ==========================================
  function initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        mirror: false,
        once: true,
        offset: 50,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? true : false
      });
    }
  }

  // ==========================================
  // Popup handling
  // ==========================================
  function openPopup() {
    const popup = select("#popup");
    const overlay = select("#popup-overlay");
    if (popup && overlay) {
      popup.classList.add("open-popup");
      overlay.classList.add("visible");
      overlay.setAttribute("aria-hidden", "false");

      // Trap focus in popup
      const closeBtn = select("#popup-close");
      if (closeBtn) closeBtn.focus();
    }
  }

  function closePopup() {
    const popup = select("#popup");
    const overlay = select("#popup-overlay");
    if (popup && overlay) {
      popup.classList.remove("open-popup");
      overlay.classList.remove("visible");
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  // Close popup on overlay click
  on("click", "#popup-overlay", closePopup);

  // Close popup on button click
  on("click", "#popup-close", closePopup);

  // Trap focus inside popup when open
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const popup = select("#popup");
      if (popup && popup.classList.contains("open-popup")) {
        const focusable = popup.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Make closePopup available globally for backward compatibility
  window.closePopup = closePopup;

  // ==========================================
  // Initialize
  // ==========================================
  window.addEventListener("load", () => {
    // Apply stored/default language before anything else renders
    updateContent(currentLang);

    // Sync button state to stored language
    document.querySelectorAll(".lang-btn").forEach(btn => {
      const isActive = btn.getAttribute("data-lang") === currentLang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    // Hide page loader overlay and trigger page load animation
    const pageLoader = document.getElementById("page-loader");
    if (pageLoader) {
      pageLoader.classList.add("hidden");
    }

    // Trigger page load animation (navbar fade-in)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add("page-loaded");
    } else {
      document.body.classList.add("page-loaded");
    }

    initTyping();
    initAOS();
    initSectionReveal();
  });

})();

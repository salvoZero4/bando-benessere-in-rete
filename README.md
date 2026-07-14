# Benessere in Rete 

> **Public Grant Award-Winning Project** issued by the Municipality of Altavilla Milicia (Palermo, Italy) for technological innovation, local community welfare, and the promotion of sports initiatives.

An interactive and accessible web platform prototype designed to map, manage, and promote local associations, public health services, environmental landmarks, and community events.

---

##  Project Overview & Public Recognition
The platform was custom-built to comply with the rigorous functional and accessibility guidelines mandated by the municipal public tender. The final prototype was awarded a public grant and received an **Official Certificate of Victory signed by the Mayor**, formally recognizing the project's technical excellence and adherence to institutional standards.

---

##  Tech Stack
The project was intentionally engineered using **Vanilla JavaScript** and standard web technologies to ensure lightweight performance, zero heavy external dependencies, and optimal SEO indexing, while maintaining a decoupled and scalable data architecture[cite: 1]:

*   **Frontend:** Semantic HTML5, advanced CSS3 (Responsive Layouts, Flexbox, Grid).
*   **Logic & Data Layer:** Vanilla JavaScript (ES6+).
*   **UI/UX Assets:** Optimized for accessibility and inclusivity according to municipal design requirements.

---

##  Dynamic Data Architecture
To simulate backend behavior without introducing complex database management systems during the prototyping phase, the application adopts a **decoupled data architecture** driven by modular JavaScript configuration structures located in the `sito/data/` directory:

*   `associazioni.js`: Complete and categorized mapping of local welfare and sports organizations (e.g., Palma Team Volley, Tennis Friends, Self Defence Academy)[cite: 2].
*   `news.js` & `gestione-news.js`: Modules for dynamically rendering and updating municipal informational feeds.
*   `salute-servizi.js` & `sport.js`: Indexing and configuration of public utility and health services within the area.
*   `ambiente.js` & `aree.js`: Content management for natural points of interest and regional reserves.

This approach allows developers or editors to update the entire platform (adding/modifying associations, events, or services) simply by editing the underlying JS objects, completely isolating the data layer from the UI rendering logic.

---

##  Repository Structure
```text
├── sito/
│   ├── assets/
│   │   ├── foto/          # Regional landmarks and reserve media assets
│   │   └── loghi/         # Institutional and partner association logos
│   ├── css/
│   │   └── styles.css     # Responsive stylesheets
│   ├── data/              # JavaScript data configurations (Data Layer)
│   ├── js/
│   │   ├── app.js         # Core application rendering logic
│   │   └── management.js  # Administrative back-office management scripts
│   ├── index.html         # Main user-facing platform homepage
│   └── gestione.html      # Back-office control panel prototype
└── README.md

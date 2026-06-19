window.siteContent = window.siteContent || {};
window.siteContent.environment = {
  eyebrow: "Tra montagna, costa e comunità",
  title: "Ambiente",
  description:
    "Il patrimonio naturale di Altavilla Milicia unisce la riserva, il litorale tirrenico e l'impegno quotidiano per un territorio più pulito e consapevole.",
  reserve: {
    number: "01",
    eyebrow: "Area protetta",
    title:
      "Riserva Naturale Orientata Pizzo Cane, Pizzo Trigna e Grotta Mazzamuto",
    paragraphs: [
      "Un sistema di rilievi, valloni, boschi e ambienti rupestri. La riserva custodisce macchia mediterranea, lecci, sughere e habitat frequentati da rapaci e fauna selvatica.",
      "Tra le cavità più importanti si trova Grotta Mazzamuto, di interesse archeologico per i reperti che testimoniano la presenza umana sin dalla preistoria. L'Eremo di San Felice è considerato uno degli accessi storici all'area protetta.",
    ],
    action: "Approfondisci la riserva",
    detailId: "reserve",
    photo: {
      label:
        "Foto della Riserva di Pizzo Cane, Pizzo Trigna e Grotta Mazzamuto",
      file: "assets/foto/riserva.jpg",
    },
  },
  coast: {
    number: "02",
    eyebrow: "La costa di Altavilla",
    title: "Spiagge e accessi al mare",
    description:
      "Località balneari riconosciute lungo il litorale, tra calette, ciottoli, sabbia e tratti attrezzati.",
    emptyMessage: "Nessuna spiaggia disponibile.",
    items: [
      {
        type: "Cala naturale",
        title: "Cala Sciabica",
        image: {
          src: "assets/foto/cala-sciabica.jpg",
          alt: "Cala Sciabica ad Altavilla Milicia",
        },
        description:
          "La baia ai piedi di Capo Grosso, conosciuta anche come Torre Normanna o Ombelico di Venere.",
      },
      {
        type: "Spiaggia",
        title: "Spiaggia Passi",
        image: {
          src: "assets/foto/spiaggia-passi.jpg",
          alt: "Spiaggia Passi ad Altavilla Milicia",
        },
        description:
          "Tratto del litorale locale raggiunto anche dal servizio estivo di collegamento con le spiagge.",
      },
      {
        type: "Spiaggia",
        title: "Spiaggia Marina della Bruca",
        image: {
          src: "assets/foto/marina-della-bruca.jpg",
          alt: "Spiaggia Marina della Brusca ad Altavilla Milicia",
        },
        description:
          "Punto balneare attrezzato della costa di Altavilla Milicia, lungo il litorale della SS 113.",
      },
      {
        type: "Spiaggia libera",
        title: "Spiaggia La Catena",
        image: {
          src: "assets/foto/spiaggia-la-catena.jpg",
          alt: "Spiaggia La Catena ad Altavilla Milicia",
        },
        description:
          "Spiaggia libera in zona Via Consolare, inserita nel tratto costiero di Altavilla Milicia.",
      },
    ],
  },
  sustainability: {
    number: "03",
    eyebrow: "Cura del territorio",
    title: "Iniziative per la sostenibilità",
    description:
      "Servizi, volontariato e scuola lavorano insieme per diffondere comportamenti responsabili e proteggere gli spazi comuni.",
    emptyMessage: "Nessuna iniziativa disponibile.",
    items: [
      {
        icon: "recycling",
        title: "Raccolta differenziata",
        description:
          "Separazione di organico, secco, plastica, vetro e carta, servizi per ingombranti e conferimento nei punti di raccolta.",
        action: "Consulta i servizi",
        detailId: "recycling",
      },
      {
        icon: "plastic-free",
        title: "Attività Plastic Free",
        description:
          "Giornate di pulizia degli arenili e sensibilizzazione contro l'abbandono dei rifiuti, con volontari e comunità locale.",
        action: "Scopri l'iniziativa",
        detailId: "plastic-free",
      },
      {
        icon: "school",
        title: "Educazione ambientale a scuola",
        description:
          "Progetti dell'Istituto Comprensivo come “Un alunno, un albero”, attività Plastic Free, riciclo e tutela del mare.",
        action: "Leggi il progetto",
        detailId: "school",
      },
    ],
  },
  details: {
    reserve: {
      theme: "forest",
      type: "Riserva naturale",
      title:
        "Riserva Naturale Orientata Pizzo Cane, Pizzo Trigna e Grotta Mazzamuto",
      subtitle:
        "Un'area protetta tra rilievi, boschi mediterranei, valloni e cavità di interesse naturalistico e archeologico.",
      content: [
        "La riserva comprende ambienti rupestri, vallivi, boschivi, prativi e umidi. Tra le specie vegetali presenti si trovano leccio, sughera, acero campestre, biancospino, erica arborea, lentisco e palma nana.",
        "Le pareti e i boschi offrono habitat a rapaci e fauna selvatica. Tra le cavità più note figurano Grotta Brigli, Grotta del Leone e Grotta Mazzamuto.",
        "Grotta Mazzamuto conserva un particolare interesse archeologico per i reperti che attestano la presenza umana nell'area sin dalla preistoria. L'Eremo di San Felice rappresenta uno degli accessi storici alla riserva.",
      ],
    },
    recycling: {
      theme: "recycling",
      type: "Servizio ambientale",
      title: "Raccolta differenziata",
      subtitle:
        "Indicazioni essenziali per separare correttamente i rifiuti e utilizzare i servizi disponibili sul territorio.",
      content: [
        "La raccolta differenziata parte dalla separazione domestica delle principali tipologie di rifiuto: organico, secco residuo, plastica, vetro e carta.",
        "Per i materiali che non possono essere inseriti nella raccolta ordinaria sono previsti servizi dedicati, tra cui il ritiro dei rifiuti ingombranti e il conferimento presso i punti di raccolta autorizzati.",
        "I cittadini possono inoltre chiedere informazioni, segnalare disservizi relativi alla raccolta e richiedere i contenitori previsti dal servizio comunale.",
      ],
    },
    "plastic-free": {
      theme: "sea",
      type: "Volontariato ambientale",
      title: "Attività Plastic Free",
      subtitle:
        "Giornate di pulizia e sensibilizzazione per proteggere spiagge, mare e spazi condivisi.",
      content: [
        "Ad Altavilla Milicia sono state organizzate iniziative di pulizia ambientale con volontari dell'associazione Plastic Free e il coinvolgimento della comunità locale.",
        "Le attività sugli arenili aiutano a rimuovere plastica e altri rifiuti dispersi, ma hanno soprattutto una funzione educativa: rendere visibile l'impatto dell'abbandono dei rifiuti sul paesaggio e sull'ecosistema marino.",
        "La partecipazione dei cittadini rafforza la cura condivisa del territorio e promuove comportamenti quotidiani fondati sulla riduzione della plastica monouso e sul corretto conferimento.",
      ],
    },
    school: {
      theme: "school",
      type: "Educazione ambientale",
      title: "Educazione ambientale a scuola",
      subtitle:
        "Alunni e insegnanti partecipano a progetti dedicati ad alberi, riciclo, riduzione della plastica e tutela del mare.",
      content: [
        "L'Istituto Comprensivo di Altavilla Milicia porta avanti attività che avvicinano bambini e ragazzi alla conoscenza e alla salvaguardia dell'ambiente.",
        "Tra le esperienze locali figura il progetto “Un alunno, un albero”, insieme ad attività Plastic Free, laboratori sul riciclo e iniziative di sensibilizzazione per la tutela del mare.",
        "L'educazione ambientale collega apprendimento e cittadinanza attiva: gli studenti imparano a riconoscere il valore del territorio e a trasformare piccole scelte quotidiane in comportamenti responsabili.",
      ],
    },
  },
  search:
    "ambiente natura riserva pizzo cane pizzo trigna grotta mazzamuto spiagge cala sciabica passi capannina catena sostenibilità raccolta differenziata plastic free educazione ambientale scuola",
};

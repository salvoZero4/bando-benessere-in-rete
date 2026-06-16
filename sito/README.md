# Benessere.comune - prototipo web

Proposta responsive per il concorso "Benessere.comune" della Consulta dello
Sport di Altavilla Milicia.

## Apertura

Aprire `index.html` con un browser moderno. Il progetto funziona direttamente
con doppio clic e non richiede server, database, PHP o procedure di avvio.

## Struttura

- `index.html`: struttura semantica e contenitori delle sezioni;
- `gestione.html`: area gestione dimostrativa per il personale;
- `css/styles.css`: design responsive;
- `js/app.js`: rendering, ricerca e interazioni;
- `js/management.js`: rendering e interazioni dell'area gestione;
- `data/`: un file di configurazione per ogni sezione;
- `data/README.md`: istruzioni per aggiungere e rimuovere contenuti;
- `assets/loghi`: marchi degli organizzatori e dei partner.

## Aggiornamento dei contenuti

Tutti i contenuti delle sezioni, degli appuntamenti, delle news e dell'area
gestione si modificano nei file della cartella `data`. Gli elenchi sono
estendibili: aggiungendo o rimuovendo oggetti dagli array, la pagina adatta
automaticamente card, numerazione, griglie, scorrimento e stati vuoti.

Non è necessario modificare HTML, CSS o JavaScript per aggiornare i contenuti.

L'area gestione è una simulazione: news ed eventi inseriti dai moduli restano
salvati nel browser tramite `localStorage` e non vengono inviati a un server.

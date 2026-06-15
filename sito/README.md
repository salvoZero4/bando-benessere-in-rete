# Benessere.comune - prototipo web

Proposta responsive per il concorso "Benessere.comune" della Consulta dello
Sport di Altavilla Milicia.

## Apertura

Aprire `index.html` con un browser moderno. Il progetto funziona direttamente
con doppio clic e non richiede server, database, PHP o procedure di avvio.

## Struttura

- `index.html`: struttura semantica e contenitori delle sezioni;
- `foto.html`: fotogallery con filtri per categoria;
- `css/styles.css`: design responsive;
- `js/app.js`: rendering, ricerca e interazioni;
- `js/gallery.js`: rendering e filtri della fotogallery;
- `data/`: un file di configurazione per ogni sezione;
- `data/README.md`: istruzioni per aggiungere e rimuovere contenuti;
- `assets/loghi`: marchi degli organizzatori e dei partner.

## Aggiornamento dei contenuti

Tutti i contenuti delle sezioni, degli appuntamenti, delle news e della
fotogallery si modificano nei file della cartella `data`. Gli elenchi sono
estendibili: aggiungendo o rimuovendo oggetti dagli array, la pagina adatta
automaticamente card, numerazione, griglie, scorrimento e stati vuoti.

Non è necessario modificare HTML, CSS o JavaScript per aggiornare i contenuti.

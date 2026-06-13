# Benessere.comune - prototipo web

Proposta statica e responsive per il concorso "Benessere.comune" della
Consulta dello Sport di Altavilla Milicia.

## Apertura

Aprire `index.html` con un browser moderno. Il progetto non richiede
installazione, server, account o connessione internet.

## Struttura

- `index.html`: contenuto e struttura semantica;
- `css/styles.css`: design system, responsive design e modalità accessibili;
- `js/data.js`: dati dimostrativi separati dal layout;
- `js/app.js`: ricerca, filtri, menu mobile e simulazione CMS.

## Funzioni dimostrate

- sei aree obbligatorie del bando;
- interfaccia responsive desktop, tablet e mobile;
- ricerca trasversale;
- filtri del calendario eventi;
- schede di attività, servizi, associazioni e news;
- simulazione di aggiornamento contenuti;
- navigazione da tastiera e focus visibile;
- supporto alla riduzione delle animazioni;
- opzioni per contrasto e dimensione del testo;
- funzionamento interamente locale.

## Nota sui contenuti

Il layout, il codice e le illustrazioni vettoriali sono originali. Eventi,
attività, schede di servizio e news sono contenuti dimostrativi, chiaramente
segnalati nell'interfaccia. Prima di un'eventuale pubblicazione dovranno essere
sostituiti o validati dalla Consulta e dagli uffici competenti.

## Aggiornamento dei dati

Eventi, servizi e news si modificano in `js/data.js`. Questa separazione simula
il modello dati che, in una fase successiva, potrebbe essere collegato a un CMS
senza riprogettare l'interfaccia.

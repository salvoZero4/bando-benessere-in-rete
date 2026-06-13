# Benessere.comune - prototipo web

Proposta statica e responsive per il concorso "Benessere.comune" della
Consulta dello Sport di Altavilla Milicia.

## Apertura

Aprire `index.html` con un browser moderno. Il progetto non richiede
installazione, server, account o connessione internet.

## Struttura

- `index.html`: contenuto e struttura semantica;
- `css/styles.css`: design system, responsive design e modalità accessibili;
- `js/data.js`: dati territoriali verificati separati dal layout;
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

Il layout e il codice sono originali. Nomi, indirizzi e contatti provengono dal
bando, dal Comune di Altavilla Milicia e dall'ASP Palermo. Gli orari e i dati
non disponibili non sono stati inventati. Gli spazi fotografici saranno
completati con materiali autorizzati della Consulta o del Comune.

## Aggiornamento dei dati

Eventi, servizi e news si modificano in `js/data.js`. Questa separazione
costituisce il modello dati che, in una fase successiva, potrebbe essere
collegato a un CMS senza riprogettare l'interfaccia.

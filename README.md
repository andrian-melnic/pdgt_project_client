## Studente 
- Nome: Andrian
- Cognome: Melnic
- Matricola: 279412

# Repository del client per il progetto PDGT
### Client
  Il client è una single page application realizzata utilizzando ReactJS. Questa
libreria permette di creare una UI che si aggiorna ad ogni cambio
di stato dei suoi componenti. Inoltre ho utilizzato il framework CSS
Semantic UI nella sua versione per React per alcuni elementi dell' interfaccia.

L'app è stata inizializzata tramite `npx create-react-app` ed è costituita da diversi componenti: modal, form, bottoni, etc. ma quello principale è MapComponent che si occupa di effettuare il rendering della mappa. 

La mappa è stata realizzata grazie a una libreria JS chiamata Leaflet e 
anch'essa mette a disposizione una libreria di componenti per React. 

Elenco dei moduli npm utilizzati:

```js
"@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "leaflet": "^1.6.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-leaflet": "^2.6.3",
    "react-scripts": "3.4.1",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^0.88.2"
```
  Essenzialmente il componente principale (App) esegue il rendering della mappa 
e della barra di navigazione solamente se l'applicazione è riuscita a ottenere
la posizione dell'utente tramite browser, altrimenti mostra una pagina d'errore.

  Una volta ottenuta la posizione e i componenti figli sono stati renderizzati
nel DOM, App esegue una richiesta all server per ottenere tuttle le posizioni
e infine salvarle in un array all interno del suo stato. I componenti figli
possono accedere a tale array, e altre proprietà/ funzioni, tramite le props.
Quando le posizioni sono pronte, MapComponent aggiunge un punpo sulla mappa
per ogni posizione. 

Varie operazioni rese possibili dall'app:
  - Filtrare le posizioni da visualizzare tramite una barra di ricerca.
  - Registrarsi/ Login/ Logout.
  - Inserire una posizione tramite coordinate (loggato).
  - Selezionando un punto sulla mappa:
    - Modificare le coordinate (se loggato e proprietario).
    - Eliminare (se loggato e proprietario).
    - Iniziare la navigazione tramite Google Maps (nessuna restrizione).

L' autenticazione consiste nel salvare le info dell'utente (id, email e token)
in un React context accessibile globalmente da tutti i componenti tramite un
context provider. 

Le richieste al server API sono eseguite tramite axios.

I vari elementi UI sono stati implementati tramite Semantic UI React.

### Problemi da risolvere in futuro:
  - Il token viene perso una volta chiuso il tab o si naviga verso un altro
  sito. Utente costretto a riefettuare il login.
  - Aggiunta/ modifica posibili solamente tramite coordinate.
  - Qualche imprecisione con dispositivi touch.
  
## Utilizzo del servizio Web

### Demo
Aprire il seguente link:  https://pdgt-project-app.herokuapp.com.

Il primo avvio può sembrare lento perchè Heroku deve avviare il dyno.

L'app funziona sia su desktop che su smartphone.

### Screenshot

#### - Primo avvio (autorizzazione geolocalizzazione)
![](../screens/Annotazione%202020-04-05%20120614.png)
#### - Mappa (utente non loggato)
![](../screens/Annotazione%202020-04-05%20120633.png)
#### - Zoom e selezione posizione (non loggato)
![](../screens/Annotazione%202020-04-05%20120703.png)
#### - Navigazione con Google Maps verso il punto selezionato
![](../screens/Annotazione%202020-04-05%20120815.png)
#### - Registrazione errore (password debole)
![](../screens/Annotazione%202020-04-05%20120910.png)
#### - Registrazione errore (password non combaciano)
![](../screens/Annotazione%202020-04-05%20120947.png)
#### - Registrazione errore (utente già esistente)
![](../screens/Annotazione%202020-04-05%20121006.png)
#### - Registrato con successo
![](../screens/Annotazione%202020-04-05%20121037.png)
#### - Login errore (email o password errati)
![](../screens/Annotazione%202020-04-05%20121110.png)
#### - Mappa (utente loggato)
![](../screens/Annotazione%202020-04-05%20121123.png)
#### - Aggiungi posizione (premuto su Posizione attuale)
![](../screens/Annotazione%202020-04-05%20121149.png)
#### - Posizione aggiunta
![](../screens/Annotazione%202020-04-05%20121239.png)
#### - Modifica coordinate posizione
![](../screens/Annotazione%202020-04-05%20121505.png)
#### - Coordinate modificate
![](../screens/Annotazione%202020-04-05%20121539.png)
#### - Posizione elimiata
![](../screens/Annotazione%202020-04-05%20121557.png)
#### - Ricerca
![](../screens/Annotazione%202020-04-05%20121634.png)
![](../screens/Annotazione%202020-04-05%20121651.png)
![](../screens/Annotazione%202020-04-05%20121734.png)
![](../screens/Annotazione%202020-04-05%20121822.png)
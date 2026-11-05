# MULTIVERS — Pràctica React 6

Aplicació en React que consulta una **API pública real** per mostrar personatges de Rick and Morty. Sense cookies, sense backend propi i sense dades inventades.

## Com executar el projecte

1. Obre aquesta carpeta amb Visual Studio Code.
2. Obre un terminal a dins i executa:

   ```bash
   npm install
   npm run dev
   ```
3. Obre al navegador l'adreça que et mostra Vite (normalment `http://localhost:5173`).

> Cal tenir Node.js instal·lat i connexió a Internet. Si l'API no està disponible, l'aplicació mostrarà un error.

## L'API

- Web: https://rickandmortyapi.com/
- Endpoints utilitzats: `https://rickandmortyapi.com/api/character/` i `https://rickandmortyapi.com/api/episode/{id}`
- Documentació: https://rickandmortyapi.com/documentation
- No requereix clau ni registre.
- Retorna un objecte amb `info` (pàgines i comptador) i `results` (array de personatges).
- Accepta `page`, `name`, `status`, `species` com a paràmetres per cercar a **tota l'API**.
- Cada pàgina retorna fins a 20 personatges.

## Coneixements de classe aplicats

- `useState`: guardar personatges, favorits, filtres, càrrega i errors.
- **NOU** `useEffect`: carregar dades quan es munta l'aplicació i cada vegada que canvien els filtres o la pàgina.
- **NOU** `fetch()`, `async/await`, `try/catch/finally`, `response.ok`, `response.json()`.
- **MODALS I SEGON FETCH**: en prémer «Veure detalls» es mostra `ModalPersonatge` i es consulta el primer episodi a `/api/episode/{id}` amb un segon `useEffect` i `fetch`.
- **NOU: LINKS**: `<a href="#personatges">` i `<a href="#favorits">` naveguen a seccions. Els enllaços del modal obren la fitxa i l'episodi a l'API en una altra pestanya.
- **NOU: MODE FOSC/CLAR AMB NAVBAR**: `useState(true)` controla `temaFosc`; el botó de `Navbar.jsx` alterna les classes `tema-fosc` i `tema-clar` i el CSS canvia l'aspecte. El tema inicial és el fosc original, que ja tenia l'aplicació.
- `map()`: mostrar llistes de targetes.
- `filter()`: afegir o eliminar favorits sense duplicats.
- `props`: passar dades i funcions als components.
- `onChange`, `onSubmit`, `onClick`: cercador, filtres, botons i favorits.
- JSX condicional: càrrega, error, cap resultat, llistat, etc.

## Components

```text
src/
├── App.jsx                   # Estats, useEffect, fetch i funcionalitat
├── App.css                   # Estils
├── index.css                 # Estils globals
├── main.jsx
└── components/
    ├── ModalPersonatge.jsx   # Modal que fa el segon fetch a /episode
    ├── ModalPersonatge.css   # Estil del modal
    ├── Capcalera.jsx         # Capçalera i comptadors
    ├── Navbar.jsx            # Links i botó mode clar / mode fosc
    ├── Filtres.jsx           # Cercador i 2 selectors
    ├── LlistatPersonatges.jsx# map(), component reutilitzat per favorits
    ├── TargetaPersonatge.jsx # Cada targeta i botó favorit
    ├── Paginacio.jsx         # Següent / anterior
    └── PeuPagina.jsx
```

## Funcionament dels filtres

El nom s'aplica en prémer **Cerca** o Enter. L'estat i l'espècie s'apliquen immediatament. Les cerques es fan a l'API (no només als 20 elements de la pàgina visible). Quan canvies de filtre es torna a la pàgina 1.

Els favorits es guarden amb `useState`. **Es perdran en refrescar la pàgina** perquè la pràctica no fa servir cookies, `localStorage` ni cap base de dades.

## Detalls tècnics

- L'API retorna `404` si la cerca no té resultats: ho tractem com una llista buida.
- La resta d'errors de xarxa apareixen en pantalla.
- El disseny s'adapta a ordinador, tauleta i mòbil.
- Els noms, les imatges i les dades provenen de la Rick and Morty API; pertanyen als seus titulars.

## Com funciona el modal de detalls

1. Clica **Veure detalls** en qualsevol personatge, també als favorits.
2. `App.jsx` desa el personatge amb `setPersonatgeSeleccionat(personatge)`.
3. Apareix `ModalPersonatge.jsx` i mostra les dades que ja teníem.
4. El `useEffect` del modal executa **un altre `fetch(personatge.episode[0])`**. Aquesta URL apunta a l'endpoint `/api/episode/{id}` de la **mateixa API**.
5. Amb `setEpisodi(data)` mostrem el nom, el codi de temporada/episodi i la data d'emissió del primer episodi on apareix.
6. Es pot tancar amb el botó, prement Esc o fent clic fora del requadre.

Els dos `fetch()` són diferents: el primer carrega els personatges i el segon es fa només en obrir el modal. No calen cookies ni cap base de dades.

## Novetat: links i mode fosc

- **Links interns**: a la capçalera `Personatges` i `Favorits` utilitzen `<a href="#personatges">` i `<a href="#favorits">`. Les seccions tenen `id` perquè l'enllaç hi porti (sense recarregar la pàgina).
- **Links externs**: el modal incorpora dos enllaços a les dades JSON oficials (personatge i primer episodi) en una altra pestanya, amb `target="_blank"` i `rel="noopener noreferrer"`. El footer també enllaça l'API i la documentació.
- **Mode fosc / clar**: el botó del component `Navbar.jsx` canvia l'estat `temaFosc` del component `App`. Es posa `className="aplicacio tema-fosc"` o `"aplicacio tema-clar"`; els estils de `App.css` ho adapten. El tema inicial és fosc per respectar el disseny preexistent. Sense cookies, `localStorage` ni noves dependències: en refrescar torna al fosc.

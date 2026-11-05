import { useState, useEffect } from 'react';
import './App.css';

import Capcalera from './components/Capcalera';
import Filtres from './components/Filtres';
import LlistatPersonatges from './components/LlistatPersonatges';
import Paginacio from './components/Paginacio';
import PeuPagina from './components/PeuPagina';
import ModalPersonatge from './components/ModalPersonatge';

function App() {
  const [temaFosc, setTemaFosc] = useState(true);
  const [personatges, setPersonatges] = useState([]);
  const [favorits, setFavorits] = useState([]);
  const [personatgeSeleccionat, setPersonatgeSeleccionat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [intents, setIntents] = useState(0);

  const [pagina, setPagina] = useState(1);
  const [paginesTotals, setPaginesTotals] = useState(1);
  const [total, setTotal] = useState(0);

  const [nomInput, setNomInput] = useState('');
  const [nomBuscat, setNomBuscat] = useState('');
  const [estatActiu, setEstatActiu] = useState('Tots');
  const [especieActiva, setEspecieActiva] = useState('Totes');

  // NOU A CLASSE: useEffect i fetch per carregar dades d'una API.
  // Es torna a executar quan canvia la pàgina o algun filtre.
  useEffect(() => {
    async function carregarPersonatges() {
      setLoading(true);
      setError('');

      let url = 'https://rickandmortyapi.com/api/character/?page=' + pagina;

      if (nomBuscat.trim() !== '') {
        url += '&name=' + encodeURIComponent(nomBuscat.trim());
      }
      if (estatActiu !== 'Tots') {
        url += '&status=' + estatActiu;
      }
      if (especieActiva !== 'Totes') {
        url += '&species=' + especieActiva;
      }

      try {
        const response = await fetch(url);

        // Aquesta API retorna 404 si no hi ha personatges que coincideixin.
        if (response.status === 404) {
          setPersonatges([]);
          setTotal(0);
          setPaginesTotals(1);
          return;
        }

        if (!response.ok) {
          throw new Error('Error en carregar els personatges.');
        }

        const data = await response.json();
        setPersonatges(data.results);
        setTotal(data.info.count);
        setPaginesTotals(data.info.pages);
      } catch (err) {
        console.error(err);
        setError('No s\'han pogut carregar els personatges. Comprova la connexió i torna-ho a provar.');
      } finally {
        setLoading(false);
      }
    }

    carregarPersonatges();
  }, [pagina, nomBuscat, estatActiu, especieActiva, intents]);

  function buscarNom(event) {
    event.preventDefault();
    setPagina(1);
    setNomBuscat(nomInput);
  }

  function canviarEstat(event) {
    setEstatActiu(event.target.value);
    setPagina(1);
  }

  function canviarEspecie(event) {
    setEspecieActiva(event.target.value);
    setPagina(1);
  }

  function netejarFiltres() {
    setNomInput('');
    setNomBuscat('');
    setEstatActiu('Tots');
    setEspecieActiva('Totes');
    setPagina(1);
  }

  function canviarFavorit(personatge) {
    const repetit = favorits.filter((favorit) => favorit.id === personatge.id);

    if (repetit.length > 0) {
      setFavorits(favorits.filter((favorit) => favorit.id !== personatge.id));
    } else {
      setFavorits([...favorits, personatge]);
    }
  }

  return (
    <div className={'aplicacio ' + (temaFosc ? 'tema-fosc' : 'tema-clar')}>
      <Capcalera
        total={total}
        favorits={favorits.length}
        temaFosc={temaFosc}
        setTemaFosc={setTemaFosc}
      />

      <main className="contenidor contingut">
        <Filtres
          nomInput={nomInput}
          setNomInput={setNomInput}
          estatActiu={estatActiu}
          canviarEstat={canviarEstat}
          especieActiva={especieActiva}
          canviarEspecie={canviarEspecie}
          buscarNom={buscarNom}
          netejarFiltres={netejarFiltres}
        />

        <section className="seccio-personatges" id="personatges">
          <div className="titol-seccio">
            <div>
              <p className="etiqueta">LA TEVA EXPLORACIÓ</p>
              <h2>Personatges <span>descoberts</span></h2>
            </div>
            {!loading && !error && (
              <span className="total-resultats">{total} resultats</span>
            )}
          </div>

          {loading && (
            <div className="missatge-estat">
              <span className="carregant-icon">◌</span>
              <h3>Obrint un portal...</h3>
              <p>Carregant personatges des de l'API.</p>
            </div>
          )}

          {error !== '' && (
            <div className="missatge-estat">
              <span className="missatge-icon">!</span>
              <h3>Hi ha hagut un problema</h3>
              <p>{error}</p>
              <button type="button" onClick={() => setIntents(intents + 1)}>Torna-ho a provar</button>
            </div>
          )}

          {!loading && error === '' && personatges.length === 0 && (
            <div className="missatge-estat">
              <span className="missatge-icon">⌕</span>
              <h3>No hem trobat cap personatge</h3>
              <p>Prova de canviar els filtres o el nom de la cerca.</p>
              <button type="button" onClick={netejarFiltres}>Neteja filtres</button>
            </div>
          )}

          {!loading && error === '' && personatges.length > 0 && (
            <>
              <LlistatPersonatges
                personatges={personatges}
                favorits={favorits}
                canviarFavorit={canviarFavorit}
                obrirDetalls={setPersonatgeSeleccionat}
              />
              <Paginacio pagina={pagina} paginesTotals={paginesTotals} setPagina={setPagina} />
            </>
          )}
        </section>

        <section className="seccio-favorits" id="favorits">
          <div className="titol-seccio">
            <div>
              <p className="etiqueta">LA TEVA COL·LECCIÓ</p>
              <h2>Els meus <span>favorits</span></h2>
            </div>
            <span className="total-resultats">{favorits.length} guardats</span>
          </div>

          {favorits.length === 0 ? (
            <div className="favorits-buits">
              <span>♡</span>
              <p>Encara no tens cap favorit. Clica el cor d'una targeta per afegir-lo aquí.</p>
            </div>
          ) : (
            <LlistatPersonatges
              personatges={favorits}
              favorits={favorits}
              canviarFavorit={canviarFavorit}
              obrirDetalls={setPersonatgeSeleccionat}
            />
          )}
        </section>
      </main>

      <PeuPagina />

      {personatgeSeleccionat !== null && (
        <ModalPersonatge
          key={personatgeSeleccionat.id}
          personatge={personatgeSeleccionat}
          tancarModal={() => setPersonatgeSeleccionat(null)}
        />
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './ModalPersonatge.css';

function ModalPersonatge({ personatge, tancarModal }) {
  const [episodi, setEpisodi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // SEGON FETCH: consultem un altre endpoint de la MATEIXA API.
  // La primera API (/character) ja ens dona la URL del primer episodi.
  useEffect(() => {
    async function carregarEpisodi() {
      setLoading(true);
      setError('');

      try {
        const url = personatge.episode[0];
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error en carregar l'episodi.");
        }

        const data = await response.json();
        setEpisodi(data);
      } catch (err) {
        console.error(err);
        setError("No s'ha pogut carregar la informació de l'episodi.");
      } finally {
        setLoading(false);
      }
    }

    if (personatge.episode.length > 0) {
      carregarEpisodi();
    } else {
      setLoading(false);
      setEpisodi(null);
    }
  }, [personatge]);

  // Permet tancar el modal amb Escape i impedeix que la pàgina es mogui al fons.
  useEffect(() => {
    const estilAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function teclaPremuda(event) {
      if (event.key === 'Escape') {
        tancarModal();
      }
    }

    document.addEventListener('keydown', teclaPremuda);
    return () => {
      document.removeEventListener('keydown', teclaPremuda);
      document.body.style.overflow = estilAnterior;
    };
  }, [tancarModal]);

  let estatText = 'Desconegut';
  let classeEstat = 'desconegut';

  if (personatge.status === 'Alive') {
    estatText = 'Viu';
    classeEstat = 'viu';
  }

  if (personatge.status === 'Dead') {
    estatText = 'Mort';
    classeEstat = 'mort';
  }

  return (
    <div className="modal-fons" onClick={tancarModal}>
      <div
        className="modal-caixa"
        role="dialog"
        aria-modal="true"
        aria-label={'Detalls de ' + personatge.name}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-tancar"
          onClick={tancarModal}
          aria-label="Tanca els detalls"
        >
          ×
        </button>

        <div className="modal-capcalera">
          <img src={personatge.image} alt={personatge.name} />
          <div>
            <p className="modal-etiqueta">FITXA DEL PERSONATGE #{personatge.id}</p>
            <h2>{personatge.name}</h2>
            <span className={'xapa-estat modal-estat ' + classeEstat}>
              <span className="xapa-punt"></span>{estatText}
            </span>
          </div>
        </div>

        <div className="modal-dades">
          <div><span>Espècie</span><strong>{personatge.species}</strong></div>
          <div><span>Gènere</span><strong>{personatge.gender}</strong></div>
          <div><span>Origen</span><strong>{personatge.origin.name}</strong></div>
          <div><span>Última ubicació</span><strong>{personatge.location.name}</strong></div>
          <div><span>Aparicions</span><strong>{personatge.episode.length} episodis</strong></div>
          <div><span>Tipus</span><strong>{personatge.type || 'No especificat'}</strong></div>
        </div>

        <div className="modal-episodi">
          <p className="modal-etiqueta">NOVA CONSULTA A L'API · /episode</p>
          <h3>Primer episodi on apareix</h3>

          {loading && <p className="modal-missatge">Carregant informació de l'episodi...</p>}
          {error !== '' && <p className="modal-error">{error}</p>}
          {!loading && error === '' && episodi === null && (
            <p className="modal-missatge">No hi ha cap episodi disponible.</p>
          )}
          {!loading && error === '' && episodi !== null && (
            <div className="modal-episodi-dades">
              <strong>{episodi.name}</strong>
              <p>Temporada i episodi: <b>{episodi.episode}</b></p>
              <p>Data d'emissió: <b>{episodi.air_date}</b></p>
              <a className="enllac-api" href={episodi.url} target="_blank" rel="noopener noreferrer">
                Veure dades de l'episodi a l'API ↗
              </a>
            </div>
          )}
        </div>

        <a className="enllac-api enllac-fitxa" href={personatge.url} target="_blank" rel="noopener noreferrer">
          Veure fitxa del personatge a l'API ↗
        </a>

        <button type="button" className="modal-boto-final" onClick={tancarModal}>
          Tancar detalls
        </button>
      </div>
    </div>
  );
}

export default ModalPersonatge;

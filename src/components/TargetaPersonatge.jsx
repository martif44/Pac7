function TargetaPersonatge({ personatge, esFavorit, canviarFavorit, obrirDetalls }) {
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
    <article className="targeta-personatge">
      <div className="targeta-imatge">
        <img src={personatge.image} alt={personatge.name} loading="lazy" />
        <span className={'xapa-estat ' + classeEstat}>
          <span className="xapa-punt"></span>{estatText}
        </span>
        <button
          type="button"
          className={'boto-cor ' + (esFavorit ? 'seleccionat' : '')}
          onClick={() => canviarFavorit(personatge)}
          aria-label={esFavorit ? 'Treure de favorits' : 'Afegir a favorits'}
          title={esFavorit ? 'Treure de favorits' : 'Afegir a favorits'}
        >
          {esFavorit ? '♥' : '♡'}
        </button>
      </div>

      <div className="targeta-informacio">
        <span className="id-personatge">PERSONATGE #{String(personatge.id).padStart(3, '0')}</span>
        <h3>{personatge.name}</h3>
        <div className="targeta-dades">
          <div><span>Espècie</span><strong>{personatge.species}</strong></div>
          <div><span>Origen</span><strong title={personatge.origin.name}>{personatge.origin.name}</strong></div>
        </div>
        <button
          type="button"
          className="boto-detalls"
          onClick={() => obrirDetalls(personatge)}
        >
          Veure detalls <span>↗</span>
        </button>
      </div>
    </article>
  );
}

export default TargetaPersonatge;

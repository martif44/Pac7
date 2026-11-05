function Filtres({
  nomInput, setNomInput, estatActiu, canviarEstat,
  especieActiva, canviarEspecie, buscarNom, netejarFiltres
}) {
  return (
    <section className="panell-filtres" aria-label="Filtres dels personatges">
      <div className="filtres-cap">
        <div>
          <p className="etiqueta">EXPLORA EL MULTIVERS</p>
          <h2>Troba el teu personatge</h2>
        </div>
        <button className="boto-netejar" type="button" onClick={netejarFiltres}>
          Neteja filtres ↗
        </button>
      </div>

      <form className="filtres-graella" onSubmit={buscarNom}>
        <div className="camp camp-nom">
          <label htmlFor="nom">Nom del personatge</label>
          <input
            id="nom"
            type="text"
            placeholder="Ex. Rick, Morty, Summer..."
            value={nomInput}
            onChange={(event) => setNomInput(event.target.value)}
          />
        </div>

        <div className="camp">
          <label htmlFor="estat">Estat</label>
          <select id="estat" value={estatActiu} onChange={canviarEstat}>
            <option value="Tots">Tots els estats</option>
            <option value="alive">Viu</option>
            <option value="dead">Mort</option>
            <option value="unknown">Desconegut</option>
          </select>
        </div>

        <div className="camp">
          <label htmlFor="especie">Espècie</label>
          <select id="especie" value={especieActiva} onChange={canviarEspecie}>
            <option value="Totes">Totes les espècies</option>
            <option value="Human">Humà</option>
            <option value="Alien">Alienígena</option>
            <option value="Humanoid">Humanoide</option>
            <option value="Robot">Robot</option>
            <option value="Animal">Animal</option>
          </select>
        </div>

        <button className="boto-cercar" type="submit">Cerca <span>→</span></button>
      </form>
    </section>
  );
}

export default Filtres;

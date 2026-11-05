function Capcalera({ total, favorits }) {
  return (
    <header className="capcalera">
      <div className="nav contenidor">
        <div className="marca">
          <span className="marca-icon">✳</span>
          <span>MULTIVERS<span className="marca-punt">.</span></span>
        </div>
        <div className="nav-dreta">
          <span className="estat-api"><span className="punt-live"></span> API EN DIRECTE</span>
          <span className="nav-favorits">♡ {favorits} favorits</span>
        </div>
      </div>

      <div className="hero contenidor">
        <p className="sobretitol">PROJECTE REACT · PRÀCTICA 06</p>
        <h1>Un univers.<br /><span>Infinites versions.</span></h1>
        <p className="hero-descripcio">
          Explora els personatges de Rick and Morty, descobreix d'on venen
          i guarda els que més t'agradin.
        </p>
        <div className="hero-indicadors">
          <div className="indicador">
            <strong>{total}</strong>
            <span>Personatges a l'API</span>
          </div>
          <div className="separador-indicadors"></div>
          <div className="indicador">
            <strong>{favorits}</strong>
            <span>Els teus favorits</span>
          </div>
          <div className="separador-indicadors"></div>
          <div className="indicador">
            <strong>LIVE</strong>
            <span>Dades en temps real</span>
          </div>
        </div>
        <div className="hero-decoracio hero-orbita-1"></div>
        <div className="hero-decoracio hero-orbita-2"></div>
        <div className="hero-planeta">✳</div>
      </div>
    </header>
  );
}

export default Capcalera;

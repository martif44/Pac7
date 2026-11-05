import Navbar from './Navbar';

function Capcalera({ total, favorits, temaFosc, setTemaFosc }) {
  return (
    <header className="capcalera" id="inici">
      <Navbar
        favorits={favorits}
        temaFosc={temaFosc}
        setTemaFosc={setTemaFosc}
      />

      <div className="hero contenidor">
        <p className="sobretitol">PROJECTE REACT · PRÀCTICA 06</p>
        <h1>Un univers.<br /><span>Infinites versions.</span></h1>
        <p className="hero-descripcio">
          Explora els personatges de Rick and Morty, descobreix d'on venen
          i guarda els que més t'agradin.
        </p>
        <div className="hero-indicadors">
          <div className="indicador"><strong>{total}</strong><span>Personatges trobats</span></div>
          <div className="separador-indicadors"></div>
          <div className="indicador"><strong>{favorits}</strong><span>Els teus favorits</span></div>
          <div className="separador-indicadors"></div>
          <div className="indicador"><strong>LIVE</strong><span>Dades de l'API</span></div>
        </div>
        <div className="hero-decoracio hero-orbita-1"></div>
        <div className="hero-decoracio hero-orbita-2"></div>
        <div className="hero-planeta">✳</div>
      </div>
    </header>
  );
}

export default Capcalera;

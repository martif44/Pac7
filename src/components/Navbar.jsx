function Navbar({ favorits, temaFosc, setTemaFosc }) {
  function canviarTema() {
    setTemaFosc(!temaFosc);
  }

  return (
    <div className="nav contenidor">
      <a className="marca" href="#inici" aria-label="Torna a l'inici">
        <span className="marca-icon">✳</span>
        <span>MULTIVERS<span className="marca-punt">.</span></span>
      </a>

      <nav className="nav-dreta" aria-label="Navegació principal">
        <a className="nav-enllac" href="#personatges">Personatges</a>
        <a className="nav-enllac nav-favorits" href="#favorits">♡ Favorits ({favorits})</a>

        <button
          type="button"
          className="boto-tema"
          onClick={canviarTema}
          aria-label={temaFosc ? 'Canvia al mode clar' : 'Canvia al mode fosc'}
          aria-pressed={!temaFosc}
        >
          {temaFosc ? '☀ Mode clar' : '☾ Mode fosc'}
        </button>
      </nav>
    </div>
  );
}

export default Navbar;

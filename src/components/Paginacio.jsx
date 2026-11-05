function Paginacio({ pagina, paginesTotals, setPagina }) {
  if (paginesTotals <= 1) return null;

  return (
    <div className="paginacio">
      <button
        type="button"
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
      >← Anterior</button>

      <span>Pàgina <strong>{pagina}</strong> de {paginesTotals}</span>

      <button
        type="button"
        disabled={pagina === paginesTotals}
        onClick={() => setPagina(pagina + 1)}
      >Següent →</button>
    </div>
  );
}

export default Paginacio;

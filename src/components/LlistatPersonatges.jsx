import TargetaPersonatge from './TargetaPersonatge';

function LlistatPersonatges({ personatges, favorits, canviarFavorit, obrirDetalls }) {
  return (
    <div className="graella-personatges">
      {personatges.map((personatge) => (
        <TargetaPersonatge
          key={personatge.id}
          personatge={personatge}
          esFavorit={favorits.filter((favorit) => favorit.id === personatge.id).length > 0}
          canviarFavorit={canviarFavorit}
          obrirDetalls={obrirDetalls}
        />
      ))}
    </div>
  );
}

export default LlistatPersonatges;

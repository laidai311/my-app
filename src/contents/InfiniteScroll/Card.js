export const Card = ({ character }) => {
  return (
    <div className="card">
      <img
        src={character.image}
        alt={character.name}
        width={50}
        loading="lazy"
      />
      <p>{character.name}</p>
    </div>
  );
};

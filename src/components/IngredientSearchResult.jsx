export default function IngredientSearchResult({ onSelect, name }) {
  return (
    <div className="p-2 bg-blue-200" onClick={onSelect}>
      {name}
    </div>
  );
}

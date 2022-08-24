export default function RecipeMetaData({ label, quantity }) {
  return (
    <div className="text-center">
      <p className="text-5xl">{quantity}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

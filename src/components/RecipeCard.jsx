export default function RecipeCard({
  recipe: { name, description, imageURL },
}) {
  return (
    <div className="flex flex-col w-60 bg-gray-100 p-3">
      <img
        className="aspect-video bg-gray-300"
        src={imageURL}
        alt={`Image of ${name}`}
      />
      <h1 className="text-center border-b border-gray-700">{name}</h1>
      <p>{description}</p>
    </div>
  );
}

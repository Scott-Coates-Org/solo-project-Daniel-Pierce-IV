import { Link } from 'react-router-dom';

export default function RecipeCard({
  recipe: { id, name, description, imageURL },
}) {
  return (
    <Link
      to={`/recipes/${id}`}
      className="group flex flex-col gap-2 text-gray-300 w-44 p-4 pt-0 rounded-[30px] transition-colors bg-recipe-gray-light hover:bg-recipe-gray-lighter "
    >
      {/* adjust image-to-card-background ratio with margin */}
      <div className="flex justify-center mx-2">
        <img
          className="relative w-1/2 aspect-square rounded-full scale-[200%] transition-transform -translate-y-1/2 group-hover:-translate-y-2/3"
          src={imageURL}
          alt={`Image of ${name}`}
        />
      </div>

      <h1>{name}</h1>
      <p className="text-sm">{description}</p>
    </Link>
  );
}

export default function RecipeIngredientInfo({ ingredients }) {
  return (
    <div className="flex flex-col gap-4 relative p-4 text-white bg-recipe-gray rounded-3xl">
      <div className="text-4xl text-center">Ingredients</div>

      <div className="relative grow w-[45ch] overflow-y-scroll recipe-scrollbar">
        <ul className="absolute inset-0 flex flex-col gap-2 ">
          {ingredients.map((ingredient, i) => (
            <li key={i} className="">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

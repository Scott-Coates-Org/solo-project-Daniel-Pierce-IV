export default function IngredientFilterContainer({
  label,
  children: ingredientFilters,
}) {
  return (
    <div className="h-full flex flex-col bg-recipe-gray-light rounded-xl text-white p-4">
      <h3 className="text-2xl">{label}</h3>

      {/* rtl with ltr reversal for left-side scrollbar */}
      <div
        className="grow relative overflow-y-scroll ingredient-scrollbar"
        dir="rtl"
      >
        <ul className="flex flex-col gap-2 p-3 absolute inset-0" dir="ltr">
          {ingredientFilters}
        </ul>
      </div>
    </div>
  );
}

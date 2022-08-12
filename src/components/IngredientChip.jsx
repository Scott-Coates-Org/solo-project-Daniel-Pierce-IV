export default function IngredientChip({ children }) {
  const inlineCloseSVG = (
    <svg className="w-6 h-6 rounded-full bg-gray-200" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </svg>
  );

  return (
    <li className="ingredient-chip rounded-full flex gap-4 bg-green-400 px-2 py-0.5">
      <span className="text-black text-xl">{children}</span>
      <button className="text-gray-600">{inlineCloseSVG}</button>
    </li>
  );
}

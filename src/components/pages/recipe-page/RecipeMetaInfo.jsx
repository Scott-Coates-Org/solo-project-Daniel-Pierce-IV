export default function RecipeMetaInfo({ children, className }) {
  return (
    <div
      className={`${className} flex flex-wrap gap-8 justify-around p-4 text-white bg-recipe-gray rounded-3xl`}
    >
      {children}
    </div>
  );
}

// Filter out all recipes that do not include every must-have ingredient
function applyMustHaveFilters(mustHaveFilters, recipeMapping) {
  return mustHaveFilters.every((filter) =>
    recipeMapping.ingredientIds.includes(filter.id)
  );
}

export default function filterRecipes(recipeMappings, { mustHave }) {
  let filteredRecipes = recipeMappings.slice();

  // All valid recipes must contain every must-have ingredient
  if (mustHave.length > 0) {
    filteredRecipes = filteredRecipes.filter(
      applyMustHaveFilters.bind(null, mustHave)
    );
  }

  return filteredRecipes;
}

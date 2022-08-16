// Filter out all recipes that do not include every must-have ingredient
function applyMustHaveFilters(mustHaveFilters, recipeMapping) {
  return mustHaveFilters.every((filter) =>
    recipeMapping.ingredientIds.includes(filter.id)
  );
}

// Filter out all recipes that include any cant-have ingredient
function applyCantHaveFilters(cantHaveFilters, recipeMapping) {
  return !cantHaveFilters.some((filter) =>
    recipeMapping.ingredientIds.includes(filter.id)
  );
}

// Filter out all recipes that that arent a subset of can-have ingredients
function applyCanHaveFilters(canHaveFilters, recipeMapping) {
  const ids = canHaveFilters.map((filter) => filter.id);
  return recipeMapping.ingredientIds.every((id) => ids.includes(id));
}

export default function filterRecipes(
  recipeMappings,
  { mustHave, cantHave, canHave }
) {
  let filteredRecipes = recipeMappings.slice();

  // All valid recipes must contain every must-have ingredient
  if (mustHave.length > 0) {
    filteredRecipes = filteredRecipes.filter(
      applyMustHaveFilters.bind(null, mustHave)
    );
  }

  // No valid recipes can contain any cant-have ingredient
  if (cantHave.length > 0) {
    filteredRecipes = filteredRecipes.filter(
      applyCantHaveFilters.bind(null, cantHave)
    );
  }

  // All valid recipes must only contain ingredients from the
  // can-have / must-have ingredients
  // NOTE: Assumes no can-haves means user wants all recipes
  if (canHave.length > 0) {
    filteredRecipes = filteredRecipes.filter(
      applyCanHaveFilters.bind(null, canHave.concat(mustHave))
    );
  }

  return filteredRecipes;
}

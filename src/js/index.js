import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import { elements, spinner, clearSpinner } from './views/base';

/** Global state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * Search controller
 */
const onSearchSubmit = async () => {
  // Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // New search object and add it to the state
    state.search = new Search(query);

    // Clearing the UI and showing the spinner
    searchView.clearInput();
    searchView.clearResults();
    spinner(elements.searchResults);

    try {
      // Search for the recipes
      await state.search.getResults();

      // Render the results
      clearSpinner();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.error(err);
      alert('Something went wrong... Please try again.');
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  onSearchSubmit();
});

elements.resultsPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
  // Get the id from the URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare the UI for changes
    recipeView.clearRecipe();
    spinner(elements.recipe);

    // Highlight the selected recipe
    if (state.search) searchView.highlightSelected(id);

    // Create a new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get the recipe data and parse the ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Call the calculation methods
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render the recipe
      clearSpinner();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.error(err);
      clearSpinner();
      alert('Something went wrong... Please try again.');
    }
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/**
 * Shopping list controller
 */
const controlShoppingList = async () => {
  // Create a new list if there is none
  if (!state.shoppingList) state.shoppingList = new ShoppingList();

  // Add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.shoppingList.addItem(el.amount, el.unit, el.ingredient);
    shoppingListView.renderItem(item);
  });
};

// The shopping list delete and update buttons event listeners
elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Delete button and updating the amount
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from the state
    state.shoppingList.deleteItem(id);
    // Delete from the UI
    shoppingListView.deleteItem(id);
  } else if (e.target.matches('.shopping__amount-value')) {
    const value = parseFloat(e.target.value, 10);
    state.shoppingList.updateAmount(id, value);
  }
});

// Recipe buttons event listeners
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlShoppingList();
  }
});

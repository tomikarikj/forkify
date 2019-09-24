import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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

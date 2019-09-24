import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, spinner, clearSpinner } from './views/base';

/** Global state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// Form submit
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

    // Search for the recipes
    await state.search.getResults();

    // Render the results
    clearSpinner();
    searchView.renderResults(state.search.result);
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

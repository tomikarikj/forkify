import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
};
export const clearResults = () => {
  elements.resultsList.innerHTML = '';
  elements.resultsPages.innerHTML = '';
};

const shortenTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current);
      }
      return accumulator + current.length;
    }, 0);

    return `${newTitle.join(' ')}...`;
  }

  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${shortenTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

const createBtn = (page, btnType) => `
  <button class="btn-inline results__btn--${btnType}" data-goto=${
  btnType === 'prev' ? page - 1 : page + 1
}>
    <span>Page ${btnType === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        btnType === 'prev' ? 'left' : 'right'
      }"></use>
    </svg>
  </button>
`;

const renderBtns = (page, numOfRecipes, recipesPerPage) => {
  const pages = Math.ceil(numOfRecipes / recipesPerPage);
  let btn;

  if (page === 1 && pages > 1) {
    // Button to go the next page
    btn = createBtn(page, 'next');
  } else if (page < pages) {
    // Both buttons
    btn = `
      ${createBtn(page, 'prev')}
      ${createBtn(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Button to go to the previous page
    btn = createBtn(page, 'prev');
  }

  elements.resultsPages.insertAdjacentHTML('afterbegin', btn);
};

export const renderResults = (recipes, page = 1, recipesPerPage = 10) => {
  const start = (page - 1) * recipesPerPage;
  const end = page * recipesPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  renderBtns(page, recipes.length, recipesPerPage);
};

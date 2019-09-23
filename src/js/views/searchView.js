import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
};
export const clearResults = () => {
  elements.resultsList.innerHTML = '';
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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};

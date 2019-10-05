import { elements } from './base';
import Fraction from 'fraction.js';

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};

const formatAmount = amount => {
  if (amount) {
    // amount = 2.5 --> 2 1/2
    // amount = 0.5 --> 1/2
    const [int, dec] = amount
      .toString()
      .split('.')
      .map(number => parseInt(number, 10));

    if (!dec) return amount;

    if (int === 0) {
      const fr = new Fraction(amount);
      return `${fr.n}/${fr.d}`;
    } else {
      const fr = new Fraction(amount - int);
      return `${int} ${fr.n}/${fr.d}`;
    }
  }

  return '?';
};

const createIngredient = ingredient => `
  <li class="recipe__item">
    <svg class="recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__amount">${formatAmount(ingredient.amount)}</div>
    <div class="recipe__ingredient">
      <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
  </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.prepTime
        }</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text"> servings</span>
        <div class="recipe__info-buttons">
          <button class="btn-tiny btn-decrease">
            <svg>
              <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
          </button>
          <button class="btn-tiny btn-increase">
            <svg>
              <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart${
            isLiked ? '' : '-outlined'
          }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ingredient => createIngredient(ingredient))
          .join(' ')}
      </ul>
      <button class="btn-small recipe__btn--add">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
      </button>
    </div>
    <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was published by
        <span class="recipe__by">${
          recipe.author
        }</span>. Please check out the directions on their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
      </a>
    </div>
  `;

  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
  // Update servings
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;

  // Update ingredeints
  const amountElements = Array.from(
    document.querySelectorAll('.recipe__amount')
  );
  amountElements.forEach((el, i) => {
    el.textContent = formatAmount(recipe.ingredients[i].amount);
  });
};

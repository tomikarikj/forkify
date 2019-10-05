import { elements } from './base';
import { shortenTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numOfLikes => {
  elements.likesMenu.style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikedRecipes = likedRecipe => {
  const markup = `
    <li>
      <a class="likes__link" href="#${likedRecipe.id}">
        <figure class="likes__fig">
          <img src="${likedRecipe.image}" alt="${likedRecipe.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${shortenTitle(likedRecipe.title)}</h4>
          <p class="likes__author">${likedRecipe.author}</p>
        </div>
      </a>
    </li>
  `;

  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`)
    .parentElement;

  if (el) el.parentElement.removeChild(el);
};

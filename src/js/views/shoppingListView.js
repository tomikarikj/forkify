import { elements } from './base';

export const renderItem = item => {
  const markup = `
    <li class="shopping__item" data-itemId=${item.id}>
      <div class="shopping__amount">
        <input type="number" value="${item.amount}" step="${item.amount}" class="shopping__amount-value">
        <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingr}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  `;

  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemId="${id}"]`);
  item.parentElement.removeChild(item);
};

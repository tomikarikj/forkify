export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results'),
  resultsList: document.querySelector('.results__list'),
  resultsPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

export const classNames = {
  spinner: 'spinner'
};

export const spinner = parent => {
  const spinner = `
    <div class="${classNames.spinner}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', spinner);
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.${classNames.spinner}`);
  if (spinner) spinner.parentElement.removeChild(spinner);
};

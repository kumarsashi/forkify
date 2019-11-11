export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    resultList : document.querySelector('.results__list'),
    result : document.querySelector('.results'),
    searchResPages : document.querySelector('.results__pages'),
    recipeDiv: document.querySelector('.recipe')
}

export const renderLoader = parent => {
    const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if( loader ) {
        loader.parentElement.removeChild(loader);
    }
}
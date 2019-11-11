import { elements } from './base';
import { create } from 'domain';

export const getInput = () => {
   return  elements.searchInput.value;
};

export const clearInput = () => {
   elements.searchInput.value = '';
};

export const clearResults = () => {
   let parent = elements.resultList;
   while(parent.firstChild) {
        parent.firstChild.remove();
   }
}

export const clearPaginationButtons = () => {
   let parent = elements.searchResPages;
   console.log(parent);
   while( parent.firstChild ) {
      parent.firstChild.remove();
   }
}

const limitRecipeTitle = (title, limit=20) => {
   const newTitle = [];
   if(title.length > limit) {
      title.split(' ').reduce((acc, cur) => {
         if( acc + cur.length <= limit ){
            newTitle.push(cur);
            
         }
         return acc + cur.length;
      },0);
      return `${newTitle.join(' ')}...`;
   }
   return title;
}


const renderRecipe = recipe => {
   const markup = `<li>
         <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
               <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
               <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
               <p class="results__author">${recipe.publisher}</p>
            </div>
         </a>
          </li>`;
   elements.resultList.insertAdjacentHTML('beforeend',markup);
      
}

// type : prev or next
const createButton = (page, type) => 

                  ` <button class="btn-inline results__btn--${type}" data-goto=${type == 'prev' ? page -1 : page + 1 }>
                        <svg class="search__icon">
                           <use href="img/icons.svg#icon-triangle-${ type == "prev" ? 'left' : 'right'}"></use>
                        </svg>
                        <span>Page ${type == 'prev' ? page - 1 : page + 1 }</span>
                  </button>
               `;


export const renderPageButtons = ( page, numResults, resPerPage ) => {
   let totalPages = Math.ceil( numResults / resPerPage );
   let button;
   if( page === 1 && totalPages > 1 ) {
      // Display only next button
      button = createButton(page, 'next');
   } else if ( page > 1 && page < totalPages ) {
      // display both buttons
      button = `
               ${createButton(page, 'prev')}
               ${createButton(page, 'next')}`;

   } else if ( page == totalPages ) {
      // display only left button

      button = createButton(page, 'prev');
   }

   elements.searchResPages.insertAdjacentHTML('afterbegin',button);


}
export const renderResults = (recipes, page = 1, resPerPage = 10)  => {

   let start = (page - 1) * resPerPage;
   let end = page * resPerPage;

   recipes.slice(start,end).forEach(renderRecipe);

   // Render pagination buttons
   renderPageButtons(page, recipes.length, resPerPage);
   
}
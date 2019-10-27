import { elements } from './base';

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
         <a class="results__link results__link--active" href="${recipe.recipe_id}">
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
export const renderResults = recipes => {
   recipes.forEach(renderRecipe);
}
import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';

/**
 * - Global state of the app
 * - Search object
 * - current recipe object
 * - shopping list object
 * - Liked recipes
 */

const state = {};

const ControlSearch = async () => {
    
    //1. Get the query word
    const query = searchView.getInput();
    

    if(query) {

        //2. New search object and add it to state
        state.search = new Search(query);
       
        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.result);

        //4. Search for recpies
        await state.search.getResults();

        clearLoader();
        console.log('waiting for await function to finish');
        //5. Render results in UI
       // console.log(state);
        searchView.renderResults(state.search.result);
        console.log('results rendered');

       
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ControlSearch();
})

//console.log(res);

elements.searchResPages.addEventListener('click',(e) => {
    let button = e.target.closest('.btn-inline');
    if(button) {
        let goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.clearPaginationButtons();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
})

/**
 * Recipe controller
 * 
 */

 const r = new Recipe(47746);
 r.getRecipe();
 console.log(r);
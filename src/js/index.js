import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

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
    console.log(query);

    if(query) {
        //2. New search object and add it to state
        state.search = new Search(query);

        //3. Prepare UI for results

        //4. Search for recpies
        await state.search.getResults();

        //5. Render results in UI
       // console.log(state);
        console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ControlSearch();
})

//console.log(res);
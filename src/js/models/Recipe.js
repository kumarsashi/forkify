const axios = require('axios');
const config = require('../config');

export default class Recipe {
    constructor( id ) {
        this.id = id;
    }

    async getRecipe() {
         let api_key = config.api_key;
         
         try {
         const response = await axios.get(`https://www.food2fork.com/api/get?key=${api_key}&rId=${this.id}`);  
                this.title = response.data.recipe.titile;
                this.author = response.data.recipe.publisher;
                this.img = response.data.recipe.image_url;
                this.ingredients = response.data.recipe.ingredients;
         } catch(err) {
             console.log(err);
         } 
            
    }

    calcTime() {
        let totalIngredients = this.ingredients.length;
        let period = Math.ceil(totalIngredients / 3);
        this.time = period * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}
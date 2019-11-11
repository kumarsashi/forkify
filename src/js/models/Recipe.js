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
                this.title = response.data.recipe.title;
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

    parseIngredients() {
        console.log('inside parse ingredients');
        const unitsLong = ['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const newIngredients = this.ingredients.map( (el) => {
                // 1) uniform units
                        let ingredient = el.toLowerCase();
                        unitsLong.forEach((unit, i) => {
                            ingredient = ingredient.replace(unit, unitsShort[i]);
                        });                    

                // 2) Remove parentheses
                        ingredient = ingredient.replace(/[()]/g, '');
                      //  console.log('after parenthesis removal '+ ingredient);
                 
                      // 3) Parse ingredient into count, unit and ingredient

                        const arrIng = ingredient.split(' ');
                        const unitIndex = arrIng.findIndex( el2 => unitsShort.includes(el2));
                        
                        let objIng;
                        if(unitIndex > -1 ) {
                            // There is a unit
                            const arrCount = arrIng.slice(0, unitIndex);

                            let count;
                            if( arrCount.length === 1) {
                                count = arrIng[0].replace('-','+');
                            } else {
                                count = eval(arrIng.slice(0, unitIndex).join('+'));
                            }
                            objIng = {
                                count,
                                unit: arrIng[unitIndex],
                                ingredient : arrIng.slice(unitIndex + 1).join(' ')
                            }
                        } else if (parseInt(arrIng[0], 10)) {
                            // No unit but first entry is a number

                            objIng = {
                                count : parseInt(arrIng[0],10),
                                unit : '',
                                ingredient : arrIng.slice(1).join(' ')

                            }
                        } else if ( unitIndex === -1) {
                            // There is no unit and no number at first position
                            objIng = {
                                count : 1,
                                unit: '',
                                ingredient
                            }
                        }
                        
                        return objIng;
        })
        this.ingredients = newIngredients;
    }
}
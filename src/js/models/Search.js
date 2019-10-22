const axios = require('axios');

export default class Search {
    constructor(query) {
        this.query = query;
    }


async getResults(query) {

    try {
    const api_key = '3669684d60f91cda916d16d85d56746d';
    let res = await axios(`https://www.food2fork.com/api/search?key=${api_key}&q=${this.query}`);
    this.result = res.data.recipes;
   // console.log(this.result);
    } catch(error) {
        console.log(error);
    }
}

}


import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios.get(
        `${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );

      const recipe = res.data.recipe;

      this.title = recipe.title;
      this.author = recipe.publisher;
      this.image = recipe.image_url;
      this.url = recipe.source_url;
      this.ingredients = recipe.ingredients;
    } catch (err) {
      console.error(err);
      alert('Something went wrong... Please try again.');
    }
  }

  // Calculate the estimated preparation time
  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.prepTime = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];

    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(ingr => {
      let ingredient = ingr.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index]);
      });

      // Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Separate the amount from the unit
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(ingr2 => units.includes(ingr2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        const arrAmount = arrIng.slice(0, unitIndex); // Ex. 4 1/2 cups, arrAmount is [4, 1/2]

        let amount;
        if (arrAmount.length === 1) {
          /**Ex. 4-1/2 (the - is a dash, not a minus sign)
           * replace will result in it being 4+1/2 and when evaluated will equal 4.5
           * */

          amount = eval(arrIng[0].replace('-', '+'));
        } else {
          amount = eval(arrIng.slice(0, unitIndex).join('+')); // Ex. 4 1/2 --> eval(4 + 1/2) = 4.5
        }

        objIng = {
          amount, // amount: amount
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit, but the first element is the amount
        objIng = {
          amount: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // There is no unit and no amount as the first element
        objIng = {
          amount: 1,
          unit: '',
          ingredient
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}

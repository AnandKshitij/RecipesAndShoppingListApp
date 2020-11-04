import { Recipe } from './recipes-list/recipes.model';
import { ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/internal/Subject';


export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    /*
    private recipes: Recipe[] = [
        new Recipe('Burger', 
        'American Dish', 
        'https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg',
        [
            new ingredient('buns', 2), new ingredient('cheese',1), new ingredient('patty',3)
        ]),
        new Recipe('Manchurian', 
        'Chinese Dish', 
        'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
        [
            new ingredient('onions', 2), new ingredient('tomato',1), new ingredient('soya sauce',1)
        ])
    ];
    */
   private recipes: Recipe[] = [];

    //if we write this.recipes
    //then we will return a refernce to the array due to which array can be changed from outside
    //we want to return a copy of the array
    //so we use the slice function with no arguments
    getRecipes(){
        return this.recipes.slice();
    }


    getRecipe(index: number){
        return this.recipes[index];
    }

    getIngredients(index: number){
        return this.recipes[index].ingrs.slice();
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
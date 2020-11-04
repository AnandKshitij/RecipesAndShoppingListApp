import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipes-list/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import {  tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class DataStorageService{

    constructor(private http: HttpClient,
                private recipeService: RecipeService){

    }

    /*
    we are using put instead of post because we want to remove the previous data on our end point 
    and store this data instead

    /recipes.json makes a recipes file in our database as our end point
    */

    storeRecipes(){
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://cooking-app-8eace.firebaseio.com/recipes.json', recipes)
        .subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    // the tap operator helps us to transform data
    // we are using tap because we do not want the browser to give error 
    //because it is trying to fetch data that is not fetched yet
    fetchRecipes(){
        return this.http.get<Recipe[]>('https://cooking-app-8eace.firebaseio.com/recipes.json')
            .pipe(
                tap (recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }

}
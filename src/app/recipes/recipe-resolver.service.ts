import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes-list/recipes.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataService: DataStorageService,
                private recipeService: RecipeService) {}
    
    // resolve is the function that runs before the route is activated
    // we have to inform the route about its resolver in app-routing module
    // so before the route is loaded we check whether we have data or not
    // if we do not have data we fetch the data
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.recipeService.getRecipes().length===0){
            return this.dataService.fetchRecipes();
        }
        else{
            return this.recipeService.getRecipes();
        }
    }

    // see the app-routing module to check where these resolvers have been applied

}
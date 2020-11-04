import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;


  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute){
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }
}

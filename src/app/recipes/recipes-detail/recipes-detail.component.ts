import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes-list/recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  showRecipe: Recipe;
  id: number;
  
  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.showRecipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onShopIngredients(){
    this.shoppingListService.addIngredients(this.showRecipe.ingrs);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipeBook']);
  }

}
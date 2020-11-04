import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';

const appRoutes: Routes = [
    // if we don't write pathMatch: full then only the prefix of the path is matched 
    { path: '', redirectTo: '/recipeBook/new', pathMatch: 'full'},
    { path: 'recipeBook', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: EditRecipeComponent, resolve: [RecipeResolverService]},
        { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService]},
        { path: ':id/edit', component: EditRecipeComponent}
    ]},
    { path: 'shoppingList', component: ShoppingListComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
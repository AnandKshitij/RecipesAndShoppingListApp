import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipes-list/recipes.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id']!=null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName: string = '';
    let recipePath: string = '';
    let recipeDesc: string = '';
    // the recipeIngr is an array of ingredients which will be a part of our form 
    let recipeIngr = new FormArray([]);

    if(this.editMode){
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingrs']){
        for(let ingr of recipe.ingrs){
          recipeIngr.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    // in form group we register the controls we will have in the form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingrs': recipeIngr
    })
  }

  onSubmit(){
    /*
    If we had used different names in form and class then we would have to add in this way
    const newRecipe = new Recipe(
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'], 
      this.recipeForm.value['ingrs']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    */

    // since we have used same names in class and form we can simply do it in this way
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onAddIngr(){
    (<FormArray>this.recipeForm.get('ingrs')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngr(index: number){
    (<FormArray>this.recipeForm.get('ingrs')).removeAt(index);
  }

}

import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';


@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{ static: false}) shoppingForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editItem: ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editingItem.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const ing = new ingredient(value.name, value.amount);
    console.log(ing);
    if(!this.editMode){
      this.shoppingListService.onIngredientAdded(ing);
    }
    else{
      this.shoppingListService.updateIngr(this.editIndex, ing);
      this.editMode = false;
    }
    form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.shoppingForm.reset();
    this.shoppingListService.deleteAll();
    this.editMode = false;
  }

}

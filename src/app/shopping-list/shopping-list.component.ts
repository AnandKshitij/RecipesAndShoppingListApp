import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: ingredient[] = [];
  ingChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingrArr: ingredient[]) => {
        this.ingredients = ingrArr;
      }
    )
  }

  onEditItem(id: number){
    this.shoppingListService.editingItem.next(id);
  }

  ngOnDestroy(): void {
    this.ingChangedSub.unsubscribe();
  }

}

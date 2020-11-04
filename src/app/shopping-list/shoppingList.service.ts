import { Subject } from 'rxjs';

import { ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    private ingredients: ingredient[] = [
        new ingredient('Onion',1),
        new ingredient('Tomato', 2)
    ];

    ingredientsChanged = new Subject<ingredient[]>();
    editingItem = new Subject<number>();
    constructor(){

    }
    
    getIngredients(){
        return this.ingredients.slice();
    }

    onIngredientAdded(myIngredient: ingredient){
        this.ingredients.push(myIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingrs: ingredient[]){
        //... spreads all elements of ingrs into individual ingredient
        this.ingredients.push(...ingrs);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        // the index is the starting index from where the elements need to be removed
        // then we need to give the count of the elements to be removed starting from that index
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteAll(){
        this.ingredients.splice(0, this.ingredients.length);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    updateIngr(index: number, newIng: ingredient){
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }
}
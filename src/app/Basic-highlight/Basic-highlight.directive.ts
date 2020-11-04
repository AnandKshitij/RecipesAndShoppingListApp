import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[basichighlight]'
})

export class BasicHighlightDirective implements OnInit{
    
    //in the constructor arguments we will ask angular for objects of specific type
    //the angular will try to provide us these arguments
    //this is known as injection
    
    constructor(private eleRef: ElementRef){
        //the private element is by default initialized in the parameter itself
        //we will be using eleRef in ngOnInit() function
    }

    ngOnInit(){
        this.eleRef.nativeElement.style.backgroundColor = 'transparent';
        this.eleRef.nativeElement.style.color = 'black';
    }
}
import { Directive, 
  Renderer2, 
  OnInit, 
  ElementRef, 
  HostListener, 
  HostBinding, 
  Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'black';
  //we have given the highlightColor the alias of appBetterHighlight
  //so we have to access it now as [appBetterHighlight]
  //this is what is done in [ngStyle]
  @Input('appBetterHighlight') highlightColor: string = 'blue';

  @HostBinding('style.color') color: string;

  constructor(private ele: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(){
    //this.renderer.setStyle(this.ele.nativeElement, 'background-color', 'pink');
    this.color = this.defaultColor;
  }

  //we want the text to be highlighted only when we hover over it
  @HostListener('mouseenter') mouseOver(eventData: Event){
    //this.renderer.setStyle(this.ele.nativeElement, 'color', 'red');
    this.color = this.highlightColor;
  }

  //we want the text to go back to its original state once the mouse goes away
  @HostListener('mouseleave') mouseGone(eventData: Event){
    //this.renderer.setStyle(this.ele.nativeElement, 'color', 'black');
    this.color = this.defaultColor;
  }

  //mouseenter and mouseleave are events given by angular
}


/*
We also have a structural directive ngSwitch which is used as
<div [ngSwitch]="value">
  <p *ngSwitchCase="5">Value is 5</p>
  <p *ngSwitchCase="50">Value is 50</p>
  <p *ngSwitchCase="500">Value is 500</p>
  <p *ngSwitchDefault>Value is default</p>
</div>


*/
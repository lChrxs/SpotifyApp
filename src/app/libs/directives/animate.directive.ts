import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[animate]'
})
export class AnimateDirective {

  @Input('animate') class: string[] = [];

  @HostListener('mouseenter') hover(){
    this.renderer.addClass(this.element.nativeElement, this.class[0])
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2  
  ) { }


}

import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective implements OnChanges {
  @Input() appHighlightRow: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appHighlightRow) {
      console.log('ElementRef: ', this.el.nativeElement)
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#dfdfdf');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
    }
  }
}

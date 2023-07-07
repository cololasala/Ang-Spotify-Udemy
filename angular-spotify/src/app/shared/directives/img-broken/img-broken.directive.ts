import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]',
})
export class ImgBrokenDirective {
  @Input() customImg = ''; // esto se pasa en donde se usa la directiva
  constructor(private el: ElementRef) {} // obtengo el elemento html

  @HostListener('error') handleError(): void {  // escucho el error de mi elemento host (<img />)
    const elNative = this.el.nativeElement;
    elNative.src = this.customImg;
    elNative.setAttribute('style', 'background: white');
  }
}

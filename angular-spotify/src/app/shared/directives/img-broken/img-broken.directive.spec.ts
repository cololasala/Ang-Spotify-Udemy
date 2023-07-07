import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// necesito un componente de prueba para probar la directiva
@Component({
  template: `<img appImgBroken class='testing-directive' [src]='url-inventada' [customImg]="'../../assets/images/img-broken.png'">`,
})
export class TestComponent {
  public srcMock = null;
}

fdescribe('ImgBrokenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>; // nos ayuda a obtener los metodos del componente

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgBrokenDirective],
    });

    fixture = TestBed.createComponent(TestComponent); // creacion componente
    component = fixture.componentInstance;      // obtengo instacia del componente
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const el = new ElementRef('');
    const directive = new ImgBrokenDirective(el);
    expect(directive).toBeTruthy();
  });

  it('prueba creacion de componente TestComponent', () => {
    expect(component).toBeTruthy();
  });

  it('la directiva deberia cambiar la imagen por la que esta en assets', (done: DoneFn) => {
    //act
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
    const beforeImgSrc = beforeImgElement.src; // obtiene url antes de ser cambiada por la directiva

    component.srcMock = '';

    setTimeout(() => {
      const afterImgSrcElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
      const afterImgSrc = afterImgSrcElement.src; // obtiene url antes de ser cambiada por la directiva

      const imageBroken = 'http://localhost:9876/assets/images/img-broken.png'   //localhost:9876 es el navegador cuando corro el test
      expect(afterImgSrc).toContain('img-broken.png');
      done();
    }, 3000);

  })
});

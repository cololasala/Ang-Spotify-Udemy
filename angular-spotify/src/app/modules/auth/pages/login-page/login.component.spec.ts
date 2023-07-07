import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule,  HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Patron AAA -> Arrange, Act, Assert
  it('deberia retornar invalido el formulario', () => {
    // arrange
    const formMock = {
      email: 'luciano@hotmail.com',
      password: '12345656771111111111111' /* ingreso mas de 10 caracteres */
    };
    const formEmail = component.form.get('email');
    const formPassword = component.form.get('password');

    // act
    formEmail.setValue(formMock.email);
    formPassword.setValue(formMock.password);

    // assert 
    expect(component.form.invalid).toBeTruthy();
    
  });

  it('deberia retornar valido el formulario', () => {
    const formMock = {
      email: 'luciano@hotmail.com',
      password: '11112354'
    };
    const formEmail = component.form.get('email');
    const formPassword = component.form.get('password');

    formEmail.setValue(formMock.email);
    formPassword.setValue(formMock.password);

    expect(component.form.valid).toBeTruthy();
  });

  it('el boton login deberia tener la palabra Iniciar sesión', () => {
    const el = fixture.debugElement.query(By.css('.form-action button'));
    const innerText = el.nativeElement.innerText;

    expect(innerText).toBe('Iniciar sesión');
  })
});

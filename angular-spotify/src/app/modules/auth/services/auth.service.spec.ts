import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import * as userData from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  const mockUser: any = (userData as any).default;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']); // se hace pasar por httpClient
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar un objeto con data y tokenSession', (done: DoneFn) => {
    // arrange

    const user = mockUser.userOk;

    const mockResponse = {
      data: {},
      tokenSession: '11111111',
    };

    httpClientSpy.post.and.returnValue(
      of(mockResponse) // retorno observable de tipo mockResponse
    );

    service.sendCredentials(user.email, user.password).subscribe((data) => {
      console.log(data)
      const getProperties = Object.keys(data);
      expect(getProperties).toContain('data');
      expect(getProperties).toContain('tokenSession');
      done();
    });
  });
});

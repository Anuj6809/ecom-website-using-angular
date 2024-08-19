import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when canActivate is called', () => {
    // You can also test the canActivate method here
    const route = {} as any; // Mock route if needed
    const state = {} as any; // Mock state if needed
    const result = guard.canActivate(route, state);
    expect(result).toBeTrue(); // Adjust based on your logic
  });
});


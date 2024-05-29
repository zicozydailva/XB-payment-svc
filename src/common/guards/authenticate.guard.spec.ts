import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthGuard } from '.';

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getRequest: jest.fn().mockImplementation(() => ({
    method: 'GET',
    ip: '::1',
    url: '/users',
    headers: {
      authorization: 'Bearer 123',
    },
    cookies: {
      JWT: '123',
    },
  })),
}));

const mockArgumentsHost = {
  getClass: jest.fn(),
  getHandler: jest.fn(),
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const authService = {
  verifyToken: jest.fn().mockResolvedValue({
    id: 1,
    name: 'John Doe',
  }),
};

describe('Auth guard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, { provide: AuthService, useValue: authService }],
    }).compile();

    authGuard = module.get(AuthGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should validate a token', () => {
    const result = authGuard.canActivate(mockArgumentsHost);
    expect(result).toBeTruthy();
  });

  it('should throw unauthorized exception', () => {
    authService.verifyToken.mockResolvedValue(null);

    authGuard.canActivate(mockArgumentsHost).catch((error) => {
      expect(error.message).toBe('Unauthorized');
    });
  });

  it('should throw unauthorized exception if token is missing', () => {
    mockHttpArgumentsHost.mockImplementation(() => ({
      getRequest: jest.fn().mockImplementation(() => ({
        method: 'GET',
        ip: '::1',
        url: '/users',
        headers: {},
        cookies: {},
      })),
    }));

    authGuard.canActivate(mockArgumentsHost).catch((error) => {
      expect(error.message).toBe('Unauthorized');
    });
  });
});

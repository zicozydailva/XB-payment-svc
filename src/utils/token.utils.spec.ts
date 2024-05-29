import { TokenHelper } from './token.utils';

describe('TokenHelper', () => {
  it('it should verify token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjE5NzI1Nzl9.4L6k-MivF4jWfCRTRfpq1O5ydDLRDybjfpttnxnnBZ8';
    const secret = '12345';

    const res = new TokenHelper().verify(token, secret);

    expect(res).toBeDefined();
  });

  it('should throw token expired error', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpY…Y2NjAzNjk5MH0.D7alSFZhAYxqs-c3KYT48xmKo2WZ4NTONQ7ELsMQxmM';
    const secret = '12345';

    try {
      new TokenHelper().verify(token, secret);
    } catch (error) {
      expect(error.message).toBe('Access token not valid');
    }
  });
});

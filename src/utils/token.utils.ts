import * as jwt from 'jsonwebtoken';
import { ErrorHelper } from '../helpers';

/**
 * Token helper
 */
export class TokenHelper {
  /**
   * Verifys token helper
   * @param token
   * @param secret
   */
  verify<T>(token: string, secret: string, opts?: jwt.VerifyOptions): T {
    try {
      const options: jwt.VerifyOptions = {
        ...opts,
        algorithms: ['HS256'],
      };
      const payload = jwt.verify(token, secret, options);
      return payload as any;
    } catch (error) {
      if (error.name === 'JsonWebTokenError')
        ErrorHelper.UnauthorizedException('Access token not valid');
      throw error;
    }
  }
}

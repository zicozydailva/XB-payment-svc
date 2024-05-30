/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { User } from './user.decorator';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

describe('base.entity.spec.ts', () => {
  function getParamDecoratorFactory(decorator: Function) {
    class TestDecorator {
      public test(@decorator() _value) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, 'test');
    return args[Object.keys(args)[0]].factory;
  }

  it('Decorator Test', () => {
    const req: any = {};
    const res: any = {};
    const mockUser = { userId: 1, username: 'john' };
    req.user = mockUser;
    const mockController = jest.fn();

    const ctx = new ExecutionContextHost([req, res], mockController);
    const factory = getParamDecoratorFactory(User);
    const user = factory(null, ctx);
    expect(user).toEqual(mockUser);
  });

  it('should return the specified field', () => {
    const req: any = {};
    const res: any = {};
    const mockUser = { userId: 1, username: 'john' };
    req.user = mockUser;
    const mockController = jest.fn();

    const ctx = new ExecutionContextHost([req, res], mockController);
    const factory = getParamDecoratorFactory(User);
    const username = factory('username', ctx);
    expect(username).toEqual(mockUser.username);
  });
});

import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { HeaderMock } from '../../../../test/mocks/headers/header.mock.js';
import app from '../../../app.js';

describe('Test suit for BalanceController', () => {
  describe('#createDeposit', () => {
    // test('should be able to deposits money into the balance of a client', async () => {
    //   const userId = 1;
    //   const customHeaders = HeaderMock.factory(1);

    //   const userResponse = await request(app)
    //     .get(`/admin/profile/${userId}`);

    //   const response = await request(app)
    //     .post(`/balances/deposit/${userId}`)
    //     .set(customHeaders);

    //   const userResponseAfterDeposit = await request(app)
    //     .get(`/admin/profile/${userId}`);

    //   expect(response.status).toBe(201);
    // });

    test.todo('should not be able to deposit more than 25% his total of jobs to pay');

    test.todo('should not be able to deposit money in an account that not belongs to the logged user');

    test.todo('should not be able to a client deposit less than or equal to 0')
  });
});
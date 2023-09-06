import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { HeaderMock } from '../../../../test/mocks/headers/header.mock';
import app from '../../../app.js';

describe('Test suit for ContractController', () => {
  describe('#getUnpaid', () => {
    test('should be able to get all unpaid jobs for a user (either a client or contractor), for active contracts only', async () => {
      const customHeaders = HeaderMock.factory();

      const response = await request(app)
        .get('/jobs/unpaid')
        .set(customHeaders);

      expect(response.body).toStrictEqual(
        {
          data: [
            {
              id: 1,
              description: "work",
              price: 200,
              paid: null,
              paymentDate: null,
              ContractId: 1,
              Contract: {
                id: 1,
                status: "terminated",
                ContractorId: 5,
                ClientId: 1
              }
            },
            {
              id: 2,
              description: "work",
              price: 201,
              paid: null,
              paymentDate: null,
              ContractId: 2,
              Contract: {
                id: 2,
                status: "in_progress",
                ContractorId: 6,
                ClientId: 1
              }
            }
          ]
        }
      )
    });

    test('should return 401 if the profile does not exists on the database', async () => {
      const customHeaders = HeaderMock.factory('invalid_id');

      const response = await request(app)
        .get('/jobs/unpaid')
        .set(customHeaders);

      expect(response.status).toBe(401);
    });
  });

  describe('#createPayment', () => {
    test.todo('should be able for a client to make a payment');

    test.todo('should not be able for a client to make a payment if his balance is less than the amount');

    test.todo('should be able to a contractor receive money from a down payment');
  });
});
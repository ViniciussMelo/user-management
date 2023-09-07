import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { HeaderMock } from '../../../../test/mocks/headers/header.mock';
import app from '../../../app.js';

describe('Test suit for JobController', () => {
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
              description: 'work',
              price: 200,
              paid: null,
              paymentDate: null,
              ContractId: 1,
              Contract: {
                id: 1,
                status: 'terminated',
                ContractorId: 5,
                ClientId: 1
              }
            },
            {
              id: 2,
              description: 'work',
              price: 201,
              paid: null,
              paymentDate: null,
              ContractId: 2,
              Contract: {
                id: 2,
                status: 'in_progress',
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

  describe('#controller.makePayment', () => {
    test('should be able for a client to make a payment', async () => {
      const userId = 2;
      const contractorId = 6;
      const customHeaders = HeaderMock.factory(userId);

      const userResponse = await request(app)
        .get(`/admin/profile/${userId}`);

      const contractorResponse = await request(app)
        .get(`/admin/profile/${contractorId}`);

      const responseFirstJobPaid = await request(app)
        .post('/jobs/3/pay')
        .set(customHeaders);

      const userResponseAfterPayment = await request(app)
        .get(`/admin/profile/${userId}`);

      const contractorResponseAfterPayment = await request(app)
        .get(`/admin/profile/${contractorId}`);

      expect(responseFirstJobPaid.status).toBe(201);

      expect(userResponse.body.data).toStrictEqual({
        id: 2,
        firstName: 'Mr',
        lastName: 'Robot',
        profession: 'Hacker',
        balance: 231.11,
        type: 'client'
      });

      expect(contractorResponse.body.data).toStrictEqual({
        id: 6,
        firstName: 'Linus',
        lastName: 'Torvalds',
        profession: 'Programmer',
        balance: 1214,
        type: 'contractor'
      });

      expect(userResponseAfterPayment.body.data).toStrictEqual({
        id: 2,
        firstName: 'Mr',
        lastName: 'Robot',
        profession: 'Hacker',
        balance: 29.11,
        type: 'client'
      });

      expect(contractorResponseAfterPayment.body.data).toStrictEqual({
        id: 6,
        firstName: 'Linus',
        lastName: 'Torvalds',
        profession: 'Programmer',
        balance: 1416,
        type: 'contractor'
      });
    });

    test('should not be able for a client to make a payment if his balance is less than the amount', async () => {
      const userId = 2;
      const customHeaders = HeaderMock.factory(userId);

      const responseSecondJobPaid = await request(app)
        .post('/jobs/4/pay')
        .set(customHeaders);

      expect(responseSecondJobPaid.status).toBe(400);
    });
  });
});
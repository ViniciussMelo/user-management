import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { contractInProgressMock, contractMock } from '../../../../test/mocks/contract/mock.js';
import { HeaderMock } from '../../../../test/mocks/headers/header.mock.js';
import app from '../../../app.js';

describe('Test suit for ContractController', () => {


  describe('#index', () => {
    test('should be able to get only non terminated contracts belonging to a user (client or contractor)', async () => {
      const customHeaders = HeaderMock.factory();

      const response = await request(app)
        .get('/contracts')
        .set(customHeaders);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].status).not.toBe('terminated');
      expect(response.body).toStrictEqual({ data: [contractInProgressMock] });
    });

    test('should return 401 if the profile does not exists on the database', async () => {
      const customHeaders = HeaderMock.factory('invalid_id');

      const response = await request(app)
        .get('/contracts')
        .set(customHeaders);

      expect(response.status).toBe(401);
    });
  });

  describe('#getById', () => {
    test('should be able to get the contracts for the user profile who is calling', async () => {
      const customHeaders = HeaderMock.factory();

      const response = await request(app)
        .get('/contracts/1')
        .set(customHeaders);

      expect(response.status).toBe(200);
      expect(response.body.data).toStrictEqual(contractMock);
    });

    test('should not be able to get the contracts from other users', async () => {
      const customHeaders = HeaderMock.factory();

      const response = await request(app)
        .get('/contracts/5')
        .set(customHeaders);

      expect(response.status).toBe(404);
      expect(response.body.message).toStrictEqual('Contract not found!');
    });

    test('should return 401 if the profile does not exists on the database', async () => {
      const customHeaders = HeaderMock.factory('invalid_id');

      const response = await request(app)
        .get('/contracts/1')
        .set(customHeaders);

      expect(response.status).toBe(401);
    });
  });
});
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import request from 'supertest';

import { ContractFacade } from '../../../../test/mocks/contract/contract-facade.mock.js';
import { HeaderMock } from '../../../../test/mocks/headers/header.mock.js';
import app from '../../../app.js';

describe('Test suit for ContractController', () => {
  let contractFacade;

  beforeEach(() => {
    contractFacade = new ContractFacade();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('#index', () => {

    test('should be able to get only non terminated contracts belonging to a client', async () => {
      const profileId = 1;
      const customHeaders = HeaderMock.factory(profileId);

      const response = await request(app)
        .get('/contracts')
        .set(customHeaders);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body).toStrictEqual({
        data: [
          {
            id: 2,
            terms: 'bla bla bla',
            status: 'in_progress',
            ContractorId: 6,
            ClientId: profileId
          }
        ]
      });
    });

    test('should be able to get only non terminated contracts belonging to a contractor', async () => {
      const profileId = 6;
      const customHeaders = HeaderMock.factory(profileId);

      const response = await request(app)
        .get('/contracts')
        .set(customHeaders);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
      expect(response.body).toStrictEqual({
        data: [
          {
            id: 2,
            terms: 'bla bla bla',
            status: 'in_progress',
            ContractorId: profileId,
            ClientId: 1
          },
          {
            id: 3,
            terms: 'bla bla bla',
            status: 'in_progress',
            ContractorId: profileId,
            ClientId: 2
          },
          {
            id: 8,
            terms: 'bla bla bla',
            status: 'in_progress',
            ContractorId: profileId,
            ClientId: 4
          }
        ]
      });
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
      // expect(response.body.data).toStrictEqual(contractMock);
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
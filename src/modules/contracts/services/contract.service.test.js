import { describe, test, beforeEach, expect, afterEach, jest } from '@jest/globals';

import { contractMock, contractNewMock } from '../../../../test/mocks/contract/mock.js';
import { GetContract } from '../dtos/get-contract.dto.js';
import AppError from '../../../shared/errors/app.error.js';
import { ContractService } from './contract.service.js';
import { Contract } from '../models/contract.model.js';


describe('Test suit for ContractService', () => {
  let service;

  beforeEach(() => {
    service = new ContractService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('#index', () => {
    test('should be able to get a list of non terminated contracts belonging to a user (client or contractor)', async () => {
      jest.spyOn(Contract, 'findAll').mockImplementationOnce(() => {
        return [contractNewMock];
      });

      const result = await service.index(1);

      const expected = GetContract.factory(contractNewMock)

      expect(result).toStrictEqual([expected]);
    });
  });

  describe('#getContractById', () => {
    test('should be able to get the contracts for the user profile who is calling', async () => {
      jest.spyOn(Contract, 'findOne').mockImplementationOnce(() => {
        return contractMock;
      });

      const result = await service.getContractById(null, null);
      const expected = GetContract.factory(contractMock)

      expect(result).toStrictEqual(expected);
    });

    test('should not return the contract if it not belongs to the profile calling', async () => {
      await expect(
        service.getContractById(null, null)
      ).rejects.toEqual(
        new AppError('Contract not found!', 404)
      );
    });
  });
});
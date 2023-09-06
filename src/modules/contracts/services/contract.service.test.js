import { describe, test, beforeEach, expect, afterEach, jest } from '@jest/globals';

import { ContractMock } from '../../../../test/mocks/contract/mock.js';
import { GetContractById } from '../dtos/get-contract-by-id.dto.js';
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

  describe('#getContractById', () => {
    test('should be able to get the contracts for the user profile who is calling', async () => {
      jest.spyOn(Contract, 'findOne').mockImplementationOnce(() => {
        return ContractMock;
      });

      const result = await service.getContractById(null, null);
      const expected = GetContractById.factory(ContractMock)

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
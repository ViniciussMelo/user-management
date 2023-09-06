import { describe, test, beforeEach } from '@jest/globals';
import { ContractService, contractService } from './contract.service';

describe('Test suit for ContractService', () => {
  let service;

  beforeEach(() => {
    service = new ContractService();
  });

  describe('#getContractById', () => {
    test('should be able to get the contracts for the user profile who is calling', () => {

    });

    test.todo('should not return the contract if it not belongs to the profile calling');
  });
});
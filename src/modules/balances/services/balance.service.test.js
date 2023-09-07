import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';

import { AdminFacade } from '../../../../test/mocks/admin/admin-facade.mock.js';
import { JobFacade } from '../../../../test/mocks/jobs/job-facade.mock.js';
import { BalanceService } from './balance.service.js';
import { Job, JobService } from '../../jobs/index.js';
import { Profile } from '../../admin/index.js';

describe('Test suit for BalanceService', () => {
  let adminFacade;
  let jobFacade;
  let service;

  beforeEach(() => {
    adminFacade = new AdminFacade();
    service = new BalanceService();
    jobFacade = new JobFacade();
  });

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  });

  describe('#makeDeposit', () => {
    test('should be able to deposits money into the balance of a client', async () => {
      const [client] = adminFacade.buildClientProfile();

      const spy = jest.spyOn(Profile, 'update').mockImplementationOnce(null);
      jest.spyOn(Profile, 'findOne').mockImplementationOnce((() => client));

      const unpaidJobs = jobFacade.buildAllUnpaidJobsByClientId(client.id);

      jest.spyOn(Job, 'findAll')
        .mockImplementationOnce((() => unpaidJobs));

      const value = 20;

      await service.makeDeposit(client.id, value, client.id);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test.todo('should not be able to deposit more than 25% his total of jobs to pay');

    test.todo('should not be able to deposit money in an account that not belongs to the logged user');

    test.todo('should not be able to a client deposit less than or equal to 0')
  });
});
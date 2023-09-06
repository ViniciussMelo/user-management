import { describe, test, expect, beforeEach, jest } from '@jest/globals';


import { JobFacade } from '../../../../test/mocks/jobs/job-facade.mock';
import { JobService } from './job.service';
import { Job } from '../models/job.model';
import { GetJobDto } from '../dtos/get-job.dto';

describe('Test suit for JobService', () => {
  let jobFacade;
  let service;

  beforeEach(() => {
    jobFacade = new JobFacade();
    service = new JobService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('#getUnpaid', () => {
    test('should be able to get all unpaid jobs for a user (either a client or contractor), for active contracts only', async () => {
      const mockedJobs = jobFacade.getActiveJobs();

      jest.spyOn(Job, 'findAll').mockImplementationOnce(() => mockedJobs);

      const result = await service.getUnpaid(1);

      const expected = mockedJobs.map((mockedJob) => GetJobDto.factory(mockedJob));

      expect(result).toStrictEqual(expected);
    });
  });

  describe('#makePayment', () => {
    test('should be able for a client to make a payment', async () => {
      const spy = jest.spyOn(service, 'makePayment');
      await service.makePayment(1, { id: 1, balance: 1150 });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test.todo('should not be able for a client to make a payment if the job does not exists')

    test.todo('should not be able for a client to make a payment if the job is already paid')

    test.todo('should not be able for a client to make a payment if his balance is less than the amount');
  })
});
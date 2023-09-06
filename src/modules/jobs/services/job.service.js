import { Op } from 'sequelize';

import { sequelize } from '../../../shared/database/sequelize.client.js';
import { Contract } from '../../contracts/models/contract.model.js';
import AppError from '../../../shared/errors/app.error.js';
import { GetJobDto } from '../dtos/get-job.dto.js';
import { Job } from "../models/job.model.js";
import { Profile } from '../../admin/index.js';

export class JobService {
  async getUnpaid(profileId) {
    const unpaidJobs = await Job.findAll({
      include: {
        model: Contract,
        where: {
          [Op.or]: [
            { 'ClientId': profileId },
            { 'ContractorId': profileId },
          ]
        }
      },
      where: {
        paid: null
      }
    });

    return unpaidJobs.map((unpaidJob) => GetJobDto.factory(unpaidJob));
  }

  async makePayment(jobId, user) {
    const job = await Job.findOne({
      include: Contract,
      where: {
        id: jobId,
      }
    });

    if (!job) {
      throw new AppError('Invalid job id!');
    }

    if (job.paid) {
      throw new AppError('Job is already paid!');
    }

    if (user.balance < job.price) {
      throw new AppError('Check your available money!');
    }

    await this._savePayment(job, user);
  }

  async _savePayment(job, user) {
    const t = await sequelize.transaction();

    try {
      const contractor = await Profile.findOne({
        where: {
          id: job.Contract.ContractorId,
        },
        transaction: t
      });

      await Profile.update(
        { balance: user.balance - job.price },
        { where: { id: user.id }, transaction: t },
      );

      await Profile.update(
        { balance: contractor.balance + job.price },
        { where: { id: contractor.id }, transaction: t },
      );

      await Job.update(
        { paid: true },
        { where: { id: job.id }, transaction: t }
      )

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new AppError('Error while saving payment!')
    } finally {
      sequelize.close();
    }
  }
}
import { Op } from 'sequelize';

import AppError from '../../../shared/errors/app.error.js';
import { GetContract } from '../dtos/get-contract.dto.js';
import { Contract } from '../models/contract.model.js';


export class ContractService {
  async index(profileId) {
    const contracts = await Contract.findAll({
      where: {
        status: { [Op.not]: 'terminated' },
        [Op.or]: [
          { 'ClientId': profileId },
          { 'ContractorId': profileId },
        ]
      }
    });

    return contracts.map((contract) => GetContract.factory(contract));
  }

  async getContractById(contractId, profileId) {
    const contract = await Contract.findOne({
      where: { id: contractId, 'ClientId': profileId }
    });

    if (!contract) {
      throw new AppError('Contract not found!', 404);
    }

    return GetContract.factory(contract);
  }
}
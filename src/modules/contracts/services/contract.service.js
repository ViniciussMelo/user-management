import AppError from '../../../shared/errors/app.error.js';
import { GetContractById } from '../dtos/get-contract-by-id.dto.js';
import { Contract } from '../models/contract.model.js';


export class ContractService {
  async getContractById(contractId, profileId) {

    const contract = await Contract.findOne({
      where: { id: contractId, 'ClientId': profileId }
    });

    if (!contract) {
      throw new AppError('Contract not found!', 404);
    }

    return GetContractById.factory(contract);
  }
}
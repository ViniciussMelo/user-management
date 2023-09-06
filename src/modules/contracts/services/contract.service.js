import { Contract } from "../models/contract.model.js";


export class ContractService {

  async getContractById(req, res) {
    const contract = await Contract.findOne({ where: { id: 1 } });

    console.log('contract: ', contract)
  }
}

new ContractService().getContractById(null, null);
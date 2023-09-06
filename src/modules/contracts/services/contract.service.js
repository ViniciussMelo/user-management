import { Contract } from "../models/contract.model.js";


export class ContractService {

  async getContractById(req, res) {
    const { id } = req.params;

    const contract = await Contract.findOne({ where: { id: 1 } });
  }
}
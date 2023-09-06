import { ContractService } from '../services/contract.service.js';

class ContractController {
  #contractService;

  constructor() {
    this.#contractService = new ContractService();
  }

  async index(req, res) {
    const { id: profileId } = req.profile;

    const data = await this.#contractService.index(profileId);

    return res.json({ data }).end();
  }

  async getById(req, res) {
    const { id } = req.params;
    const { id: profileId } = req.profile;

    const data = await this.#contractService.getContractById(id, profileId);

    return res.json({ data }).end();
  }
}

const contractController = new ContractController();

export { contractController }
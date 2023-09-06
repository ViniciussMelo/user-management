import { ContractService } from "../services/contract.service.js";

class ContractController {
  #contractService;

  constructor() {
    this.#contractService = new ContractService();
  }

  index(request, response) {
    return response.send();
  }

  getById(request, response) {
    return response.send();
  }
}

const contractController = new ContractController();

export { contractController }
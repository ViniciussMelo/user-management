class ContractController {
  index(request, response) {
    return response.send();
  }

  getById(request, response) {
    return response.send();
  }
}

const contractController = new ContractController();

export { contractController }
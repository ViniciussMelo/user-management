class BalanceController {
  createDeposit(request, response) {
    return response.send();
  }
}

const balanceController = new BalanceController();

export { balanceController };
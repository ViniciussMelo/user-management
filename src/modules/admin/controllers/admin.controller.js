class AdminController {
  getBestProfession(request, response) {
    return response.send();
  }

  getBestClients(request, response) {
    return response.send();
  }
}

const adminController = new AdminController();

export { adminController };
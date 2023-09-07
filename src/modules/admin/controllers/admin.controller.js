import { AdminService } from '../services/admin.service.js';

class AdminController {
  #adminService;

  constructor() {
    this.#adminService = new AdminService();
  }

  async getProfileById(req, res) {
    const { id: profileId } = req.params;

    const user = await this.#adminService.getProfileById(profileId);

    return res.json({ data: user }).end();
  }

  getBestProfession(req, res) {
    return res.send();
  }

  getBestClients(req, res) {
    return res.send();
  }
}

const adminController = new AdminController();

export { adminController };
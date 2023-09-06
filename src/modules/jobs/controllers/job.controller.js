import { JobService } from "../services/job.service.js";

class JobController {
  #jobService;

  constructor() {
    this.#jobService = new JobService();
  }

  async getUnpaid(req, res) {
    const { id: profileId } = req.profile;

    const data = await this.#jobService.getUnpaid(profileId);

    return res.json({ data: [...data] }).end();
  }

  createPayment(req, res) {
    return res.send();
  }
}
const jobController = new JobController();

export { jobController };
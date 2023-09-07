import { JobService } from '../services/job.service.js';

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

  async makePayment(req, res) {
    const { job_id } = req.params;
    const { id: profileId } = req.profile;

    await this.#jobService.makePayment(job_id, profileId);

    return res.status(201).end();
  }
}
const jobController = new JobController();

export { jobController };
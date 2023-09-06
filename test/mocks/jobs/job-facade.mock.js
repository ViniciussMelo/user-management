import { JobFluentAPI } from "./job-fluent-api.mock";

export class JobFacade {
  #jobFluentAPI;

  constructor() {
    this.#jobFluentAPI = new JobFluentAPI();
  }

  getActiveJobs() {
    return this.#jobFluentAPI
      .getActiveJobs()
      .buildJobs();
  }
}
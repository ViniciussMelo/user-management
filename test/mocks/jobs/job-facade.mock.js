import { JobFluentAPI } from "./job-fluent-api.mock";

export class JobFacade {
  #jobFluentAPI;

  constructor() {
    this.#jobFluentAPI = new JobFluentAPI();
  }

  buildUnpaidJobsAndInProgressContractsByClientId(clientId) {
    return this.#jobFluentAPI
      .getJobsByClientId(clientId)
      .getUnpaidJobs()
      .getJobsWithContractInProgress()
      .buildJobs();
  }

  buildUnpaidJobs() {
    return this.#jobFluentAPI
      .getUnpaidJobs()
      .buildJobs();
  }

  buildJobsWithContractInProgressByClientId(clientId) {
    return this.#jobFluentAPI
      .getJobsByClientId(clientId)
      .getJobsWithContractInProgress()
      .buildJobs();
  }

  buildJobsWithContractTerminatedByClientId(clientId) {
    return this.#jobFluentAPI
      .getJobsByClientId(clientId)
      .getUnpaidJobs()
      .getJobsWithContractTerminated()
      .buildJobs();
  }

  buildJobsAlreadyPaid() {
    return this.#jobFluentAPI
      .getJobsAlreadyPaid()
      .buildJobs();
  }

  buildAllUnpaidJobsByClientId(clientId) {
    return this.#jobFluentAPI
      .getJobsByClientId(clientId)
      .getUnpaidJobs()
      .buildJobs()
  }
}
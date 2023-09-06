import { jobMock } from "./job.mock";

export class JobFluentAPI {
  #data;

  constructor() {
    this.#data = jobMock;
  }

  getActiveJobs() {
    this.#data = this.#data.filter((job) => !job.paid);

    return this;
  }

  buildJobs() {
    return this.#data;
  }
}
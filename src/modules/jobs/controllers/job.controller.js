class JobController {
  getUnpaid(request, response) {
    return response.send();
  }

  createPayment(request, response) {
    return response.send();
  }
}
const jobController = new JobController();

export { jobController };
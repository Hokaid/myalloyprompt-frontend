import http from "../http-common";

class ForecastDataService {
  getAll() {
    return http.get("/forecasts");
  }

  create(data) {
    return http.post("/forecasts", data);
  }

  getForecast(data) {
    return http.post(`/forecasts/getforecasts`, data);
  }

  deleteAll() {
    return http.delete(`/forecasts`);
  }
}

export default new ForecastDataService();

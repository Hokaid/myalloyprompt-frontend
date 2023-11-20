import React, { Component } from "react";
import ForecastDataService from "../services/forecast.service";

export default class ForecastsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLocation = this.onChangeSearchLocation.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.retrieveForecasts = this.retrieveForecasts.bind(this);
    this.saveForecast = this.saveForecast.bind(this);
    this.removeAllSavedForecasts = this.removeAllSavedForecasts.bind(this);
    this.state = {
      forecasts: [],
      savedforecasts: [],
      actualLocation: "London",
      searchLocation: "London",
    };
  }

  componentDidMount() {
    this.getForecast();
    this.retrieveForecasts();
  }

  retrieveForecasts() {
    ForecastDataService.getAll()
      .then((response) => {
        this.setState({
          savedforecasts: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getForecast() {
    const { searchLocation } = this.state;
    var data = {
      location: searchLocation,
    };

    ForecastDataService.getForecast(data)
      .then((response) => {
        this.setState({
          forecasts: response?.data?.forecast?.forecastday,
          actualLocation: response?.data?.location?.name,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeAllSavedForecasts() {
    ForecastDataService.deleteAll()
      .then((response) => {
        this.retrieveForecasts();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveForecast(index) {
    var data = {
      location: this.state.actualLocation,
      date: this.state.forecasts[index].date,
      avgtemp: this.state.forecasts[index].day.avgtemp_f,
    };

    ForecastDataService.create(data)
      .then((response) => {
        this.retrieveForecasts();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeSearchLocation(e) {
    const searchLocation = e.target.value;

    this.setState({
      searchLocation: searchLocation,
    });
  }

  render() {
    const { savedforecasts, forecasts, searchLocation, actualLocation } =
      this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Get Forecast by location"
              value={searchLocation}
              onChange={this.onChangeSearchLocation}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.getForecast}
              >
                Get Forecast List
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Forecasts List</h4>
          <ul className="list-group">
            {forecasts &&
              forecasts.map((forecast, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    On {actualLocation} This date "{forecast.date}" will be{" "}
                    {forecast.day.avgtemp_f} °F on average
                  </p>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => {
                      this.saveForecast(index);
                    }}
                  >
                    Save
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Saved Forecasts</h4>
          <ul className="list-group">
            {savedforecasts &&
              savedforecasts.map((savedforecast, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    On {savedforecast.location} This date "{savedforecast.date}"
                    will be {savedforecast.avgtemp} °F on average
                  </p>
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSavedForecasts}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}

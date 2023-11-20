import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ForecastsList from "./components/forecasts-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/forecasts"} className="navbar-brand">
            ForeCast
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/forecasts"} className="nav-link">
                Forecasts
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ForecastsList />} />
            <Route path="/forecasts" element={<ForecastsList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

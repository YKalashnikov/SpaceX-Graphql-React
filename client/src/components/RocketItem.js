import React from "react";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const RocketItem = ({
  rocket: {
    rocket_id,
    active,
    stages,
    first_flight,
    country,
    cost_per_launch,
    success_rate_pct,
    wikipedia,
    description,
    rocket_name,
    height,
    mass,
    second_stage,
    first_stage
  }
}) => {

  return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-9">
            <h4>
              Mission:{" "}
              <span
                className={classNames({
                  "text-success": active,
                  "text-danger": !active
                })}
              >
                {rocket_name}
              </span>
            </h4>
            <p>
              Date: <Moment format="YYYY-MM-DD HH:mm">{first_flight}</Moment>
            </p>
          </div>
          <div className="col-md-3">
            <Link to={`/rocket/${rocket_id}`} className="btn btn-secondary">
              Rocket Details
            </Link>
          </div>
        </div>
      </div>
  );
};

export default RocketItem;

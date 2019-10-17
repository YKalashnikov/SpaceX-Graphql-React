import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const ShipItem = ({
  ship: {
    active,
    ship_id,
    ship_name,
    ship_type,
    year_built,
    home_port,
    status,
    weight_lbs,
    weight_kg,
    url,
    image,
    position
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
                  "text-success": ship_id
                })}
              >
                {ship_name}
              </span>
            </h4>
 
          </div>
          <div className="col-md-3">
            <Link to={`/ship/${ship_id}`} className="btn btn-secondary">
              Ship Details
            </Link>
          </div>
        </div>
      </div>
  );
};

export default ShipItem;

import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import MissionKey from "./MissionKey";

const ROCKET_QUERY = gql`
  query RocketQuery($rocket_id: String!) {
    rocket(rocket_id: $rocket_id) {
      rocket_id
      active
      stages
      first_flight
      country
      cost_per_launch
      success_rate_pct
      wikipedia
      description
      rocket_name
      height {
        meters
        feet
      }
      mass {
          kg
          lb
      }
      second_stage {
        reusable
        fuel_amount_tons
        burn_time_sec
      }
      first_stage {
        reusable
        fuel_amount_tons
        burn_time_sec
      }
    }
  }
`;

class RocketDetails extends Component {
  render() {
    let  {rocket_id}  = this.props.match.params;
    return (
      <Fragment>
<Query query={ROCKET_QUERY} variables={ {rocket_id} }>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log('error',error);
            const {
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
            } = data.rocket;

            return (
              <div>
                <Link to="/rockets" className="btn btn-secondary  my-4">
                  Back
                </Link>
                <MissionKey success='Active' fail= 'Non Active' progress ='Awaiting'/>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Rocket Name:</span> {}
                  <span
                        className={classNames({
                          'text-success': active,
                          'text-danger': !active
                        })}
                      >
                        {active ? rocket_name : rocket_name}
                      </span>
                </h1>
                <h4 className="mb-3">Rocket Details</h4>
                <ul className="list-group text-white">
                  <li className="list-group-item" >
                    Description: {description}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {first_flight}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {country}
                  </li>
                  <li className="list-group-item">
                    Mas: {mass.kg}{" kg "}{mass.kg}{" lb "}
                  </li>
                  <li className="list-group-item">
                     Cost Per Launch: {cost_per_launch}
                  </li>
                  <li className="list-group-item">
                    Height: {height.meters}{" meters "}{height.meters}{" feet "}
                  </li>
                  <li className="list-group-item">
                    Success Rate Pct: {success_rate_pct}
                  </li>
                  <li className="list-group-item">
                    Wikipedia: <a href={wikipedia} target="blank">Wikipedia</a>
                  </li>
                  <li className="list-group-item">
                    Stages: {stages}
                  </li>
                  <li className="list-group-item">
                    Active:{" "}
                    <span
                      className={classNames({
                        "text-success": active,
                        "text-danger": !active
                      })}
                    >
                      {active ? "Yes" : "No"}
                    </span>
                     
                  </li>
                </ul>
                <h1 className="display-4 my-3">Stage One</h1>
                <ul className="list-group text-white">
                  <li className="list-group-item">
                  Reusable: {first_stage.reusable? 'Yes':'No'}
                  </li>
                  <li className="list-group-item">
                  Fuel Amount Tons: {first_stage.fuel_amount_tons} {" tons"}
                  </li>
                  <li className="list-group-item">
                  Burn Times Sec: {first_stage.burn_time_sec} {" sec "}
                  </li>
                </ul>
                <h1 className="display-4 my-3">Stage Two</h1>
                <ul className="list-group text-white">
                  <li className="list-group-item">
                  Reusable: {second_stage.reusable ? "Yes" : "No"}
                  </li>
                  <li className="list-group-item">
                  Fuel Amount Tons: {second_stage.fuel_amount_tons} {" tons"}
                  </li>
                  <li className="list-group-item">
                  Burn Times Sec: {second_stage.burn_time_sec} {" sec "}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
export default RocketDetails;

import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RocketItem  from './RocketItem'
import { Link } from 'react-router-dom';
import MissionKey from "./MissionKey";

const ROCKETS_QUERY = gql`
  query RocketsQuery {
    rockets {
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

class Rockets extends Component {
  render() {
    return (
      <Fragment>
          <Link to="/" className="btn btn-secondary my-4">
                  Back
                </Link>
                <MissionKey success='Active' fail= 'Non Active' progress='Awaiting'/>
        <Query query={ROCKETS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <Fragment>
                {data.rockets.map(item => (
                  <RocketItem key={item.rocket_id} rocket = {item}/>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Rockets;

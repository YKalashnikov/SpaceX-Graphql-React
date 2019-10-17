import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";
import { Link } from "react-router-dom";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;
export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey fail= 'Fail' success= 'Success' progress= 'Awaiting' />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return (
              <Fragment>
                {data.launches.map(item => (
                  <LaunchItem key={item.flight_number} launch={item} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;

import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ShipItem  from './ShipItem'
import { Link } from 'react-router-dom';



const SHIPS_QUERY = gql`
  query ShipsQuery {
    ships {
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
        position{
            latitude,
            longitude
        }
    }
  }
`;


class Ships extends Component {
    render () {
        return (
            <Fragment>
          <Link to="/" className="btn btn-secondary my-4">
                  Back
                </Link>
        <Query query={SHIPS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <Fragment>
                {data.ships.map(item => (
                  <ShipItem key={item.ship_id} ship = {item}/>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
        )
    }
}

export default Ships
import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";


const SHIP_QUERY = gql`
  query ShipQuery($ship_id: String!) {
    ship(ship_id: $ship_id) {
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

class ShipDetails extends Component {
  render() {
    let  {ship_id}  = this.props.match.params;
    return (
      <Fragment>
<Query query={SHIP_QUERY} variables={ {ship_id} }>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log('error',error);
            const {
                ship_name,
                ship_type,
                year_built,
                home_port,
                status,
                weight_lbs,
                weight_kg,
                url,
                image,
                position:{
                    latitude,
                    longitude
                }
            } = data.ship;
            return (
              <div>
                <Link to="/ships" className="btn btn-secondary  my-4">
                  Back
                </Link>
                <h4 className="mb-3">Ship Details</h4>
                <ul className="list-group text-white">
                <li className="list-group-item" >
                  Ship Name: {ship_name}
                  </li>
                  <li className="list-group-item" >
                  Ship Type: {ship_type}
                  </li>
                  <li className="list-group-item">
                    Year Built: {year_built}
                  </li>
                  <li className="list-group-item">
                    Home Port: {home_port}
                  </li>
                  <li className="list-group-item">
                    Mas: {weight_kg}{" kg "}{weight_lbs}{" lb "}
                  </li>
                  <li className="list-group-item">
                     Status: {status}
                  </li>
                  <li className="list-group-item">
                  Url: <a href={url} target="blank">Find Out More</a>
                  </li>
                  <li className="list-group-item">
                  Img: <a href={image} target="blank">Image</a>
                  </li>
                  <li className="list-group-item">
                    Position: {" latitude "} {latitude} {" longitude "} {longitude}
                  </li>
                </ul>
   
                <hr />
                <Link to="/ships" className="btn btn-secondary">
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
export default ShipDetails;

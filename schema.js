const fetch = require("node-fetch");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require("graphql");

const RocketsType = new GraphQLObjectType({
  name: "Rockets",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    stages: { type: GraphQLString },
    first_flight: { type: GraphQLString },
    country: {type: GraphQLString},
    cost_per_launch: { type: GraphQLInt },
    success_rate_pct: { type: GraphQLInt },
    height: { type: HeightType },
    mass: {type: Masstype},
    first_stage: {type: FirstStageType},
    second_stage: {type: FirstStageType},
    wikipedia: {type: GraphQLString},
    description: {type: GraphQLString},
    rocket_name: {type: GraphQLString}
  })
});
const FirstStageType = new GraphQLObjectType({
    name: "FirstStage",
    fields: () => ({
      reusable: { type: GraphQLBoolean },
      fuel_amount_tons: { type: GraphQLString },
      burn_time_sec: {type: GraphQLString }
    })
  });

const Masstype = new GraphQLObjectType({
    name: "Mass",
    fields: () => ({
      kg: { type: GraphQLString },
      lb: { type: GraphQLString }
    })
  });
const HeightType = new GraphQLObjectType({
  name: "Height",
  fields: () => ({
    meters: { type: GraphQLString },
    feet: { type: GraphQLString }
  })
});

const LaunchType = new GraphQLObjectType({
  name: "Launches",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});
const ShipType = new GraphQLObjectType({
  name: "Ships",
  fields: () => ({
    ship_id: {type: GraphQLString},
    ship_name: {type: GraphQLString},
    ship_type: {type: GraphQLString},
    year_built: {type: GraphQLInt },
    home_port: { type: GraphQLString},
    status: {type: GraphQLString},
    weight_lbs: {type: GraphQLInt},
    weight_kg: {type: GraphQLInt},
    url: {type: GraphQLString},
    image: {type: GraphQLString},
    position: {type: PositionType}

  })
});
const PositionType = new GraphQLObjectType({
  name: "Position",
  fields: () => ({
    latitude: {type: GraphQLFloat},
    longitude: {type: GraphQLFloat}
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parentValue, args) {
        return fetch("https://api.spacexdata.com/v3/launches").then(res =>
          res.json()
        );
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        ).then(res => res.json());
      }
    },
    rockets: {
      type: new GraphQLList(RocketsType),
      resolve(parentValue, args) {
        return fetch("https://api.spacexdata.com/v3/rockets").then(res =>
          res.json()
        );
      }
    },
    rocket: {
        type: RocketsType,
        args: {
          rocket_id: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          return fetch(
            `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
          ).then(res => res.json());
        }
      },
      ships: {
        type: new GraphQLList(ShipType),
        resolve(parenValue, args) {
          return fetch(`https://api.spacexdata.com/v3/ships`).then (res => res.json())
        }
      },
      ship: {
        type: ShipType,
        args: {
          ship_id: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          return fetch(
            `https://api.spacexdata.com/v3/ships/${args.ship_id}`
          ).then(res => res.json());
        }
      }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

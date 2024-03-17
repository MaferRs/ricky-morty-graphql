import { gql } from "@apollo/client";

const INFO_PERSON = gql`
  query {
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

export default INFO_PERSON;
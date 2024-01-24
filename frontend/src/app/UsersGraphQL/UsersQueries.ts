import { gql } from "@apollo/client";

export const allUsersQuery = gql`
  query MyQuery {
    allUsers {
      nodes {
        id
        email
        password
      }
    }
}
  `;



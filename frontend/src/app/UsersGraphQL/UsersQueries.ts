import { useQuery, gql } from "@apollo/client";

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

// export const userByEmailQuery = gql`
//   query Query {
//       userByEmail(email: ) {
//         id
//         name
//         password
//       }
//     }
// `



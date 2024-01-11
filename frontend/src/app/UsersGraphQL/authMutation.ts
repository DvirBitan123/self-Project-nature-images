import { gql } from "@apollo/client";

export const authMutation = gql`
  mutation MyMutation($email: String!, $password: String!) {
    authenticate(input: 
      {
        email: $email,
        password: $password
      }
    ) {
      jwtToken
    }
}
`
import { gql } from "@apollo/client";

export const createUserMutaion = gql`
  mutation MyMutation($email: String!, $password: String!)  {
    createUser(input: 
      {user: 
        {
          email: $email,
          password: $password
        }
      }) {
      user {
        id
        email
        password
      }
    }
  }
  `

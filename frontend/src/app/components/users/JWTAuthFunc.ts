import { NavigateFunction } from "react-router-dom";
import { AuthFuncType } from "../../types/helpertypes";
import { loginMessageAtom } from "../../Jotai atoms/Jotai_atoms";
import { SetStateAction, useAtom } from "jotai";

export async function JwtAuthUser(
  authUser: AuthFuncType,
  navigate: NavigateFunction,
  userEmail: string,
  userPassword: string) {

    // check if error message is good practice
  try {
    let myError = '';
    await authUser({
      variables: { email: userEmail, password: userPassword },
      onCompleted: (data) => {
        const { authenticate: { jwtToken } } = data;
        if (jwtToken) {
          console.log(jwtToken);
          localStorage.setItem('images_token', jwtToken);
          navigate('/');
        }
        else {
          myError = '⚠ Email or Password incorrect';
        }
      },
    });
    return myError
    
  } catch (error) {
    throw new Error(`error during authentication: ${error}`);
  }
}

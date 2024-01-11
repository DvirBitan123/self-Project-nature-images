import { NavigateFunction } from "react-router-dom";
import { AuthFuncType } from "../../types/helpertypes";
import { loginMessageAtom } from "../../Jotai atoms/Jotai_atoms";
import { useAtom } from "jotai";

export async function JwtAuthUser(
  authUser: AuthFuncType,
  navigate: NavigateFunction,
  userEmail: string,
  userPassword: string) {

  try {
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
          console.log('no token!!!! SSSHHHAAAMMEEEE!!!');
        }
      },
    });

  } catch (error) {
    throw new Error(`error during authentication: ${error}`);
  }
}

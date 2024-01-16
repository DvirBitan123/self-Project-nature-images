import UserAccount from "../components/userAccount/UserAccount";
import ROUTES from "../router/routes";

export default function UserPage() {

  // localStorage.setItem('images_token', '')
  const token = localStorage.getItem('images_token');
  
  console.log(token);
  
  
  if (localStorage.getItem('images_token') === "") {
    return (
      <>
        <h1>you have to login to enter this page</h1>
        <a href={ROUTES.LOGIN}>
          Login 
        </a>
      </>
    )
  }
  else {
    return (
      <>
        <UserAccount/>
      </>
    )
  }

}
import UserAccount from "../components/userAccount/UserAccount";
import UserNoToken from "../components/userAccount/UserNoToken";


export default function UserPage() {
  const userToken = localStorage.getItem('user_token');
  if (!userToken) {
    return (
      <>
        <UserNoToken/>
      </>
    )
  }
  else {
    return (
      <>
        <UserAccount />
      </>
    )
  }
  
}

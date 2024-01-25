import UserAccount from "../components/userAccount/UserAccount";
import UserNoToken from "../components/userAccount/UserNoToken";


export default function UserPage() {
  const userToken = localStorage.getItem('user_token');
  if (!userToken) {
    const message = 'You have to login first to enter this page'

    return (
      <UserNoToken message={message} />
    );
  }

  else {
    return (
      <UserAccount />
    );
  }

}

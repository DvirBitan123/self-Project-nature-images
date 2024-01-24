import { useEffect } from "react";
import UserAccount from "../components/userAccount/UserAccount";
import UserNoToken from "../components/userAccount/UserNoToken";
import { trpc } from "../trpcConnetion/ConnectTotRPC";

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

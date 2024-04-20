import { useLoaderData } from "../lib";

export const Account = () => {
  const account = document.createElement("div");
  
  const data = useLoaderData();
  account.innerHTML = "account" + JSON.stringify(data);


  return account;
}
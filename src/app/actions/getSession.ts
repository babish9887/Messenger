import { getServerSession } from "next-auth";
import MyAuthOptions from "../lib/MyAuthOptions";

export default async function getSession(){
      return await  getServerSession(MyAuthOptions);
}
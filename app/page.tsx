import { getServerSession } from "next-auth";
import LoginPage from "./LoginPage";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession()
  if (session) {
    return redirect('/partners')
  }
  return (
    <LoginPage />
  );
}

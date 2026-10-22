
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token && token.trim().length > 0) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}



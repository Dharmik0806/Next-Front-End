
import { redirect } from "next/navigation";
// "/" has no UI; the guards decide whether /dashboard shows or bounces to /login.
export default function Home() {
  redirect("/dashboard");
}


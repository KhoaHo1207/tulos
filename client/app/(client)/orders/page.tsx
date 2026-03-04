import { requiredUser } from "@/hooks/requiredUser";

export default async function OrdersPage() {
  const user = await requiredUser();
  return <div>OrdersPage</div>;
}

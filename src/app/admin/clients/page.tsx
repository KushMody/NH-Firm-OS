import { prisma } from "@/lib/prisma";
import { ClientBoard } from "./ClientBoard";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      user: true,
      tasks: {
        where: { status: { not: "COMPLETED" } }
      }
    },
    orderBy: { companyName: "asc" }
  });

  return <ClientBoard clients={clients} />;
}

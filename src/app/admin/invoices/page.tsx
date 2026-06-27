import { prisma } from "@/lib/prisma";
import { InvoiceBoard } from "./InvoiceBoard";

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" }
  });

  const clients = await prisma.client.findMany({
    select: { id: true, companyName: true },
    orderBy: { companyName: "asc" }
  });

  return <InvoiceBoard invoices={invoices} clients={clients} />;
}

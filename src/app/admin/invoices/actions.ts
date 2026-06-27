"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createInvoice(data: FormData) {
  const clientId = data.get("clientId") as string;
  const description = data.get("description") as string;
  const amountStr = data.get("amount") as string;
  const status = data.get("status") as string;

  if (!clientId || !description || !amountStr) return { error: "Missing fields" };

  await prisma.invoice.create({
    data: {
      clientId,
      description,
      amount: parseFloat(amountStr),
      status: status || "UNPAID",
    }
  });

  revalidatePath("/admin/invoices");
  return { success: true };
}

export async function toggleInvoiceStatus(invoiceId: string, currentStatus: string) {
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: currentStatus === "PAID" ? "UNPAID" : "PAID" }
  });
  
  revalidatePath("/admin/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  await prisma.invoice.delete({ where: { id: invoiceId } });
  revalidatePath("/admin/invoices");
}

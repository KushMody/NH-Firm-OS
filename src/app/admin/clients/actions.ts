"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createClient(data: FormData) {
  const companyName = data.get("companyName") as string;
  const gstNumber = data.get("gstNumber") as string;
  const panNumber = data.get("panNumber") as string;
  const email = data.get("email") as string;

  if (!companyName || !email) return { error: "Missing required fields" };

  // Generate a random password for the client portal
  const tempPassword = Math.random().toString(36).slice(-8);
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // 1. Create the User (for login)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: companyName,
      role: "CLIENT",
    },
  });

  // 2. Create the Client Profile
  await prisma.client.create({
    data: {
      userId: user.id,
      companyName,
      gstNumber,
      panNumber,
    },
  });

  revalidatePath("/admin/clients");
  return { success: true, tempPassword };
}

export async function deleteClient(clientId: string) {
  // Get the userId to delete the user account too
  const client = await prisma.client.findUnique({ where: { id: clientId }});
  if (client) {
    await prisma.user.delete({ where: { id: client.userId }}); // This cascades to Client due to onDelete: Cascade
  }
  revalidatePath("/admin/clients");
}

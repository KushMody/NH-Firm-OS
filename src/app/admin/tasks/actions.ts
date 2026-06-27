"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(data: FormData) {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const clientId = data.get("clientId") as string;
  const staffId = data.get("staffId") as string;
  const dueDateStr = data.get("dueDate") as string;

  if (!title || !clientId || !dueDateStr) return { error: "Missing required fields" };

  await prisma.task.create({
    data: {
      title,
      description,
      clientId,
      staffId: staffId || null,
      dueDate: new Date(dueDateStr),
      status: "DOC_COLLECTION",
    },
  });

  revalidatePath("/admin/tasks");
  return { success: true };
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  revalidatePath("/admin/tasks");
  return { success: true };
}

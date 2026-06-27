export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { TaskBoard } from "./TaskBoard";

export default async function TaskWorkflowPage() {
  const tasks = await prisma.task.findMany({
    include: {
      client: true,
      staff: true,
    },
    orderBy: { dueDate: "asc" }
  });

  const clients = await prisma.client.findMany({
    select: { id: true, companyName: true }
  });

  const staff = await prisma.user.findMany({
    where: { role: "STAFF" },
    select: { id: true, name: true }
  });

  return (
    <TaskBoard 
      initialTasks={tasks} 
      clients={clients} 
      staff={staff} 
    />
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST() {
  try {
    // Check if admin already exists to prevent duplicate seeding
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "Nextgenhorizon@outlook.com" },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Already seeded" });
    }

    const hashedAdminPassword = await bcrypt.hash("Nextgen@2026", 10);
    const hashedDemoPassword = await bcrypt.hash("demo", 10);

    // Create Admin
    const admin = await prisma.user.create({
      data: {
        email: "Nextgenhorizon@outlook.com",
        password: hashedAdminPassword,
        name: "CA Firm Admin",
        role: "ADMIN",
      },
    });

    // Create Staff
    const staff = await prisma.user.create({
      data: {
        email: "staff@demo.com",
        password: hashedDemoPassword,
        name: "Rahul Staff",
        role: "STAFF",
      },
    });

    // Create Client
    const clientUser = await prisma.user.create({
      data: {
        email: "client@demo.com",
        password: hashedDemoPassword,
        name: "Reliance Industries",
        role: "CLIENT",
      },
    });

    // Create Client Profile
    const clientProfile = await prisma.client.create({
      data: {
        userId: clientUser.id,
        companyName: "Reliance Industries",
        gstNumber: "27AAACR3845Q1ZA",
        panNumber: "AAACR3845Q",
      },
    });

    // Create Demo Tasks
    await prisma.task.createMany({
      data: [
        {
          title: "GST GSTR-1",
          description: "Monthly return",
          status: "DOC_COLLECTION",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
          clientId: clientProfile.id,
          staffId: staff.id,
        },
        {
          title: "Income Tax (Corporate)",
          description: "Annual filing",
          status: "PREPARATION",
          dueDate: new Date("2026-10-31T00:00:00Z"),
          clientId: clientProfile.id,
          staffId: staff.id,
        },
        {
          title: "ROC Annual Return",
          description: "MCA filing",
          status: "REVIEW",
          dueDate: new Date("2026-11-30T00:00:00Z"),
          clientId: clientProfile.id,
          staffId: staff.id,
        },
      ],
    });

    // Create Demo Invoice
    await prisma.invoice.create({
      data: {
        amount: 150000,
        status: "PAID",
        description: "Annual Audit Fee",
        clientId: clientProfile.id,
      },
    });

    return NextResponse.json({ message: "Seed successful" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}

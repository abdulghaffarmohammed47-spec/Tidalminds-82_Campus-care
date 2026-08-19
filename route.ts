import { NextResponse } from "next/server";
import { db } from "@/db";
import { issues, appointments, announcements, resources } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

export async function GET() {
  try {
    const [issueCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(issues);

    const [openIssueCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(issues)
      .where(eq(issues.status, "open"));

    const [appointmentCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(appointments);

    const [announcementCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(announcements)
      .where(eq(announcements.active, true));

    const [resourceCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(resources)
      .where(eq(resources.available, true));

    return NextResponse.json({
      totalIssues: Number(issueCount.count),
      openIssues: Number(openIssueCount.count),
      totalAppointments: Number(appointmentCount.count),
      activeAnnouncements: Number(announcementCount.count),
      availableResources: Number(resourceCount.count),
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

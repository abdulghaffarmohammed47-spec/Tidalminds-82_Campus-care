import { db } from "@/db";
import { announcements } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import {
  Megaphone,
  Heart,
  Shield,
  AlertTriangle,
  Clock,
  Info,
} from "lucide-react";

export const dynamic = "force-dynamic";

const categoryConfig: Record<string, { label: string; icon: typeof Heart; color: string; bg: string }> = {
  wellness: { label: "Wellness", icon: Heart, color: "text-purple-600", bg: "bg-purple-50" },
  health: { label: "Health", icon: Shield, color: "text-green-600", bg: "bg-green-50" },
  safety: { label: "Safety", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  general: { label: "General", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
};

export default async function AnnouncementsPage() {
  let allAnnouncements: (typeof announcements.$inferSelect)[] = [];
  try {
    allAnnouncements = await db
      .select()
      .from(announcements)
      .where(eq(announcements.active, true))
      .orderBy(desc(announcements.createdAt));
  } catch {
    // DB might not be ready
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">Announcements</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Stay updated with the latest campus wellness news, events, and important notices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {allAnnouncements.length > 0 ? (
          <div className="space-y-5">
            {allAnnouncements.map((a) => {
              const config = categoryConfig[a.category] || categoryConfig.general;
              const CategoryIcon = config.icon;
              return (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${config.bg} p-3 rounded-xl shrink-0`}>
                      <CategoryIcon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h2 className="text-lg font-bold text-gray-900">{a.title}</h2>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            a.priority === "high"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {a.priority}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{a.content}</p>
                      <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(a.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center">
            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No announcements yet</h3>
            <p className="text-gray-400">Initialize the platform from the dashboard to add announcements.</p>
          </div>
        )}
      </div>
    </div>
  );
}

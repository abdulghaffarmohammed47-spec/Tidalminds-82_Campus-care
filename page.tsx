import { db } from "@/db";
import { resources } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import {
  Brain,
  Heart,
  GraduationCap,
  HandHeart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

const categoryConfig: Record<string, { label: string; icon: typeof Brain; color: string; bg: string }> = {
  mental_health: { label: "Mental Health", icon: Brain, color: "text-purple-600", bg: "bg-purple-50" },
  physical_health: { label: "Physical Health", icon: Heart, color: "text-red-600", bg: "bg-red-50" },
  academic: { label: "Academic Support", icon: GraduationCap, color: "text-campus-600", bg: "bg-campus-50" },
  basic_needs: { label: "Basic Needs", icon: HandHeart, color: "text-care-600", bg: "bg-care-50" },
};

export default async function ResourcesPage() {
  let allResources: (typeof resources.$inferSelect)[] = [];
  try {
    allResources = await db
      .select()
      .from(resources)
      .where(eq(resources.available, true))
      .orderBy(asc(resources.sortOrder));
  } catch {
    // DB might not be ready
  }

  const groupedResources: Record<string, (typeof resources.$inferSelect)[]> = {};
  for (const r of allResources) {
    if (!groupedResources[r.category]) {
      groupedResources[r.category] = [];
    }
    groupedResources[r.category].push(r);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-care-600 to-care-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">Wellness Resources</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Browse campus support services organized by category. All services are available to enrolled students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {Object.keys(groupedResources).length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No resources yet</h3>
            <p className="text-gray-400">Initialize the platform from the dashboard to add resources.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedResources).map(([category, items]) => {
              const config = categoryConfig[category] || {
                label: category,
                icon: Heart,
                color: "text-gray-600",
                bg: "bg-gray-50",
              };
              const CategoryIcon = config.icon;
              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`${config.bg} p-2.5 rounded-xl`}>
                      <CategoryIcon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{config.label}</h2>
                    <span className="text-sm text-gray-400">({items.length})</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {items.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <div className="space-y-2">
                          {resource.contactPhone && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <a href={`tel:${resource.contactPhone}`} className="hover:text-campus-600 transition">
                                {resource.contactPhone}
                              </a>
                            </div>
                          )}
                          {resource.contactEmail && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <a href={`mailto:${resource.contactEmail}`} className="hover:text-campus-600 transition">
                                {resource.contactEmail}
                              </a>
                            </div>
                          )}
                          {resource.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {resource.location}
                            </div>
                          )}
                          {resource.hoursOfOperation && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {resource.hoursOfOperation}
                            </div>
                          )}
                        </div>
                        {resource.websiteUrl && resource.websiteUrl !== "#" && (
                          <a
                            href={resource.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-campus-600 hover:text-campus-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

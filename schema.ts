import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  priority: varchar("priority", { length: 20 }).notNull().default("medium"),
  status: varchar("status", { length: 20 }).notNull().default("open"),
  reporterName: varchar("reporter_name", { length: 255 }).notNull(),
  reporterEmail: varchar("reporter_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 255 }).notNull(),
  counselorName: varchar("counselor_name", { length: 255 }).notNull(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  appointmentDate: date("appointment_date").notNull(),
  timeSlot: varchar("time_slot", { length: 50 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  priority: varchar("priority", { length: 20 }).notNull().default("normal"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  location: varchar("location", { length: 255 }),
  hoursOfOperation: varchar("hours_of_operation", { length: 255 }),
  websiteUrl: varchar("website_url", { length: 500 }),
  available: boolean("available").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

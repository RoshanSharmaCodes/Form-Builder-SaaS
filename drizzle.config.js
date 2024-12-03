import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./config/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://AIFormBuilder_owner:Uyu3ZLak8PJQ@ep-rapid-voice-a5wztk95.us-east-2.aws.neon.tech/AIFormBuilder?sslmode=require",
  }
});

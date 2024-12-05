"use client";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUI from "../_components/FormUI";

export default function EditForm({ params: paramsPromise }) {
  const [jsonFormData, setJsonFormData] = useState({});
  const router = useRouter();
  const { user } = useUser();

  const handleGetForm = async () => {
    try {
      const resolvedParams = await paramsPromise; 
      const id = resolvedParams.id;
      if (!user) return;
      const resp = await db
        .select()
        .from(jsonForm)
        .where(
          and(
            eq(jsonForm.id, id),
            eq(jsonForm.createdBy, user.primaryEmailAddress?.emailAddress)
          )
        );

      console.log("Form Response:", resp[0]?.jsonForm);
      if (resp.length === 0) {
        console.error("No matching record found for the given id.");
        setJsonFormData({});
        return;
      }
      const rawJsonForm = resp[0]?.jsonForm || "{}";
      let parsedJsonForm;
      try {
        parsedJsonForm = JSON.parse(rawJsonForm);
      } catch (error) {
        console.error("Error parsing JSON:", error, rawJsonForm);
        parsedJsonForm = {};
      }
      setJsonFormData(parsedJsonForm);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  
  useEffect(() => {
    if (user) handleGetForm();
  }, [user]); 

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center cursor-pointer my-5 hover:text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-sm h-screen p-4">
          {/* Render FormUI only if jsonFormData contains valid data */}
          {Object.keys(jsonFormData).length > 0 && (
            <FormUI data={jsonFormData} />
          )}
        </div>
      </div>
    </div>
  );
}

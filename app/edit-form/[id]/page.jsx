"use client";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

export default function EditForm({ params }) {
  const [jsonFormData, setJsonFormData] = useState("");
  const { user } = useUser();

  const handleGetForm = async () => {
    const resp = await db
      .select()
      .from(jsonForm)
      .where(
        and(
          eq(jsonForm.id, params.id),
          eq(jsonForm.createdBy, user.primaryEmailAddress?.emailAddress)
        )
      );
    setJsonFormData(JSON.parse(resp[0].jsonForm));
  };

  useEffect(() => {
    user && handleGetForm();
  }, [user]);

  return <div>Edit Form</div>;
}

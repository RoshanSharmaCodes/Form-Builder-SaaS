"use client";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

export default function FormList() {
  const [formList, setFormList] = useState();
  const { user } = useUser();
  const handleGetAllForms = async () => {
    const result = await db
      .select()
      .from(jsonForm)
      .where(eq(jsonForm?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(jsonForm.id));
    console.log("All Forms List", result);
    setFormList(result)
  };

  useEffect(() => {
    user && handleGetAllForms();
  }, [user]);
  return <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
    {
        formList?.map((form, index) => 
            <div className="mt-5">
                <FormListItem refresh={handleGetAllForms} record={form} jsonFormData={JSON.parse(form.jsonForm)}/>
            </div>
        )
    }
  </div>;
}

"use client";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItemResponse from "./_component/FormListItemResponse";

export default function Responses() {
  const { user } = useUser();
  const [formList, setFormList] = useState();
  const getFromList = async () => {
    const resp = await db
      .select()
      .from(jsonForm)
      .where(eq(jsonForm.createdBy, user?.primaryEmailAddress?.emailAddress));
    setFormList(resp);
    console.log("Submissions", resp);
  };

  useEffect(() => {
    user && getFromList();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {formList?.length > 0 && formList?.map((form, index) => (
            <FormListItemResponse
              formRecord={form}
              jsonResponse={JSON.parse(form.jsonForm)}
            />
          ))}
        </div>
      </h2>
    </div>
  );
}

"use client";
import FormUI from "@/app/edit-form/_components/FormUI";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LiveForm() {
  const [record, setRecord] = useState();
  const [jsonFormData, setJsonFormData] = useState();
  const handleGetFormData = async () => {
    const resp = await db
      .select()
      .from(jsonForm)
      .where(eq(jsonForm?.id, Number(param?.id)));

    setRecord(resp[0]);
    setJsonFormData(JSON.parse(resp[0].jsonForm));
  };

  useEffect(() => {
    handleGetFormData();
  }, []);

  const param = useParams();
  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ background: record?.background }}
    >
      {record?.id && (
        <FormUI
          data={jsonFormData}
          activeTheme={record?.theme}
          editable={false}
          formId={record?.id}
        />
      )}
      <Link target="_blank" href={"https://github.com/RoshanSharmaCodes"} className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 right-5">
        <Image src={"/logo.svg"} width={26} height={26}/> Build By RoshanSharmaCodes ❤️
      </Link>
    </div>
  );
}

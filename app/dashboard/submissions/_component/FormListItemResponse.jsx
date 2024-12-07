import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { jsonForm, userResponseJson } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Download, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function FormListItemResponse({ formRecord, jsonResponse }) {

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState([]);

  useEffect(()=>{
    const getData = async()=> {
        const result = await db
        .select()
        .from(userResponseJson)
        .where(eq(userResponseJson.formRef, formRecord.id));
        console.log("Forms",result.length)
        setTotalRecords(result)    
    }

    getData()
  },[])

  const handleExportData = async () => {
    setLoading(true);
    let jsonData = [];
    const result = await db
      .select()
      .from(userResponseJson)
      .where(eq(userResponseJson.formRef, formRecord.id));

    if (result) {
      setTotalRecords(result.length);
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.response);
        jsonData.push(jsonItem);
      });
    }

    handleExportToExcel(jsonData);
    setLoading(false);
  };

  const handleExportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      jsonResponse?.formTitle.split(" ").join("_") + ".xlsx"
    );
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="text-lg text-black">{jsonResponse?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonResponse?.formSubheading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-center">
        <h2 className="text-sm text-gray-700">
          <strong>{totalRecords.length}</strong> Submissions
        </h2>
        <Button onClick={() => handleExportData()} disabled={loading}>
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Download Responses"
          )}
        </Button>
      </div>
    </div>
  );
}

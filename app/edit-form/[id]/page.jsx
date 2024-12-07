"use client";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUI from "../_components/FormUI";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

export default function EditForm({ params: paramsPromise }) {
  var [jsonFormData, setJsonFormData] = useState({});
  const [triggerUpdate, setTriggerUpdate] = useState();
  const [record, setRecord] = useState();
  const [activeTheme, setActiveTheme] = useState("light");
  const [bgTheme, setBGTheme] = useState("");
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

      console.log("Form Response:", resp[0]);
      setRecord(resp[0]);
      setActiveTheme(resp[0].theme);
      setBGTheme(resp[0].background);
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

  const handleFieldUpdate = (value, index) => {
    console.log("Before update, jsonFormData:", jsonFormData);

    let formData =
      typeof jsonFormData === "string"
        ? JSON.parse(jsonFormData)
        : jsonFormData;
    const updatedFields = [...formData.formFields];
    updatedFields[index] = {
      ...updatedFields[index],
      label: value.label,
      placeholder: value.placeholder,
    };
    const updatedFormData = { ...formData, formFields: updatedFields };
    setJsonFormData(JSON.stringify(updatedFormData));
    setTriggerUpdate(Date.now());
  };

  const handleFieldUpdateOnDB = async () => {
    const result = await db
      .update(jsonForm)
      .set({
        jsonForm: jsonFormData,
      })
      .where(
        and(
          eq(jsonForm.createdBy, user.primaryEmailAddress.emailAddress),
          eq(jsonForm.id, record.id)
        )
      );
    console.log("DB Updation", result);
  };

  const handleDeleteField = (fieldIndex) => {
    console.log("JSON Delete Data", jsonFormData);
    jsonFormData =
      typeof jsonFormData === "string"
        ? JSON.parse(jsonFormData)
        : jsonFormData;
    const result = jsonFormData?.formFields.filter(
      (item, index) => index != fieldIndex
    );
    jsonFormData.formFields = result;
    setJsonFormData(jsonFormData);
    setTriggerUpdate(Date.now());
  };

  const handleFormUpdate = async (value, columnName) => {
    const resp = await db
      .update(jsonForm)
      .set({
        [columnName]: value,
      })
      .where(
        and(
          eq(jsonForm.createdBy, user.primaryEmailAddress.emailAddress),
          eq(jsonForm.id, record.id)
        )
      )
      .returning({ id: jsonForm.id });
  };

  useEffect(() => {
    if (user) handleGetForm();
  }, [user]);

  useEffect(() => {
    if (triggerUpdate) {
      setJsonFormData(jsonFormData);
      handleFieldUpdateOnDB();
    }
  }, [triggerUpdate]);

  useEffect(() => {
    console.log("Theme Changed", activeTheme);
  }, [activeTheme]);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
      <h2
        className="flex gap-2 items-center cursor-pointer my-5 hover:text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="flex gap-3">
        <Link target="_blank" href={"/aiform/"+record?.id}>
        <Button> <SquareArrowOutUpRightIcon/> Live Preview</Button>
        </Link>
        <RWebShare
        data={{
          text: jsonFormData?.formHeading + " , Build your own AI From using this amazing tool. ",
          url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/"+record?.id,
          title: jsonFormData?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button variant="outline" className=" text-white bg-green-500 hover:text-white hover:bg-green-600" size="sm">
          {" "}
          <Share2 /> Share
        </Button>
      </RWebShare>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            handleFormUpdate={handleFormUpdate}
            selectedBg={(value) => setBGTheme(value)}
            selectedTheme={(value) => setActiveTheme(value)}
            setSignInEnable={(value)=> handleFormUpdate(value,"enableSignIn")}
            record={record}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-sm h-max p-4 flex items-center justify-center"
          style={{ backgroundImage: bgTheme }}
        >
          {Object.keys(jsonFormData).length > 0 && (
            <FormUI
              data={jsonFormData}
              handleFieldUpdate={handleFieldUpdate}
              handleDeleteField={handleDeleteField}
              activeTheme={activeTheme}
              formId={record?.id}
              enableSignedIn={record?.enableSignIn}
            />
          )}
        </div>
      </div>
    </div>
  );
}

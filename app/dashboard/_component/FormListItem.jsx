import { Button } from "@/components/ui/button";
import { PenBox, Share2, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import React from "react";
import { db } from "@/config";
import { and, eq } from "drizzle-orm";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { RWebShare } from "react-web-share";

export default function FormListItem({ jsonFormData, record, refresh }) {
  const { user } = useUser();
  const handleDeleteForm = async () => {
    const result = await db
      .delete(jsonForm)
      .where(
        and(
          eq(jsonForm.createdBy, user?.primaryEmailAddress?.emailAddress),
          eq(jsonForm.id, record.id)
        )
      );
    console.log(result);
    if (result) {
      refresh();
    }
  };
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <h1></h1>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="h-5 w-5 text-red-500 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                from and it's responses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteForm()}
                className="bg-red-500 hover:bg-red-600"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="text-lg text-black">{jsonFormData?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonFormData?.formHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between">
      <RWebShare
        data={{
          text: jsonFormData?.formHeading + " , Build your own AI From using this amazing tool. ",
          url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/"+record.id,
          title: jsonFormData?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button variant="outline" size="sm">
          {" "}
          <Share2 /> Share
        </Button>
      </RWebShare>
        <Link target="_blank" href={"/edit-form/" + record.id}>
          <Button size="sm">
            {" "}
            <PenBox /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

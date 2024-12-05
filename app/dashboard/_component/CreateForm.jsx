"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "@/config/AIModal";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/config";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CreateForm() {
  const [userInput, setUserInput] = useState("");
  const [dialogBox, setDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const PROMPT_TEXT = `Description: ${userInput}, On the basis of description please give me form in json format with form title, form subheading with form having form field, form name, placeholder name, and form label, field type, field required in json format. And make sure the data is clean and there should be no comments for suggestion or explanation, only json data.`;

  const handleCreateForm = async () => {
    setLoading(true);
    const result = await AIChatSession.sendMessage(PROMPT_TEXT);
    if (result.response.text()) {
      const rawJson = await result.response.text();
      const cleanedJson = rawJson.trim().replace(/^```json\n|```$/g, ""); // Remove artifacts
      const resp = await db
        .insert(jsonForm)
        .values({
          jsonForm: JSON.parse(JSON.stringify(cleanedJson)),
          createdBy: user.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ id: jsonForm.id });
      if (resp[0].id) {
        route.push("/edit-form/" + resp[0].id);
      }

      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={() => setDialogBox(true)}>+ Create AI Form</Button>
      <Dialog open={dialogBox}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                placeholder="Write description of your form..."
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-5">
                <Button
                  onClick={() => setDialogBox(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={handleCreateForm}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

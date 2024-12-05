import { Delete, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FieldEdit({
  defaultValue,
  fieldIndex,
  handleFieldUpdate,
  handleDeleteField
}) {
  const [label, setLabel] = useState(defaultValue.label);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);
  return (
    <div className="flex gap-3">
      <AlertDialog>
        <AlertDialogTrigger><Trash className="h-5 w-5 text-red-500" /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the field.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>handleDeleteField(fieldIndex)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      

      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className="text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs">Placeholder text</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>

          <Button
            size="sm"
            className="mt-3"
            onClick={() =>
              handleFieldUpdate(
                { label: label, placeholder: placeholder },
                fieldIndex
              )
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

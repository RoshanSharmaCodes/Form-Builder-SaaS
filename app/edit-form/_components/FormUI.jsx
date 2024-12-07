"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldEdit from "./FieldEdit";
import { db } from "@/config";
import { userResponseJson } from "@/config/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

export default function FormUI({
  data,
  handleFieldUpdate,
  handleDeleteField,
  activeTheme="light",
  editable = true,
  formId = 0,
}) {
  const [formData, setFormData] = useState(data);
  const [responseData, setResponseData] = useState();
  const formRef = useRef();
  const user = useUser()

  const handleUserResponse = (e) => {
    const { name, value } = e.target;
    setResponseData({ ...responseData, [name]: value });
  };

  const handleSelectChange = (fieldName, value) => {
    setResponseData({ ...responseData, [fieldName]: value });
  };

  const handleCheckboxChange = (fieldName, optionName, isChecked) => {
    const currentSelections = responseData?.[fieldName] || [];
    let updatedSelections;

    if (isChecked) {
      updatedSelections = [
        ...currentSelections,
        { label: optionName, value: isChecked },
      ];
    } else {
      updatedSelections = currentSelections.filter(
        (item) => item.label !== optionName
      );
    }

    setResponseData({ ...responseData, [fieldName]: updatedSelections });
    console.log("Updated Selections:", updatedSelections);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log("form id", formId)
    const resp = await db.insert(userResponseJson).values({
      response: responseData,
      createdAt: moment().format("DD/MM/yyyy"),
      createdBy: user.user.primaryEmailAddress.emailAddress,
      formRef: formId,      
    })
    formRef.current.reset();
    console.log("On Save", resp)
  };

  useEffect(() => {
    console.log("Data", data);
    if (typeof data === "string") {
      setFormData(JSON.parse(data));
    } else {
      setFormData(data);
    }
  }, [data]);

  useEffect(() => {
    console.log("Form inside UI", formData);
  }, [formData, activeTheme]);

  return (
    <form
      ref={formRef}
      className="border p-5 md:w-[600px] rounded-md"
      onSubmit={handleFormSubmit}
      data-theme={activeTheme == null ? "light" : activeTheme.toLowerCase()}
    >
      <h2 className="font-bold text-center text-2xl">{formData.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {formData.formSubheading}
      </h2>
      {formData?.formFields?.length > 0 &&
        formData?.formFields.map((item, index) => (
          <div key={index} className="flex items-center gap-2 justify-center">
            <div className="my-3 w-full">
              {item.type == "select" ? (
                <div className="my-3">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <Select
                    onValueChange={(e) => handleSelectChange(item.fieldName, e)}
                    className="bg-transparent"
                  >
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue className="bg-transparent" placeholder={item.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.length > 0 &&
                        item.options.map((option, key) => (
                          <SelectItem key={key} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : item.type === "radio" ? (
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <RadioGroup defaultValue={item.options[0].label}>
                    {item.options.map((option, key) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.label}
                          id={option.label}
                          onClick={() =>
                            handleSelectChange(item.fieldName, option.label)
                          }
                        />
                        <Label htmlFor={option.label}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : item.type === "checkbox" ? (
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  {item.options.length > 0 ? (
                    item?.options.map((option, key) => (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          onCheckedChange={(v) =>
                            handleCheckboxChange(
                              item.fieldName,
                              option.label,
                              v
                            )
                          }
                        />
                        <h2>{option.label}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-2">
                      <Checkbox />
                      <h2>{item.label}</h2>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <Input
                    type={item.type}
                    placeholder={item.placeholder}
                    name={item.fieldName}
                    className="bg-transparent"
                    onChange={(e) => handleUserResponse(e)}
                    required={item.required}
                  />
                </div>
              )}
            </div>
            {editable && (
              <FieldEdit
                defaultValue={item}
                fieldIndex={index}
                handleFieldUpdate={handleFieldUpdate}
                handleDeleteField={handleDeleteField}
              />
            )}
          </div>
        ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

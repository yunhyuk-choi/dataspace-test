"use client";

import TextEditor from "@/components/commons/TextEditor";
import { useField } from "@tanstack/react-form";
import { memo } from "react";
import { DatasetAPIType } from "../types/formInterfaces";

function DatasetDescription({ form }: { form: DatasetAPIType }) {
  const field = useField({ form, name: "detailDescription" });
  
  return (
    <div className="space-y-2 rounded border p-4">
      <h2 className="text-lg font-bold">Data Desciprtion</h2>
      <TextEditor field={field} />
    </div>
  );
}

export default memo(DatasetDescription);

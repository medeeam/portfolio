import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function DocViewer() {
  const [params] = useSearchParams();
  const file = params.get("file");
  const navigate = useNavigate();

  if (!file) {
    return <div className="p-6">No document provided.</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 dark:bg-slate-900">
      <div className="p-4 bg-white border-b border-slate-200 shadow-sm flex justify-between items-center dark:bg-slate-800 dark:border-slate-700">
        <h1 className="text-lg font-semibold">Document Viewer</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          ← Back
        </button>
      </div>
      <iframe
        src={file}
        className="flex-1 w-full"
        style={{ border: "none" }}
        title="Document"
      />
    </div>
  );
}

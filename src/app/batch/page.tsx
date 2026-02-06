"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";

interface BatchFile {
  id: string;
  name: string;
  records: number;
  status: "pending" | "processing" | "completed" | "failed";
  uploaded: string;
  successCount?: number;
  failedCount?: number;
}

const mockBatches: BatchFile[] = [
  {
    id: "batch-001",
    name: "january_sales.csv",
    records: 156,
    status: "completed",
    uploaded: "2024-01-15 09:30 AM",
    successCount: 152,
    failedCount: 4,
  },
  {
    id: "batch-002",
    name: "refunds_q4.csv",
    records: 23,
    status: "completed",
    uploaded: "2024-01-14 02:15 PM",
    successCount: 23,
    failedCount: 0,
  },
  {
    id: "batch-003",
    name: "recurring_charges.csv",
    records: 89,
    status: "processing",
    uploaded: "2024-01-15 11:45 AM",
  },
];

export default function BatchPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [batches, setBatches] = useState<BatchFile[]>(mockBatches);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find((f) => f.name.endsWith(".csv"));

    if (csvFile) {
      await uploadFile(csvFile);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newBatch: BatchFile = {
      id: `batch-${Date.now()}`,
      name: file.name,
      records: Math.floor(Math.random() * 200) + 10,
      status: "pending",
      uploaded: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setBatches((prev) => [newBatch, ...prev]);
    setIsUploading(false);

    setTimeout(() => {
      setBatches((prev) =>
        prev.map((b) =>
          b.id === newBatch.id ? { ...b, status: "processing" as const } : b
        )
      );
    }, 1000);

    setTimeout(() => {
      const failed = Math.floor(Math.random() * 5);
      setBatches((prev) =>
        prev.map((b) =>
          b.id === newBatch.id
            ? {
                ...b,
                status: "completed" as const,
                successCount: b.records - failed,
                failedCount: failed,
              }
            : b
        )
      );
    }, 4000);
  };

  const deleteBatch = (id: string) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const getStatusBadge = (status: BatchFile["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
            <Loader2 className="w-3 h-3 animate-spin" />
            Processing
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Batch Upload"
          subtitle="Upload and track CSV batches for bulk processing."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 mb-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`panel p-8 border-2 border-dashed transition-all ${
              isDragOver ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]" : "border-slate-200"
            }`}
          >
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-colors ${
                  isDragOver ? "bg-[var(--color-primary-soft)]" : "bg-slate-100"
                }`}
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {isUploading ? "Uploading..." : "Upload Batch File"}
              </h3>
              <p className="text-slate-500 mb-4">
                Drag and drop a CSV file here, or click to browse
              </p>
              <label className="btn btn-primary btn-md cursor-pointer">
                <Upload className="w-4 h-4" />
                Select File
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">CSV File Format</h4>
                <p className="text-sm text-slate-500">
                  Include columns: type, amount, card_number, expiry, cvv, description. For ACH:
                  type, amount, routing, account, account_type, sec_code.
                </p>
                <button className="btn btn-outline btn-sm mt-3">Download template</button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="panel-header">
            <h2 className="text-lg font-semibold text-slate-900">Batch History</h2>
            <p className="text-sm text-slate-500">Recent uploads and processing status</p>
          </div>

          {batches.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No batch files uploaded yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-900 truncate">{batch.name}</span>
                      {getStatusBadge(batch.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span>{batch.records} records</span>
                      <span>•</span>
                      <span>{batch.uploaded}</span>
                      {batch.status === "completed" && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600">{batch.successCount} success</span>
                          {batch.failedCount! > 0 && (
                            <span className="text-red-500">{batch.failedCount} failed</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {batch.status === "completed" && (
                      <button className="btn-icon" aria-label="Download report">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteBatch(batch.id)}
                      className="btn-icon hover:text-red-500"
                      aria-label="Delete batch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

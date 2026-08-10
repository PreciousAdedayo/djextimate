"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, CheckCircle2, XCircle } from "lucide-react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "datetime-local" | "url";
  required?: boolean;
  placeholder?: string;
};

const inputClass =
  "w-full rounded-lg border border-line bg-raised px-4 py-3 text-sm text-bone placeholder:text-stone/60 outline-none transition-colors duration-300 focus:border-ember";

export default function ResourceManager({
  endpoint,
  fields,
  itemTitle,
  itemMeta,
}: {
  endpoint: string;
  fields: Field[];
  itemTitle: (item: any) => string;
  itemMeta: (item: any) => string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch(endpoint);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const form = e.currentTarget;
    const data: Record<string, any> = Object.fromEntries(new FormData(form));
    for (const f of fields) {
      if (f.type === "checkbox") {
        data[f.name] = form.querySelector<HTMLInputElement>(`input[name="${f.name}"]`)?.checked ?? false;
      }
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed.");
      }
      setMessage({ type: "ok", text: "Saved successfully." });
      form.reset();
      load();
    } catch (err: any) {
      setMessage({ type: "err", text: err.message || "Save failed." });
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1.1fr]">
      <div className="card p-7 md:p-8">
        <p className="eyebrow-muted mb-6">Add new</p>
        <form onSubmit={onSubmit} className="grid gap-5">
          {fields.map((f) => {
            if (f.type === "checkbox") {
              return (
                <label key={f.name} className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-bone/80">
                  <input type="checkbox" name={f.name} className="h-4 w-4 accent-ember" />
                  {f.label}
                </label>
              );
            }
            if (f.type === "textarea") {
              return (
                <div key={f.name}>
                  <label className="eyebrow-muted mb-2 block">{f.label}</label>
                  <textarea
                    name={f.name}
                    required={f.required}
                    placeholder={f.placeholder}
                    rows={5}
                    className={inputClass}
                  />
                </div>
              );
            }
            return (
              <div key={f.name}>
                <label className="eyebrow-muted mb-2 block">{f.label}</label>
                <input
                  name={f.name}
                  type={f.type === "url" ? "text" : f.type || "text"}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={inputClass}
                />
              </div>
            );
          })}

          <button className="btn-solid mt-2 w-fit" disabled={saving}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            Save
          </button>

          {message && (
            <p className={`flex items-center gap-2 text-sm ${message.type === "ok" ? "text-ember" : "text-red-400"}`}>
              {message.type === "ok" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {message.text}
            </p>
          )}
        </form>
      </div>

      <div>
        <p className="eyebrow-muted mb-6">Existing ({items.length})</p>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-stone">
            <Loader2 size={14} className="animate-spin" /> Loading&hellip;
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-stone">Nothing here yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate font-body text-sm text-bone">{itemTitle(item)}</p>
                  <p className="truncate font-mono text-[11px] uppercase tracking-wide text-stone">
                    {itemMeta(item)}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  className="shrink-0 rounded-full p-2 text-stone transition-colors duration-200 hover:bg-ember/10 hover:text-ember"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import AdminShell from "@/components/admin/AdminShell";
import ResourceManager, { Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title", label: "Title", required: true, placeholder: "Article title" },
  { name: "category", label: "Category", placeholder: "Music, Lifestyle..." },
  { name: "readTime", label: "Read time", placeholder: "5 min read" },
  { name: "excerpt", label: "Excerpt", placeholder: "One or two sentence summary" },
  { name: "content", label: "Content", type: "textarea", placeholder: "Full article text (one paragraph per line)" },
  { name: "published", label: "Publish now", type: "checkbox" },
];

export default function AdminPosts() {
  return (
    <AdminShell eyebrow="Content" title="Journal">
      <ResourceManager
        endpoint="/api/posts"
        fields={fields}
        itemTitle={(p) => p.title}
        itemMeta={(p) => `${p.category} · ${p.published ? "Published" : "Draft"}`}
      />
    </AdminShell>
  );
}

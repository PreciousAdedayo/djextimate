import AdminShell from "@/components/admin/AdminShell";
import ResourceManager, {
  Field,
} from "@/components/admin/ResourceManager";

const fields: Field[] = [
  {
    name: "title",
    label: "Post title",
    required: true,
    placeholder: "The Sound Beyond The Set",
  },
  {
    name: "slug",
    label: "Slug",
    required: true,
    placeholder: "the-sound-beyond-the-set",
  },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
    placeholder: "Short description...",
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    required: true,
    placeholder: "Write your article...",
  },
  {
    name: "coverImage",
    label: "Cover image URL",
    type: "url",
    placeholder: "https://...",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Music",
  },
  {
    name: "published",
    label: "Publish now",
    type: "checkbox",
  },
];

export default function AdminPosts() {
  return (
    <AdminShell eyebrow="Content" title="Journal">
      <ResourceManager
        endpoint="/api/posts"
        fields={fields}
        titleField="title"
        metaFields={["category", "published"]}
      />
    </AdminShell>
  );
}
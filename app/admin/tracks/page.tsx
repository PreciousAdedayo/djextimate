import AdminShell from "@/components/admin/AdminShell";
import ResourceManager, { Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  { name: "title", label: "Track title", required: true, placeholder: "Track title" },
  { name: "artist", label: "Artist", placeholder: "DJ Extimate" },
  { name: "featuredArtist", label: "Featured artist", placeholder: "Optional" },
  { name: "duration", label: "Duration", placeholder: "03:42" },
  { name: "audioUrl", label: "Audio file URL", type: "url", placeholder: "https://..." },
  { name: "spotify", label: "Spotify URL", type: "url" },
  { name: "appleMusic", label: "Apple Music URL", type: "url" },
  { name: "audiomack", label: "Audiomack URL", type: "url" },
  { name: "youtube", label: "YouTube URL", type: "url" },
  { name: "published", label: "Publish now", type: "checkbox" },
];

export default function AdminTracks() {
  return (
    <AdminShell eyebrow="Content" title="Music">
      <ResourceManager
        endpoint="/api/tracks"
        fields={fields}
        itemTitle={(t) => t.title}
        itemMeta={(t) => `${t.duration || "--:--"} · ${t.published ? "Published" : "Draft"}`}
      />
    </AdminShell>
  );
}

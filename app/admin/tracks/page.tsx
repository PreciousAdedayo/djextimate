import AdminShell from "@/components/admin/AdminShell";
import ResourceManager, {
  Field,
} from "@/components/admin/ResourceManager";

const fields: Field[] = [
  {
    name: "title",
    label: "Track title",
    required: true,
    placeholder: "EXTIMATE — Track Title",
  },
  {
    name: "artist",
    label: "Artist",
    placeholder: "DJ Extimate",
  },
  {
    name: "featuredArtist",
    label: "Featured artist",
    placeholder: "Optional",
  },
  {
    name: "coverImage",
    label: "Cover image URL",
    type: "url",
    placeholder: "https://...",
  },
  {
    name: "audioUrl",
    label: "Audio URL",
    type: "url",
    placeholder: "https://...",
  },
  {
    name: "duration",
    label: "Duration",
    placeholder: "03:42",
  },
  {
    name: "spotify",
    label: "Spotify URL",
    type: "url",
    placeholder: "Optional",
  },
  {
    name: "appleMusic",
    label: "Apple Music URL",
    type: "url",
    placeholder: "Optional",
  },
  {
    name: "audiomack",
    label: "Audiomack URL",
    type: "url",
    placeholder: "Optional",
  },
  {
    name: "youtube",
    label: "YouTube URL",
    type: "url",
    placeholder: "Optional",
  },
  {
    name: "published",
    label: "Publish now",
    type: "checkbox",
  },
];

export default function AdminTracks() {
  return (
    <AdminShell eyebrow="Content" title="Music">
      <ResourceManager
        endpoint="/api/tracks"
        fields={fields}
        titleField="title"
        metaFields={["duration", "published"]}
      />
    </AdminShell>
  );
}
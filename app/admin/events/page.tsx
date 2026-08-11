import AdminShell from "@/components/admin/AdminShell";
import ResourceManager, { Field } from "@/components/admin/ResourceManager";

const fields: Field[] = [
  {
    name: "title",
    label: "Event title",
    required: true,
    placeholder: "EXTIMATE LIVE",
  },
  {
    name: "venue",
    label: "Venue",
    placeholder: "Club DNA",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Lagos, Nigeria",
  },
  {
    name: "eventDate",
    label: "Date & time",
    type: "datetime-local",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Doors 8pm till late.",
  },
  {
    name: "ticketUrl",
    label: "Ticket URL",
    type: "url",
    placeholder: "Optional",
  },
  {
    name: "published",
    label: "Publish now",
    type: "checkbox",
  },
];

export default function AdminEvents() {
  return (
    <AdminShell eyebrow="Content" title="Events">
      <ResourceManager
        endpoint="/api/events"
        fields={fields}
        titleField="title"
        metaFields={["eventDate", "published"]}
      />
    </AdminShell>
  );
}
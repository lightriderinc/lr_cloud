import SectionHeading from "@/components/solutions/SectionHeading";

// The rest of the qSearch page on the PQC platform: ServerCheck, the result
// downloads (ScanResults) and the OMB M-23-02 inventory (InventoryExport).
const ITEMS = [
  {
    title: "Check a live server",
    text: "Enter a web address and qSearch connects to it the way a browser does. It reports whether the connection is protected against being recorded now and read later, and which certificates the server presents. Run it on your own sites and APIs before and after an upgrade.",
  },
  {
    title: "Reports for each reader",
    text: "Download a one-page summary for management, a spreadsheet of every finding for the engineers fixing them, or a CBOM: a standard list of your cryptography that other security tools can import.",
  },
  {
    title: "Federal inventory",
    text: "US federal agencies must report the cryptography in each of their systems in a set format. qSearch fills in the algorithm details from your scan, you add the system details, and it shows which migration deadline applies.",
  },
];

export default function PqcBeyondCode() {
  return (
    <section>
      <SectionHeading title="Servers, reports and audits" />
      <ul className="grid gap-4 md:grid-cols-3">
        {ITEMS.map(({ title, text }) => (
          <li key={title} className="default-radius bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import SectionHeading from "@/components/solutions/SectionHeading";

// qSearch, as the PQC platform runs it (src/app/qsearch/actions.ts there):
// uploads are deleted after the scan, secrets in matched lines are redacted,
// and each scan is saved to the user's history and compared with the last one.
const STEPS = [
  {
    title: "Upload",
    description:
      "A ZIP of your project, or a single file, up to 50 MB. The files are deleted as soon as the scan ends.",
  },
  {
    title: "Scan",
    description:
      "qSearch reads source code, settings files, keys and certificates, and lists every encryption and signing method it finds.",
  },
  {
    title: "Review",
    description:
      "Each finding shows where it is, what it is used for and how urgent it is. Passwords and keys in the matched code are hidden.",
  },
  {
    title: "Track",
    description:
      "Scans are saved to your account. Scan the same project again to see what is new and what has been fixed.",
  },
];

export default function PqcHowItWorks() {
  return (
    <section>
      <SectionHeading title="Find it in your code">
        NIST published standard replacements for the vulnerable methods in
        2024. The slow part of switching is finding every place the old ones
        are used. qSearch does that for you.
      </SectionHeading>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, description }, i) => (
          <li key={title} className="bg-gray-50 p-4 pb-6 default-radius">
            <span className="text-sm font-semibold text-gray-200">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

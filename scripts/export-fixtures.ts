import { mkdir, writeFile } from "node:fs/promises";
import { industries, templates, createDemo } from "../src/lib/catalogue";
await mkdir("development-data", { recursive: true });
const definitions = templates.map((t) => ({
  template: t,
  sections: createDemo(t.id, "Illustrative business").sections,
}));
await writeFile(
  "development-data/catalogue.json",
  JSON.stringify(
    {
      description: "Reference data only. Not connected to runtime persistence.",
      industries,
      templates: definitions,
    },
    null,
    2,
  ) + "\n",
);
const demos = [
  ["medico-1", "Example Care Clinic"],
  ["restaurant-2", "Example Corner Café"],
  ["real-estate-1", "Example Property Studio"],
].map(([id, name]) => createDemo(id, name));
await writeFile(
  "development-data/example-demos.json",
  JSON.stringify(
    {
      description:
        "Fictional draft fixtures. Import only in a development environment. No real contacts or credentials.",
      demos,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Exported ${industries.length} industries, ${templates.length} templates and ${demos.length} fictional draft examples.`,
);

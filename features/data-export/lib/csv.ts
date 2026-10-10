type Row = Record<string, unknown>;

const isRow = (v: unknown): v is Row =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function cell(value: unknown): string {
  if (value === null || value === undefined) return "";

  let s: string;
  if (Array.isArray(value) && value.every((v) => typeof v !== "object")) {
    s = value.join("; "); // ["Work","Sleep"] -> Work; Sleep
  } else if (typeof value === "object") {
    s = JSON.stringify(value);
  } else {
    s = String(value);
  }

  // Stop spreadsheets from running text like "=CMD()" as a formula
  if (typeof value === "string" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;

  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: Row[]): string {
  const columns = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const lines = [
    columns.map(cell).join(","),
    ...rows.map((r) => columns.map((c) => cell(r[c])).join(",")),
  ];
  // BOM so Excel reads UTF-8 (emoji, accents) correctly
  return "\uFEFF" + lines.join("\r\n");
}

/** Turns the export payload into named tables: lists become many rows, objects one row. */
export function extractTables(
  payload: Record<string, unknown>,
): { name: string; rows: Row[] }[] {
  const tables: { name: string; rows: Row[] }[] = [];

  for (const [name, value] of Object.entries(payload)) {
    if (Array.isArray(value) && value.length > 0 && value.every(isRow)) {
      tables.push({ name, rows: value as Row[] });
    } else if (isRow(value)) {
      tables.push({ name, rows: [value] });
    }
  }
  return tables;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

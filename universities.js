const API_URL = "https://universities.hipolabs.com/search?country=Romania";
const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportButton = document.getElementById("exportCsv");

let all = [];
let visible = [];

function setStatus(text) {
  status.textContent = text;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getWebsite(u) {
  return u.web_pages?.[0] || "";
}

function render(data) {
  visible = data;

  if (!data.length) {
    tbody.innerHTML = '<tr><td class="empty" colspan="3">No universities match the current filter.</td></tr>';
    return;
  }

  tbody.innerHTML = data.map((u) => {
    const website = getWebsite(u);
    const site = website
      ? `<a href="${escapeHTML(website)}" target="_blank" rel="noopener noreferrer">${escapeHTML(website)}</a>`
      : "";

    return `
      <tr>
        <td>${escapeHTML(u.name)}</td>
        <td>${escapeHTML(u.country)}</td>
        <td>${site}</td>
      </tr>`;
  }).join("");
}

async function loadUniversities() {
  setStatus("Loading universities...");
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    all = Array.isArray(data) ? data : [];
    render(all);
    setStatus(`Loaded ${all.length} results.`);
  } catch (error) {
    console.error(error);
    setStatus("Loading error. Please try again.");
    tbody.innerHTML = '<tr><td class="empty" colspan="3">Unable to load university data right now.</td></tr>';
  }
}

function getFilteredData() {
  const q = qInput.value.trim().toLowerCase();
  return q ? all.filter((u) => (u.name || "").toLowerCase().includes(q)) : all;
}

function exportCSV(data) {
  if (!data.length) {
    alert("No data to export.");
    return;
  }

  const header = ["Name", "Country", "Website"];
  const rows = data.map((u) => [
    u.name || "",
    u.country || "",
    getWebsite(u)
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "universities.csv";
  a.click();
  URL.revokeObjectURL(url);
}

qInput.addEventListener("input", () => {
  const filtered = getFilteredData();
  render(filtered);

  if (!all.length) {
    setStatus("Loading universities...");
    return;
  }

  const query = qInput.value.trim();
  setStatus(query ? `Filtered: ${filtered.length} of ${all.length}.` : `Loaded ${all.length} results.`);
});

exportButton.addEventListener("click", () => {
  exportCSV(visible.length ? visible : getFilteredData());
});

loadUniversities();
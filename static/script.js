// ======================
// DOM ELEMENTS
// ======================
const fileInput = document.getElementById("file");
const fileLabel = document.getElementById("file-label");
const weightsInput = document.getElementById("weights");
const impactsInput = document.getElementById("impacts");
const runBtn = document.getElementById("runBtn");
const statusText = document.getElementById("status");
const tableContainer = document.getElementById("table-container");

// ======================
// EVENT LISTENERS
// ======================
fileInput.addEventListener("change", handleFileSelect);
runBtn.addEventListener("click", handleRunClick);

// ======================
// HANDLERS
// ======================
function handleFileSelect() {
    if (fileInput.files.length > 0) {
        fileLabel.textContent = fileInput.files[0].name;
    }
}

async function handleRunClick() {
    clearUI();

    const file = fileInput.files[0];
    const weights = weightsInput.value.trim();
    const impacts = impactsInput.value.trim();

    if (!validateInputs(file, weights, impacts)) return;

    try {
        statusText.textContent = "Running TOPSIS...";
        const csvBlob = await runTopsis(file, weights, impacts);

        renderCsvTable(csvBlob);
        createDownloadButton(csvBlob);

        statusText.textContent = "TOPSIS completed successfully!";
    } catch (error) {
        statusText.textContent = `Error: ${error.message}`;
    }
}

// ======================
// CORE LOGIC
// ======================
async function runTopsis(file, weights, impacts) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("weights", weights);
    formData.append("impacts", impacts);

    const response = await fetch("/run", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Backend failed to process TOPSIS");
    }

    return await response.blob(); // CSV file
}

// ======================
// UI HELPERS
// ======================
function createDownloadButton(csvBlob) {
    const url = URL.createObjectURL(csvBlob);

    const downloadBtn = document.createElement("a");
    downloadBtn.href = url;
    downloadBtn.download = "topsis_result.csv";
    downloadBtn.textContent = "Download Result CSV";
    downloadBtn.className = "download-btn";

    tableContainer.appendChild(downloadBtn);
}

function renderCsvTable(csvBlob) {
    const reader = new FileReader();

    reader.onload = () => {
        const csvText = reader.result;
        const table = csvToTable(csvText);
        tableContainer.appendChild(table);
    };

    reader.readAsText(csvBlob);
}

function csvToTable(csvText) {
    const rows = csvText.trim().split("\n").map(r => r.split(","));
    const table = document.createElement("table");

    rows.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
            const cellEl = rowIndex === 0
                ? document.createElement("th")
                : document.createElement("td");

            cellEl.textContent = cell.trim();
            tr.appendChild(cellEl);
        });

        table.appendChild(tr);
    });

    return table;
}

// ======================
// VALIDATION & CLEANUP
// ======================
function validateInputs(file, weights, impacts) {
    if (!file) {
        statusText.textContent = "Please upload a CSV file.";
        return false;
    }
    if (!weights || !impacts) {
        statusText.textContent = "Please enter both weights and impacts.";
        return false;
    }
    return true;
}

function clearUI() {
    statusText.textContent = "";
    tableContainer.innerHTML = "";
}

// ==UserScript==
// @name         Warframe Drops - Cleaner Tables
// @version      0.3.4
// @author       GentlePuppet, assisted by gpt
// @description  Cleans up and adds a search filter to the Warframe Drops page.
// @match        https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html
// @run-at		 document-start
// @grant        GM_addStyle
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// ==/UserScript==
GM_addStyle(`
:root {
  --bg: #0b0f14;
  --panel: rgba(0, 0, 0, 0.65);
  --text: #c9d1d9;
  --muted: #8b949e;
  --accent: #4cc9f0;
  --accent2: #2ea043;
  --border: rgba(255, 255, 255, 0.12);
}

.table-search-highlight {
  background: var(--accent);
  color: #000;
  padding: 0 3px;
  border-radius: 3px;
}

body {
  margin: 0;
  padding-bottom: 500px;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("https://i.imgur.com/V4Qp5Ck.jpg") center / cover no-repeat;
  opacity: 0.18;
  transform: none;
  z-index: -1;
}

h3 {
  color: #fff;
  font-size: 2rem;
  margin: 0 0 12px;
  text-decoration: none;
  border-left: 4px solid var(--accent);
  padding-left: 10px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.6);
}

#tableContainer {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  align-items: start;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--panel);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}

thead th[colspan] {
  background: #1b1f3a;
  color: #fff;
  padding: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

td, th {
  border: 1px solid var(--border);
  padding: 6px 8px;
  text-align: center;
  font-weight: 500;
}

td:first-child {
  text-align: left;
  color: var(--muted);
}

td:first-child{
  text-align: right;
}

td:last-child{
  text-align: left;
}

th[colspan] {
  color: #ffffff;
  background: #085724;
}

a {color: #34d8ff;}
a:visited {color: #00ff68;}

#global-table-filter {
  position: sticky;
  top: 20px;
  width: 80%;
  padding: 10px;
  margin: 12px 10%;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.9);
  color: var(--text);
  font-size: 30px;
  text-align: center;
  z-index: 1000;
}

#scrolltotop {
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgb(255 0 0);
  color: white;
  font-size: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.4);
  transition: transform 0.2s ease;
}

#scrolltotop:hover {
  transform: scale(1.1);
}
`);

const allGeneratedTables = [];
const HIGHLIGHT_CLASS = "table-search-highlight";

function escapeRegex(str) {return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}

function clearHighlights(root) {root.querySelectorAll("." + HIGHLIGHT_CLASS).forEach(span => {span.replaceWith(span.textContent);});root.normalize();}

function highlightPhrase(root, phrase) {
    if (!phrase) return;

    const regex = new RegExp(escapeRegex(phrase), "gi");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
        const text = node.nodeValue;
        if (!regex.test(text)) return;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;

        text.replace(regex, (match, offset) => {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, offset)));

            const span = document.createElement("span");
            span.className = HIGHLIGHT_CLASS;
            span.textContent = match;
            frag.appendChild(span);

            lastIndex = offset + match.length;
        });

        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        node.replaceWith(frag);
    });
}

function debounce(func, wait = 250) {let timeout; return (...args) => {clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait);};}

function updateSectionHeaders() {
    const containers = document.querySelectorAll("div#tableContainer");

    containers.forEach(container => {
        const tables = Array.from(container.querySelectorAll("table"));
        const anyVisible = tables.some(t => t.style.display !== "none");

        let prev = container.previousElementSibling;
        while (prev && prev.tagName !== "H3") {
            prev = prev.previousElementSibling;
        }

        if (prev && prev.tagName === "H3") {
            prev.style.display = anyVisible ? "" : "none";
        }
    });
}

function createGlobalFilter() {
    if (document.getElementById("global-table-filter")) return;

    const input = document.createElement("input");
    input.id = "global-table-filter";
    input.type = "search";
    input.placeholder = "Filter all tables…";

    const searchText = input.value.trim().toLowerCase();

    input.addEventListener("input", debounce(() => {
        const query = input.value.toLowerCase().replace(/\s+/g, " ").trim();

        allGeneratedTables.forEach(table => {
            clearHighlights(table);

            if (!query) {
                table.style.display = "";
                return;
            }

            const tableText = table.textContent.toLowerCase().replace(/\s+/g, " ");

            const matches = tableText.includes(query);

            table.style.display = matches ? "" : "none";

            if (matches) {
                highlightPhrase(table, query);
            }
        });

        updateSectionHeaders();
    }, 750));


    const target = document.getElementById("missionRewards");
    if (target) {
        target.parentNode.insertBefore(input, target);
    } else {
        document.body.prepend(input);
    }
}

function splitAllTables() {
    const tablesOnPage = Array.from(document.querySelectorAll("table"));

    tablesOnPage.forEach(originalTable => {
        if (originalTable.dataset.split === "true") return;

        const rows = Array.from(originalTable.querySelectorAll("tr"));
        if (!rows.length) return;

        const hasBlankRows = rows.some(r => r.classList.contains("blank-row"));
        const firstRow = rows[0];
        const isStandaloneHeader =
            firstRow.querySelector("th[colspan]") && !hasBlankRows;

        if (!hasBlankRows && !isStandaloneHeader) return;

        originalTable.dataset.split = "true";

        const groups = [];

        if (hasBlankRows) {
            let currentGroup = [];

            rows.forEach(row => {
                if (row.classList.contains("blank-row")) {
                    if (currentGroup.length) {
                        groups.push(currentGroup);
                        currentGroup = [];
                    }
                } else {
                    currentGroup.push(row);
                }
            });

            if (currentGroup.length) groups.push(currentGroup);
        } else {
            groups.push(rows);
        }

        if (!groups.length) return;

        const container = document.createElement("div");
        container.id = "tableContainer";

        groups.forEach(group => {
            const table = document.createElement("table");
            table.style.width = "100%";

            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            const headerRow = group[0];
            thead.appendChild(headerRow);
            group.slice(1).forEach(row => tbody.appendChild(row));

            tbody.style.display = "none";

            headerRow.style.cursor = "pointer";
            headerRow.title = "Click to expand / collapse";
            headerRow.addEventListener("click", () => {
                tbody.style.display = tbody.style.display === "none" ? "" : "none";
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            container.appendChild(table);

            allGeneratedTables.push(table);
        });

        originalTable.replaceWith(container);
    });
}

function createScrollButton() {
    const btn = document.createElement("div");
    btn.id = "scrolltotop";
    btn.textContent = "↑";
    btn.title = "Scroll to top";
    btn.addEventListener("click", () => {window.scrollTo({ top: 1200, behavior: "instant" });});
    btn.style.display = "none";
    window.addEventListener("scroll", () => {btn.style.display = window.scrollY > 1400 ? "flex" : "none";});
    document.body.appendChild(btn);
}

window.addEventListener("load", () => {
    window.scrollTo({ top: 1200, behavior: "instant" });
    createGlobalFilter();
    splitAllTables();
    updateSectionHeaders();
    createScrollButton()
});

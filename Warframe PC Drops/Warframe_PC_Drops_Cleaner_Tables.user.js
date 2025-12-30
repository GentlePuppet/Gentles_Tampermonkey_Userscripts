// ==UserScript==
// @name         Warframe Drops - Cleaner Tables
// @version      0.3.2
// @author       GentlePuppet, assisted by gpt
// @description  Cleans up and adds a search filter to the Warframe Drops page.
// @match        https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html
// @run-at		 document-start
// @grant        GM_addStyle
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// ==/UserScript==
GM_addStyle(`
    body::before {background-image: url(https://i.imgur.com/V4Qp5Ck.jpg); transform: rotate(90deg); content: ""; position: fixed; top: 0; left: 0; z-index: -1; width: 210vh; height: 210vh;}
    body {background: transparent; color: #b3b3b3; padding-bottom: 500px}
    h3 {color: white; text-shadow: 2px 3px 2px black; text-decoration: underline; font-size: xx-large; margin: 0px 0px 10px 0px;}
    #tableContainer {display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; align-items: start;}
    table {border: 0; border-collapse: collapse; margin-bottom: 5pt;}
    thead th[colspan] {color: #ffffff !important; background: #220e89 !important;}
    tr, td, th {border: 1px solid #bbb2b2 !important; background: black; font-weight: bold; text-align: center; padding: 3pt;}
    td:first-child{text-align: right;}
    td:last-child{text-align: left;}
    th[colspan] {color: #ffffff; background: #085724;}
    a {color: #34d8ff;}
    a:visited {color: #00ff68;}
    .table-search-highlight {background: yellow; color: black; padding: 0 2px;}
    #global-table-filter {display: block; margin: 12px 0px; padding: 6px 8px; width: 100%;}
    #scrolltotop {position: fixed; bottom: 20px; right: 40px; width: 60px; height: 60px; background: rgb(255 0 0); color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px; font-size: 44px; z-index: 9999;}
`);

const allGeneratedTables = [];
const HIGHLIGHT_CLASS = "table-search-highlight";

function escapeRegex(str) {return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");}

function clearHighlights(root) {root.querySelectorAll("." + HIGHLIGHT_CLASS).forEach(span => {span.replaceWith(span.textContent);});}

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

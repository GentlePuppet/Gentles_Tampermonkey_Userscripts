// ==UserScript==
// @name         Warframe Drops - Cleaner Tables
// @version      0.1
// @author       GentlePuppet, assisted by gpt
// @description  Cleans up and adds a search filter to the Warframe Drops page.
// @match        https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html
// @grant        GM_addStyle
// @updateURL    https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// @downloadURL  https://github.com/GentlePuppet/Gentles_Tampermonkey_Userscripts/raw/refs/heads/main/Warframe%20PC%20Drops/Warframe_PC_Drops_Cleaner_Tables.user.js
// ==/UserScript==
GM_addStyle(`
    body {
        background: black;
        color: #b3b3b3;
    }

    thead th[colspan] {
        color: #ffffff !important;
        background: #220e89 !important;
    }

    tr, td, th {
        border: 1px solid #bbb2b2 !important;
    }

    th[colspan] {
        color: #ffffff;
        background: #085724;
    }

    a {
        color: #34d8ff;
    }
    a:visited {
        color: #00ff68;
    }
`);

(function () {
    const allGeneratedTables = [];
    const HIGHLIGHT_CLASS = "table-search-highlight";

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function clearHighlights(root) {
        root.querySelectorAll("." + HIGHLIGHT_CLASS).forEach(span => {
            span.replaceWith(span.textContent);
        });
    }

    function highlightMatches(root, terms) {
        if (!terms.length) return;

        // Clear previous highlights
        root.querySelectorAll(".table-search-highlight").forEach(span => {
            span.replaceWith(span.textContent);
        });

        // Prepare regex for substring match (case-insensitive)
        const regex = new RegExp("(" + terms.map(escapeRegex).join("|") + ")", "gi");

        // Traverse all text nodes
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);

        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node => {
            const text = node.nodeValue;
            if (!regex.test(text)) return;

            const frag = document.createDocumentFragment();
            let lastIndex = 0;

            text.replace(regex, (match, _p1, offset) => {
                if (offset > lastIndex) {
                    frag.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
                }

                const span = document.createElement("span");
                span.className = "table-search-highlight";
                span.textContent = match;
                frag.appendChild(span);

                lastIndex = offset + match.length;
            });

            if (lastIndex < text.length) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex)));
            }

            node.replaceWith(frag);
        });
    }


    function debounce(func, wait = 250) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function createGlobalFilter() {
        if (document.getElementById("global-table-filter")) return;

        const input = document.createElement("input");
        input.id = "global-table-filter";
        input.type = "search";
        input.placeholder = "Filter all tables…";
        input.style.display = "block";
        input.style.margin = "12px 0";
        input.style.padding = "6px 8px";
        input.style.width = "100%";

        const searchText = input.value.trim().toLowerCase();

        input.addEventListener("input", debounce(() => {
            const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);

            allGeneratedTables.forEach(table => {
                clearHighlights(table);

                if (!terms.length) {
                    table.style.display = "";
                    return;
                }

                const text = table.textContent.toLowerCase();
                const matches = terms.some(term => text.includes(term));

                table.style.display = matches ? "" : "none";

                if (matches) {
                    highlightMatches(table, terms);
                }
            });
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
            if (!rows.some(r => r.classList.contains("blank-row"))) return;

            originalTable.dataset.split = "true";

            const groups = [];
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
            if (!groups.length) return;

            const container = document.createElement("div");
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(7, 1fr)";
            container.style.gap = "16px";
            container.style.alignItems = "start";

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

    // Highlight styling
    const style = document.createElement("style");
    style.textContent = `
    .${HIGHLIGHT_CLASS} {
      background: yellow;
      color: black;
      padding: 0 2px;
    }
  `;
    document.head.appendChild(style);

    window.addEventListener("load", () => {
        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => {
                createGlobalFilter();
                splitAllTables();
            }, { timeout: 1000 });
        } else {
            setTimeout(() => {
                createGlobalFilter();
                splitAllTables();
            }, 0);
        }
    });
})();


(function() {
    const btn = document.createElement("div");
    btn.textContent = "↑";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.width = "40px";
    btn.style.height = "40px";
    btn.style.background = "#007bff";
    btn.style.color = "white";
    btn.style.borderRadius = "50%";
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    btn.style.fontSize = "24px";
    btn.style.zIndex = 9999;
    btn.title = "Scroll to top";

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 1200, behavior: "instant" });
    });

    // Optional: hide button until scrolled down
    btn.style.display = "none";
    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 1700 ? "flex" : "none";
    });

    document.body.appendChild(btn);
})();

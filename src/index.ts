// Import html & css of the Web Components
import html from "./index.html";
import css from "./index.scss";

// create a template and assign it to the HTML
const template = document.createElement("template");
template.innerHTML = html;

// create a DwDatatable class extends from HTMLElement
class DwDatatable extends HTMLElement {
    //shadowRoot
    root: ShadowRoot;
    // Attributes
    src = "";
    columns: string[] = [];
    livefilter: string[] = [];
    checkboxs = false;

    // Data Object placeholder Helper
    data: any[] = [];
    newData: any[] = [];

    // Sort Helper
    sortCol!: any;
    sortAsc!: boolean;

    // Scroll Helper
    dataLinesIncrease = 0;
    numberOfRenderedLines = 25;
    counter = 1;

    //___________________________________________________________________________________________________________
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.root.appendChild(template.content.cloneNode(true));

        // render CSS styling
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        this.root.adoptedStyleSheets = [sheet];

        // bind this in Events
        this.sort = this.sort.bind(this);
        this.search = this.search.bind(this);
    }
    //___________________________________________________________________________________________________________

    static get observedAttributes() {
        return ["src", "columns", "livefilter", "checkboxs"];
    }

    attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
        if (_name === "src") {
            this.src = _newValue;
        }

        if (_name === "columns") {
            this.columns = _newValue.split(",").map(i => i.trim());
        }

        if (_name === "livefilter") {
            this.livefilter = _newValue.split(",").map(i => i.trim());
        }

        if (_name === "checkboxs") {
            if (_newValue === "true") {
                this.checkboxs = true;
            }
        }
    }
    //___________________________________________________________________________________________________________
    async connectedCallback() {
        // update data
        this.data = await this.fetchData(this.src);
        this.newData = this.data;

        this.renderHeader(this.columns);
        this.renderBody(this.data);

        // render searchInputs into DOM
        this.renderInput();
        this.root.querySelectorAll(".livefilter").forEach(filter => {
            filter.addEventListener("keyup", this.search);
        });

        // render Checkboxs Select columns filter
        this.renderColumns(this.columns);

        // add drop down activate/deactivate
        const checkList = this.root.querySelector("#list1") as HTMLDivElement;
        (checkList?.getElementsByClassName("columnsname")[0] as HTMLSpanElement).onclick = function () {
            if (checkList?.classList.contains("visible")) {
                checkList?.classList.remove("visible");
            } else {
                checkList?.classList.add("visible");
            }
        };

        // add a window scroll event to fetch data
        const dataTablesDivElement = this.root.querySelector(".dataTables_scroll");
        if (dataTablesDivElement) {
            dataTablesDivElement.addEventListener("scroll", () => {
                this.loadOnScroll();
            });
        }

        // checkbox select or deselect
        this.root.querySelector("table")?.addEventListener("click", (event: Event) => {
            const { target } = event;
            if (target) {
                if ((target as HTMLInputElement).name === "check") {
                    if ((target as HTMLInputElement).parentElement?.parentElement?.classList.contains("selected")) {
                        (target as HTMLInputElement).parentElement?.parentElement?.classList.remove("selected");
                    } else {
                        (target as HTMLInputElement).parentElement?.parentElement?.classList.add("selected");
                    }
                }
            }
        });
    }
    //___________________________________________________________________________________________________________
    // Die Methode renderInput() erstellt dynamische Input-Elemente für die Live-Filterung.
    renderInput(): void {
        this.livefilter.forEach(filter => {
            const input = document.createElement("input");
            input.setAttribute("type", "search");
            input.setAttribute("name", filter);
            input.id = filter;
            input.classList.add("livefilter");
            input.placeholder = `search ${filter}`;

            this.root.querySelector(".inputs")?.appendChild(input);
        });
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode rendert ein HTML Element mit einer Dropdown-Checkliste, die alle übergebenen Spaltennamen aufnimmt.
     * Zunächst wird ein HTML Element erstellt, das einen Namen, eine Liste von Elementen und eine Checkbox enthält, die jeweils den übergebenen Spaltennamen enthält.
     * Anschließend wird das Element dem DOM hinzugefügt und jeder Checkbox ein Click-Event zugeordnet, das den FilterColumns-Methode aufruft, wenn das Element angeklickt wird.
     */
    renderColumns(columns: string[]): void {
        let result = `<div id="list1" class="dropdown-check-list">
        <span class="columnsname">Select columns</span>
        <ul class="items">`;

        columns.forEach((column: string) => {
            result += `
            <li><input type="checkbox" class="cols" name="${column}" ${this.columns.includes(column) ? "checked" : ""} />${column} </li>`;
        });

        result += "</ul> </div>";

        const columnsDivElement = this.root.querySelector(".columns");
        if (!columnsDivElement) {
            return;
        }
        columnsDivElement.innerHTML = result;

        // set click event on the checkbox
        const cols = this.root.querySelectorAll(".cols");
        cols.forEach(column => {
            column.addEventListener("click", (e) => this.filterColumns(e));
        });
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode generiert einen Tabellenkopf mit einem Checkbox. Es wird eine Liste von Spaltennamen als Argument akzeptiert.
     * Für jede Spalte wird ein Tabellenelement hinzugefügt und mit dem Spaltennamen als Inhalt gefüllt. Außerdem wird ein Icon zur Sortierung der Spalte hinzugefügt.
     */
    renderHeader(columns: string[]): void {
        let header = "<tr> <th>#</th>";

        if (this.checkboxs) {
            header += "<th><input type=\"checkbox\" id=\"checkAll\"></th>";
        }

        columns.forEach((column: string) => {
            const columnName = this.headerNames(column);
            header += `<th class="sortableColumns" scope="col" data-sort= "${column}">${columnName} </th>`;
        });
        const thead = this.root.querySelector("thead");
        if (thead) {
            thead.innerHTML = header;
        }

        this.root.querySelectorAll(".sortableColumns").forEach(t => t.addEventListener("click", this.sort));

        if (this.checkboxs) {
            const checkboxAll = this.root.querySelector("#checkAll") as HTMLInputElement;
            checkboxAll.addEventListener("click", () => this.toggleCheckbox());
        }
    }
    //___________________________________________________________________________________________________________
    renderBody(data: any[]): void {
        let result = "";
        let value: any;

        for (let i = this.dataLinesIncrease; i < data.length; i++) {
            if ((this.counter - 1 < this.dataLinesIncrease + this.numberOfRenderedLines) && this.counter - 1 <= data.length) {
                let row = "<tr>";
                row += `<td>${this.counter}</td>`;
                if (this.checkboxs) {
                    row += "<td><input type=\"checkbox\" name=\"check\" class=\"check\"></td>";
                }
                this.columns.forEach((column: string) => {
                    value = this.objectByString(data[i], column);   // obj[a][b] == obj.a.b
                    if (value) {
                        if (typeof (value) === "string" && this.checkDate(value)) {
                            row += `<td>${this.dateFormat(value)}</td>`;
                        } else if(typeof (value) === "boolean") {
                            row += `<td>
                                        <input type="button" class="${value ? "dwIcons dwIcons-active" : "dwIcons dwIcons-inactive" }">
                                   </td>`;
                        } else {
                            row += `<td>${value}</td>`;
                        }
                    } else {
                        row += "<td></td>";
                    }
                });
                row += "</tr>";
                this.counter++;
                result += row;
            }
        }
        this.dataLinesIncrease += this.numberOfRenderedLines;

        const tbody = this.root.querySelector("tbody");
        if (tbody) {
            tbody.innerHTML += result;
        }

        const footer = this.root.querySelector(".fg-toolbar");
        if (footer) {
            footer.innerHTML = `<p>Showing 1 to ${this.counter - 1} of ${this.newData.length} entries</p>`;
        }

        // click event for boolean
        this.root.querySelectorAll(".dwIcons").forEach(dwIcon => {
            dwIcon.addEventListener("click", (event: Event) => {
                const { target } = event;
                if(target) {
                    if(((target as HTMLInputElement).classList.contains("dwIcons-active"))) {
                        (target as HTMLInputElement).classList.remove("dwIcons-active");
                        (target as HTMLInputElement).classList.add("dwIcons-inactive");
                    } else {
                        (target as HTMLInputElement).classList.remove("dwIcons-inactive");
                        (target as HTMLInputElement).classList.add("dwIcons-active");
                    }
                }
            });
        });
    }
    //___________________________________________________________________________________________________________
    /**
     * objectByString ist eine Methode, die ein Objekt und eine Zeichenfolge als Parameter akzeptiert.
     * Die Zeichenfolge enthält eine Liste von Schlüsseln, die in das Objekt eingehängt werden. Die Methode iteriert durch die Liste der Schlüssel,
     * um den gesuchten Wert im Objekt zu finden. Wenn der angegebene Schlüssel im Objekt vorhanden ist,
     * wird das aktuelle Objekt aktualisiert und die Iteration setzt sich fort, bis der gesuchte Wert gefunden wurde.
     * Wenn der angegebene Schlüssel nicht im Objekt vorhanden ist, wird die Methode abgebrochen und kein Wert zurückgegeben.
     */
    objectByString(obj: { [x: string]: any; }, str: string): any { // obj = data[], str = d.ID
        const keys = str.split(".");    //keys = ["d", "ID"]
        let currentObj = obj;

        for (const key of keys) {
            if (key in currentObj) { // if "d" existiert in obj zeile dann if ID existiert in obj "d" etc...
                currentObj = currentObj[key];
            } else {
                return;
            }
        }
        return currentObj;
    }

    headerNames( str: string): string {
        const keys = str.split(".");
        return keys[keys.length -1];
    }
    //___________________________________________________________________________________________________________
    toggleCheckbox(): void {
        const checkboxAll = this.root.querySelector("#checkAll") as HTMLInputElement;
        const checkboxs = this.root.querySelectorAll(".check") as NodeListOf<HTMLInputElement>;
        const trs = this.root.querySelectorAll("tr");
        const isChecked = checkboxAll.checked;
        for (let i = 0; i < checkboxs.length; i++) {
            checkboxs[i].checked = isChecked;
            if (isChecked) {
                trs[i + 1].classList.add("selected");
                checkboxs[i].setAttribute("checked", "true");
            } else {
                trs[i + 1].classList.remove("selected");
                checkboxs[i].setAttribute("checked", "false");
            }
        }
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode sortiert ein unbekanntes Dataset mithilfe einer eingegebenen Spalte (this.sortCol).
     * Der Sortieralgorithmus vergleicht die Werte in den jeweiligen Spalten (this.objectByString) und sortiert sie in absteigender Reihenfolge,
     * wenn this.sortAsc auf false gesetzt ist, und in aufsteigender Reihenfolge, wenn this.sortAsc auf true gesetzt ist.
     * Nach erfolgreicher Sortierung wird die Tabelle mit den sortierten Daten neu geladen.
     */
    sort(e: { target: { dataset: unknown[]; }; }): void {
        const thisSort = e.target.dataset.sort; // z.B thisSort = d.ID
        this.sortAsc = this.sortCol === thisSort ? !this.sortAsc : true;
        this.sortCol = thisSort;

        this.newData.sort((a, b) => {
            let comparison = 0;
            if ((this.objectByString(a, this.sortCol) as any) < (this.objectByString(b, this.sortCol) as any)) {
                comparison = this.sortAsc ? -1 : 1;
            } else if ((this.objectByString(a, this.sortCol) as any) > (this.objectByString(b, this.sortCol) as any)) {
                comparison = this.sortAsc ? 1 : -1;
            }
            return comparison;
        });

        this.reloadTable(this.newData);
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode sucht nach einem bestimmten Eintrag in einer Tabelle anhand des Inhalts eines HTML-Input-Elements.
     * Es wird das Element mit der angegebenen ID ermittelt und dessen Wert für die Suche verwendet.
     * Anschließend werden die Daten anhand des Suchtextes gefiltert. Wenn Ergebnisse gefunden wurden, wird die Tabelle mit diesen Daten neu geladen.
     * Wenn keine Ergebnisse gefunden werden, wird eine Meldung angezeigt.
     */
    search(event: Event): void {
        const thisInput = (event.target as HTMLInputElement).id;
        const searchElement = this.root.getElementById(`${thisInput}`) as HTMLInputElement;
        const searchText = searchElement.value;
        const tbody = this.root.querySelector("tbody");

        this.newData = this.data.filter(v => this.objectByString(v, thisInput)?.toString().includes(searchText));

        if (tbody) {
            if (this.newData.length) {
                this.reloadTable(this.newData);
            } else {
                tbody.innerHTML = "<span>Not Found</span>";
            }
        }
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode filtert Spalten in einer Tabelle. Es wird ein Event übergeben, welches das Target-Element enthält. Es wird überprüft,
     * ob die Spalte schon vorhanden ist, und diese dann entfernt oder hinzugefügt. Anschließend wird der Header neu gerendert und die Tabelle neu geladen.
     */
    filterColumns(e: Event): void {
        const column = (<HTMLTextAreaElement>e.target).name;
        const index = this.columns.indexOf(column);
        if (index !== -1) {
            this.columns.splice(index, 1);
        } else {
            this.columns.push(column);
        }
        this.renderHeader(this.columns);
        this.reloadTable(this.newData);
    }
    //___________________________________________________________________________________________________________
    reloadTable(data: any[]): void {
        this.dataLinesIncrease = 0;
        this.counter = 1;

        const tbody = this.root.querySelector("tbody");
        if (tbody) {
            tbody.innerHTML = "";
        }
        this.renderBody(data);
    }
    //___________________________________________________________________________________________________________
    loadOnScroll(): void {
        const ring = this.root.querySelector(".ring") as HTMLDivElement;
        const dataTablesScroll = this.root.querySelector(".dataTables_scroll");
        if (!dataTablesScroll) {
            return;
        }

        const scrolled = dataTablesScroll?.scrollTop;
        const scrollable = dataTablesScroll.scrollHeight - dataTablesScroll?.clientHeight;

        if ((scrolled === (scrollable)) && this.counter <= this.newData.length) {
            ring.style.display = "block";

            setTimeout(() => {
                this.renderBody(this.newData);
                this.toggleCheckbox();
                ring.style.display = "none";
            }, 1);
        }
    }
    //________________________________________________________________________________________________________________________________________________________________________________________________________________
    /**
     * Die Methode checkDate() überprüft, ob ein übergebenes String-Objekt ein gültiges Datumsformat entspricht.
     * Dazu verwendet es einen regulären Ausdruck, der das Datumsformat YYYY-MM-DDTHH:mm:ss oder YYYY-MM-DDTHH:mm:ss.sss entspricht.
     * Es kann auch ein Zeitzonenoffset angegeben werden,
     * z.B. +01:00 oder -02:30. Die Methode gibt true zurück, wenn das Eingabeobjekt das erwartete Datumsformat erfüllt, oder false, wenn es nicht erfüllt wird.
     */
    checkDate(input: string): boolean {
        const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/i;
        return regex.test(input);
    }
    //___________________________________________________________________________________________________________
    /**
     * Die Methode fetchData ist eine asynchrone Funktion, die eine HTTP-Anfrage an einen bestimmten Endpunkt im Netzwerk sendet und eine Antwort zurückgibt.
     * Die Funktion erwartet einen Parameter src, der die URL des Endpunkts als String enthält.
     * Innerhalb der Funktion wird eine try-catch-Struktur verwendet, um Fehler beim Aufruf von fetch
     * und beim Parsen der Antwort als JSON zu behandeln. Wenn der HTTP-Antwortcode des Endpunkts 200 OK lautet, wird die Antwort als JSON interpretiert und zurückgegeben.
     * Wenn der HTTP-Antwortcode des Endpunkts jedoch nicht 200 OK ist, wird eine Fehlermeldung generiert und als Error-Objekt ausgelöst.
     * Wenn ein anderer Fehler auftritt, wird der Fehler in eine lesbare Fehlermeldung umgewandelt und als Error-Objekt ausgelöst.
     * Insgesamt ist die Methode eine effektive Möglichkeit, Daten von einem Netzwerk-Endpunkt abzurufen und Fehler auf eine nützliche Art und Weise zu handhaben.
     */
    async fetchData(src: string): Promise<any> {
        try {
            const response = await fetch(src);

            if (response.ok) {
                const data = await response.json();
                return data;
            }

            const errorMessage = `An error has occurred: ${response.status}`;
            throw new Error(errorMessage);
        } catch (error: any) {
            const errorMessage = `Fetch error: ${error.message}`;
            throw new Error(errorMessage);
        }
    }
    //___________________________________________________________________________________________________________
    /**
     * Diese Methode nimmt ein Datum als String entgegen
     * und konvertiert es in ein Format mit Tag, Monat und Jahr. Es gibt das Datum als String im Format "Tag.Monat.Jahr" zurück.
     */
    dateFormat(date: string): string {  // date z.B = 2023-07-27T00:00:00
        const timestamp = new Date(date).getTime();
        const day = new Date(timestamp).getDate();
        const month = new Date(timestamp).getMonth();
        const year = new Date(timestamp).getFullYear();

        if(month <= 9) {
            return `${year}-0${month + 1}-${day}`;
        }

        return `${year}-${month + 1}-${day}`;
    }
    //___________________________________________________________________________________________________________
}
customElements.define("dw-datatable", DwDatatable);
// src/index.html
var src_default = '<!-- Insert your markup here -->\r\n<div class="main">\r\n    <div class="dwDataTableWrapper">\r\n        <div class="filterToolWrapper">\r\n            <div class="columns"></div>\r\n        </div>\r\n        <div class="dataTablesWrapper">\r\n            <div class="buttons"></div>\r\n            <div class="inputs"></div>\r\n            <div class="dataTables_scroll">\r\n                <table>\r\n                    <thead></thead>\r\n                    <tbody></tbody>\r\n                    <div class="ring"></div>\r\n                </table>\r\n            </div>\r\n            <div class="fg-toolbar"></div>\r\n        </div>\r\n    </div>\r\n</div>';

// src/index.scss
var src_default2 = `
:host {
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
}

.icon-arrow, .icon-sort-asc, .icon-sort-desc {
  display: inline-block;
  height: 0;
  width: 0;
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
}

.icon-sort-desc {
  border-width: 8px 6px 0;
  border-top-color: #444444;
}

.icon-sort-asc {
  border-width: 0 6px 8px;
  border-bottom-color: #444444;
}

.main {
  padding: 25px;
  background: #f4f9fb;
  height: auto;
}
.main .dwDataTableWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main .dwDataTableWrapper .filterToolWrapper {
  display: flex;
  max-width: 1000px;
  align-items: flex-end;
  align-content: stretch;
  justify-content: center;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list {
  display: inline-block;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list .columnsname {
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 5px 50px 5px 10px;
  border: 1px solid #ccc;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list .columnsname:after {
  position: absolute;
  content: "";
  border-left: 2px solid black;
  border-top: 2px solid black;
  padding: 5px;
  right: 10px;
  top: 20%;
  -moz-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list .columnsname:active:after {
  right: 8px;
  top: 21%;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list ul.items {
  padding: 2px;
  display: none;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list ul.items li {
  list-style: none;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list.visible .columnsname {
  color: #0094ff;
}
.main .dwDataTableWrapper .filterToolWrapper .columns .dropdown-check-list.visible .items {
  display: block;
}
.main .dwDataTableWrapper .dataTablesWrapper {
  display: contents;
  max-width: 1000px;
}
.main .dwDataTableWrapper .dataTablesWrapper .buttons {
  display: inline-block;
}
.main .dwDataTableWrapper .dataTablesWrapper .buttons button {
  margin-bottom: 0.5em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  color: #fff;
  background-color: #aaabbb;
  border-radius: 5px;
  border: solid #cccccc 1px;
}
.main .dwDataTableWrapper .dataTablesWrapper .inputs {
  display: inline-block;
}
.main .dwDataTableWrapper .dataTablesWrapper .inputs input[type=search] {
  border: solid 1px black;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border-radius: inherit;
}
.main .dwDataTableWrapper .dataTablesWrapper .inputs input[type=search]::placeholder {
  color: #bbb;
}
.main .dwDataTableWrapper .dataTablesWrapper table {
  border-collapse: collapse;
  width: 100%;
}
.main .dwDataTableWrapper .dataTablesWrapper table th,
.main .dwDataTableWrapper .dataTablesWrapper table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.main .dwDataTableWrapper .dataTablesWrapper table th {
  background: #eee;
  cursor: pointer;
}
.main .dwDataTableWrapper .dataTablesWrapper table tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.07);
}
.main .dwDataTableWrapper .dataTablesWrapper table .selected {
  background-color: rgba(201, 33, 33, 0.61) !important;
}
.main .dwDataTableWrapper .dataTablesWrapper table .dwIcons {
  border-radius: 10px;
  height: 15px;
}
.main .dwDataTableWrapper .dataTablesWrapper table .dwIcons-active {
  background-color: #3c3c3c;
}
.main .dwDataTableWrapper .dataTablesWrapper table .dwIcons-inactive {
  background-color: white;
}
.main .dwDataTableWrapper .dataTablesWrapper .dataTables_scroll {
  height: 500px;
  overflow-y: scroll;
}
.main .dwDataTableWrapper .dataTablesWrapper .dataTables_scroll thead {
  position: sticky;
  top: 0px;
}
.main .dwDataTableWrapper .dataTablesWrapper .fg-toolbar {
  text-align: center;
}
.main .ring {
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  letter-spacing: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
.main .ring:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #fff000;
  border-right: 3px solid #fff000;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}
@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
  table {
    display: block;
  }
  table thead {
    display: block;
  }
  table thead tr {
    display: block;
    position: absolute;
    top: -9999px;
    left: -9999px;
    margin: 0 0 1rem 0;
  }
  table thead tr th {
    display: block;
  }
  table thead tr:nth-child(odd) {
    background: #ccc;
  }
  table tbody {
    display: block;
  }
  table tbody tr {
    display: block;
    margin: 0 0 1rem 0;
  }
  table tbody tr td {
    display: block;
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  table tbody tr td:before {
    /* Now like a table header */
    /* Top/left values mimic padding */
    width: 45%;
    padding-right: 15px;
  }
  table tbody tr td:nth-of-type(1):before {
    content: "#";
  }
  table tbody tr td:nth-of-type(2):before {
    content: "#";
  }
  table tbody tr td:nth-of-type(3):before {
    content: "EmploymentType";
  }
  table tbody tr td:nth-of-type(4):before {
    content: "Nationality";
  }
  table tbody tr td:nth-of-type(5):before {
    content: "Surename";
  }
  table tbody tr td:nth-of-type(6):before {
    content: "FirstNames";
  }
  table tbody tr td:nth-of-type(7):before {
    content: "ID";
  }
  table tbody tr td:nth-of-type(8):before {
    content: "CardGeneration";
  }
  table tbody tr td:nth-of-type(9):before {
    content: "CardExpirationDate";
  }
  table tbody tr td:nth-of-type(10):before {
    content: "card_state";
  }
  table tbody tr td:nth-of-type(11):before {
    content: "CardNumber";
  }
  table tbody tr td:nth-of-type(12):before {
    content: "card_state";
  }
  table tbody tr td:nth-of-type(13):before {
    content: "Nation";
  }
  table tbody tr td:nth-of-type(14):before {
    content: "CardExpirationDate";
  }
  table tbody tr td:nth-of-type(15):before {
    content: "Activ";
  }
  table tbody tr:nth-child(odd) {
    background: #ccc;
  }
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiRDpcXE1vbGhhbVxccHJvamVjdHNcXERha28uV2ViLldlYkNvbXBvbmVudHNcXHBhY2thZ2VzXFxkdy1kYXRhdGFibGVcXHNyYyIsInNvdXJjZXMiOlsiaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtFQUVFO0VBQ0E7OztBQUdGO0VBRUU7RUFDQTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdFO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7O0FBS047RUFDRTtFQUNBOztBQUVBO0VBQ0U7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFJSjtFQUNFOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7O0FBSUo7RUFDRTtFQUNBOztBQUVBO0FBQUE7RUFFRTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7O0FBRUY7RUFDRTs7QUFHRjtFQUNFOztBQUlKO0VBQ0U7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBSUo7RUFDRTs7QUFNTjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0lBQ0U7O0VBR0Y7SUFDRTs7O0FBSUo7RUFDRTtJQUNFOztFQUdGO0lBQ0U7Ozs7QUFLTjtFQUVFO0lBQ0U7O0VBRUE7SUFDRTs7RUFFQTtJQUNFO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0VBRUE7SUFDRTs7RUFJSjtJQUNFOztFQUlKO0lBQ0U7O0VBRUE7SUFDRTtJQUNBOztFQUVBO0lBQ0U7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7RUFHRjtBQUNFO0FBRUE7SUFHQTtJQUNBOztFQUlGO0lBQ0U7O0VBR0Y7SUFDRTs7RUFHRjtJQUNFOztFQUdGO0lBQ0U7O0VBR0Y7SUFDRTs7RUFHRjtJQUNFOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTs7RUFFRjtJQUNFOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTs7RUFFRjtJQUNFOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTs7RUFFRjtJQUNFOztFQUlKO0lBQ0UifQ== */`;

// src/index.ts
var template = document.createElement("template");
template.innerHTML = src_default;
var DwDatatable = class extends HTMLElement {
  root;
  src = "";
  columns = [];
  livefilter = [];
  checkboxs = false;
  data = [];
  newData = [];
  sortCol;
  sortAsc;
  dataLinesIncrease = 0;
  numberOfRenderedLines = 25;
  counter = 1;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(src_default2);
    this.root.adoptedStyleSheets = [sheet];
    this.sort = this.sort.bind(this);
    this.search = this.search.bind(this);
  }
  static get observedAttributes() {
    return ["src", "columns", "livefilter", "checkboxs"];
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (_name === "src") {
      this.src = _newValue;
    }
    if (_name === "columns") {
      this.columns = _newValue.split(",").map((i) => i.trim());
    }
    if (_name === "livefilter") {
      this.livefilter = _newValue.split(",").map((i) => i.trim());
    }
    if (_name === "checkboxs") {
      if (_newValue === "true") {
        this.checkboxs = true;
      }
    }
  }
  async connectedCallback() {
    this.data = await this.fetchData(this.src);
    this.newData = this.data;
    this.renderHeader(this.columns);
    this.renderBody(this.data);
    this.renderInput();
    this.root.querySelectorAll(".livefilter").forEach((filter) => {
      filter.addEventListener("keyup", this.search);
    });
    this.renderColumns(this.columns);
    const checkList = this.root.querySelector("#list1");
    (checkList?.getElementsByClassName("columnsname")[0]).onclick = function() {
      if (checkList?.classList.contains("visible")) {
        checkList?.classList.remove("visible");
      } else {
        checkList?.classList.add("visible");
      }
    };
    const dataTablesDivElement = this.root.querySelector(".dataTables_scroll");
    if (dataTablesDivElement) {
      dataTablesDivElement.addEventListener("scroll", () => {
        this.loadOnScroll();
      });
    }
    this.root.querySelector("table")?.addEventListener("click", (event) => {
      const { target } = event;
      if (target) {
        if (target.name === "check") {
          if (target.parentElement?.parentElement?.classList.contains("selected")) {
            target.parentElement?.parentElement?.classList.remove("selected");
          } else {
            target.parentElement?.parentElement?.classList.add("selected");
          }
        }
      }
    });
  }
  renderInput() {
    this.livefilter.forEach((filter) => {
      const input = document.createElement("input");
      input.setAttribute("type", "search");
      input.setAttribute("name", filter);
      input.id = filter;
      input.classList.add("livefilter");
      input.placeholder = `search ${filter}`;
      this.root.querySelector(".inputs")?.appendChild(input);
    });
  }
  renderColumns(columns) {
    let result = `<div id="list1" class="dropdown-check-list">
        <span class="columnsname">Select columns</span>
        <ul class="items">`;
    columns.forEach((column) => {
      result += `
            <li><input type="checkbox" class="cols" name="${column}" ${this.columns.includes(column) ? "checked" : ""} />${column} </li>`;
    });
    result += "</ul> </div>";
    const columnsDivElement = this.root.querySelector(".columns");
    if (!columnsDivElement) {
      return;
    }
    columnsDivElement.innerHTML = result;
    const cols = this.root.querySelectorAll(".cols");
    cols.forEach((column) => {
      column.addEventListener("click", (e) => this.filterColumns(e));
    });
  }
  renderHeader(columns) {
    let header = "<tr> <th>#</th>";
    if (this.checkboxs) {
      header += '<th><input type="checkbox" id="checkAll"></th>';
    }
    columns.forEach((column) => {
      const columnName = this.headerNames(column);
      header += `<th class="sortableColumns" scope="col" data-sort= "${column}">${columnName} </th>`;
    });
    const thead = this.root.querySelector("thead");
    if (thead) {
      thead.innerHTML = header;
    }
    this.root.querySelectorAll(".sortableColumns").forEach((t) => t.addEventListener("click", this.sort));
    if (this.checkboxs) {
      const checkboxAll = this.root.querySelector("#checkAll");
      checkboxAll.addEventListener("click", () => this.toggleCheckbox());
    }
  }
  renderBody(data) {
    let result = "";
    let value;
    for (let i = this.dataLinesIncrease; i < data.length; i++) {
      if (this.counter - 1 < this.dataLinesIncrease + this.numberOfRenderedLines && this.counter - 1 <= data.length) {
        let row = "<tr>";
        row += `<td>${this.counter}</td>`;
        if (this.checkboxs) {
          row += '<td><input type="checkbox" name="check" class="check"></td>';
        }
        this.columns.forEach((column) => {
          value = this.objectByString(data[i], column);
          if (value) {
            if (typeof value === "string" && this.checkDate(value)) {
              row += `<td>${this.dateFormat(value)}</td>`;
            } else if (typeof value === "boolean") {
              row += `<td>
                                        <input type="button" class="${value ? "dwIcons dwIcons-active" : "dwIcons dwIcons-inactive"}">
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
    this.root.querySelectorAll(".dwIcons").forEach((dwIcon) => {
      dwIcon.addEventListener("click", (event) => {
        const { target } = event;
        if (target) {
          if (target.classList.contains("dwIcons-active")) {
            target.classList.remove("dwIcons-active");
            target.classList.add("dwIcons-inactive");
          } else {
            target.classList.remove("dwIcons-inactive");
            target.classList.add("dwIcons-active");
          }
        }
      });
    });
  }
  objectByString(obj, str) {
    const keys = str.split(".");
    let currentObj = obj;
    for (const key of keys) {
      if (key in currentObj) {
        currentObj = currentObj[key];
      } else {
        return;
      }
    }
    return currentObj;
  }
  headerNames(str) {
    const keys = str.split(".");
    return keys[keys.length - 1];
  }
  toggleCheckbox() {
    const checkboxAll = this.root.querySelector("#checkAll");
    const checkboxs = this.root.querySelectorAll(".check");
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
  sort(e) {
    const thisSort = e.target.dataset.sort;
    this.sortAsc = this.sortCol === thisSort ? !this.sortAsc : true;
    this.sortCol = thisSort;
    this.newData.sort((a, b) => {
      let comparison = 0;
      if (this.objectByString(a, this.sortCol) < this.objectByString(b, this.sortCol)) {
        comparison = this.sortAsc ? -1 : 1;
      } else if (this.objectByString(a, this.sortCol) > this.objectByString(b, this.sortCol)) {
        comparison = this.sortAsc ? 1 : -1;
      }
      return comparison;
    });
    this.reloadTable(this.newData);
  }
  search(event) {
    const thisInput = event.target.id;
    const searchElement = this.root.getElementById(`${thisInput}`);
    const searchText = searchElement.value;
    const tbody = this.root.querySelector("tbody");
    this.newData = this.data.filter((v) => this.objectByString(v, thisInput)?.toString().includes(searchText));
    if (tbody) {
      if (this.newData.length) {
        this.reloadTable(this.newData);
      } else {
        tbody.innerHTML = "<span>Not Found</span>";
      }
    }
  }
  filterColumns(e) {
    const column = e.target.name;
    const index = this.columns.indexOf(column);
    if (index !== -1) {
      this.columns.splice(index, 1);
    } else {
      this.columns.push(column);
    }
    this.renderHeader(this.columns);
    this.reloadTable(this.newData);
  }
  reloadTable(data) {
    this.dataLinesIncrease = 0;
    this.counter = 1;
    const tbody = this.root.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";
    }
    this.renderBody(data);
  }
  loadOnScroll() {
    const ring = this.root.querySelector(".ring");
    const dataTablesScroll = this.root.querySelector(".dataTables_scroll");
    if (!dataTablesScroll) {
      return;
    }
    const scrolled = dataTablesScroll?.scrollTop;
    const scrollable = dataTablesScroll.scrollHeight - dataTablesScroll?.clientHeight;
    if (scrolled === scrollable && this.counter <= this.newData.length) {
      ring.style.display = "block";
      setTimeout(() => {
        this.renderBody(this.newData);
        this.toggleCheckbox();
        ring.style.display = "none";
      }, 1);
    }
  }
  checkDate(input) {
    const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/i;
    return regex.test(input);
  }
  async fetchData(src) {
    try {
      const response = await fetch(src);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      const errorMessage = `An error has occurred: ${response.status}`;
      throw new Error(errorMessage);
    } catch (error) {
      const errorMessage = `Fetch error: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
  dateFormat(date) {
    const timestamp = new Date(date).getTime();
    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();
    if (month <= 9) {
      return `${year}-0${month + 1}-${day}`;
    }
    return `${year}-${month + 1}-${day}`;
  }
};
customElements.define("dw-datatable", DwDatatable);
//# sourceMappingURL=index.js.map

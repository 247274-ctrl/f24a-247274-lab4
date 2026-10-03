// Task 1 - The sheet
let rows = [];

// Task 5 - The total
let lastRow = null;

function drawSheet() {
  const body = document.getElementById("sheetBody");
  if (!body) return;

  body.innerHTML = "";

  let total = 0;

  rows.forEach(function(row) {
    const tr = document.createElement("tr");

    const item = document.createElement("td");
    item.textContent = row.item;

    const quantity = document.createElement("td");
    quantity.textContent = row.quantity;

    const price = document.createElement("td");
    price.textContent = row.price;

    const line = document.createElement("td");
    line.textContent = row.line;

    const note = document.createElement("td");
    note.textContent = row.note;

    tr.appendChild(item);
    tr.appendChild(quantity);
    tr.appendChild(price);
    tr.appendChild(line);
    tr.appendChild(note);
    body.appendChild(tr);

    if (typeof row.line === "number" && !Number.isNaN(row.line)) {
      total += row.line;
    }
  });

  document.getElementById("total").textContent = total;
  document.getElementById("totalKind").textContent = typeof total;

  if (lastRow) {
    document.getElementById("noteKind").textContent = typeof lastRow.note;

    const priceAsNumber = Number(lastRow.price);
    document.getElementById("priceMatch").textContent =
      lastRow.price == priceAsNumber;

    document.getElementById("sameKind").textContent =
      typeof lastRow.price === typeof priceAsNumber;

    if (Number.isNaN(lastRow.line)) {
      document.getElementById("lineKind").textContent = typeof lastRow.line;
    } else {
      document.getElementById("lineKind").textContent = "";
    }
  }
}

const itemForm = document.getElementById("itemForm");

if (itemForm) {
  itemForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Task 3 - Add a row
    const item = document.getElementById("item").value || undefined;
    const quantity = Number(document.getElementById("quantity").value);
    const priceText = document.getElementById("price").value;
    const price = Number(priceText);

    const row = {
      item: item,
      quantity: quantity,
      price: priceText,
      line: quantity * price,
      note: priceText + quantity
    };

    rows.push(row);
    lastRow = row;

    drawSheet();

    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
  });
}

// Task 7 - The change
function change(bill, paid) {
  return paid - bill;
}

const takeButton = document.getElementById("take");

if (takeButton) {
  takeButton.addEventListener("click", function() {
    const billText = document.getElementById("bill").value;
    const paidText = document.getElementById("paid").value;

    const bill = Number(billText);

    // Task 8 - Nothing paid
    const paid = paidText === "" ? null : Number(paidText);

    document.getElementById("paidKind").textContent =
      "Kind of paid: " + typeof paid;

    const result = document.getElementById("result");
    const half = document.getElementById("halfChange");

    half.textContent = "";

    if (paid === null) {
      result.textContent = "Still owed: " + bill;
      return;
    }

    const resultChange = change(bill, paid);

    if (bill > paid) {
      result.textContent = "Still owed: " + (bill - paid);
    } else {
      result.textContent = "Change: " + resultChange;

      if (paid > bill) {
        half.textContent = "Half of the change: " + resultChange / 2;
      }
    }
  });
}

// Task 9, 10, 11 - Who is in
let people = [
  {
    name: "First person",
    inShop: undefined
  }
];

function drawPeople() {
  const body = document.getElementById("peopleBody");
  if (!body) return;

  body.innerHTML = "";

  let count = 0;

  people.forEach(function(person) {
    const tr = document.createElement("tr");

    const name = document.createElement("td");
    name.textContent = person.name;

    const inShop = document.createElement("td");
    inShop.textContent = person.inShop;

    tr.appendChild(name);
    tr.appendChild(inShop);
    body.appendChild(tr);

    if (person.inShop === true) {
      count++;
    }
  });

  document.getElementById("peopleCount").textContent = count;
}

const hereButton = document.getElementById("here");
const outButton = document.getElementById("out");

if (hereButton) {
  hereButton.addEventListener("click", function() {
    const name = document.getElementById("personName").value;

    people.push({
      name: name,
      inShop: true
    });

    drawPeople();
    document.getElementById("personName").value = "";
  });
}

if (outButton) {
  outButton.addEventListener("click", function() {
    const name = document.getElementById("personName").value;

    people.push({
      name: name,
      inShop: false
    });

    drawPeople();
    document.getElementById("personName").value = "";
  });
}

drawSheet();
drawPeople();

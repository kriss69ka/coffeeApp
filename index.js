let milk = 1000;
let order = [];

let price = 0;
let name = "";
let currentCup;
let currentCapacity;

const orderName = document.querySelector(".order-name");
const orderPrice = document.querySelector(".order-price");
const askOrder = document.querySelector(".ask-order");
const cooking = document.querySelector(".cooking");
const progress = document.querySelector("progress");
const doneEl = document.querySelector(".done");
const doneImg = doneEl.querySelector("img");
const buttons = document.querySelectorAll("[data-item-name]");
const syrupEl = document.querySelector(".syrup");

const syrups = {
  banna: 500,
  vanilla: 500,
  cherry: 500
};

const items = {
  espresso: {
    name: "Эспрессо",
    capacity: 100,
    price: 90,
    type: "coffee"
  },
  latte: {
    name: "Латте",
    capacity: 250,
    milkCapacity: 100,
    price: 130,
    type: "coffee"
  },
  capucino: {
    name: "Капучино",
    price: 110,
    capacity: 250,
    milkCapacity: 80,
    type: "coffee"
  },
  bananaLatte: {
    name: "Банановый латте",
    price: 150,
    capacity: 300,
    milkCapacity: 100,
    syrup: "banna",
    type: "authrsCoffe"
  },
  vanillaCapucino: {
    name: "Ванильный капучино",
    price: 150,
    capacity: 300,
    milkCapacity: 80,
    syrup: "vanilla",
    type: "authrsCoffe"
  },
  flatWhite: {
    name: "Флэт уайт",
    price: 100,
    capacity: 280,
    milkCapacity: 120
  },
  milk: {
    name: "Молоко",
    price: 25,
    capacity: 50,
    type: "milk"
  },
  cherry: {
    name: "Вишневый сироп",
    price: 35,
    capacity: 50,
    syrup: "cherry",
    type: "syrup"
  }
};

const cups = {
  250: 5,
  380: 6
};

const getTime = type => {
  const ms = 1000;
  switch (type) {
    case "custom":
      return 8 * ms;
    case "authrsCoffe":
      return 5 * ms;
    default:
      return 3 * ms;
  }
};

const isItemAvaliable = name => {
  const item = items[name];

  return (
    (item.syrup ? syrups[item.syrup] >= 50 : true) &&
    Object.keys(cups).some(
      cup => cups[cup] && Number(cup) >= item.capacity + currentCapacity
    )
  );
};

const updateButtons = (exclude = []) => {
  buttons.forEach(button => {
    const name = button.dataset.itemName;
    if (
      (order.length ? order.includes(name) || exclude.includes(name) : true) &&
      isItemAvaliable(name)
    ) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  });
};

const updateScreen = () => {
  const price = order.reduce((price, cur) => items[cur].price + price, 0);
  let name = "";
  if (order.length === 1) {
    name = items[order[0]].name;
  } else {
    let coffeName = [];
    let syrupName = [];
    let milkName = [];

    order.forEach(name => {
      const item = items[name];

      if (item.type === "syrup") {
        syrupName.push(item.name);
      } else if (item.type === "milk") {
        milkName.push(item.name);
      } else {
        coffeName.push(item.name);
      }
    });

    if (coffeName.length) {
      coffeName = `${coffeName.length > 1 ? coffeName.length : ""} ${
        coffeName[0]
      }`;
    }

    if (syrupName.length) {
      syrupName = `${syrupName.length > 1 ? syrupName.length : ""} ${
        syrupName[0]
      }`;
    }

    if (milkName.length) {
      milkName = `${milkName.length > 1 ? milkName.length : ""} ${milkName[0]}`;
    }

    name = `${coffeName.length ? coffeName : ""} ${
      syrupName.length && milkName.length
        ? `с ${milkName} и ${syrupName}`
        : `с ${milkName.length ? milkName : syrupName}`
    }`;
  }
  askOrder.classList.add("hidden");
  orderName.textContent = name;
  orderPrice.textContent = `${price} руб`;
};

const getExlcudes = () => {
  let list = [];

  if (
    order.some(
      item => item === "espresso" || item === "latte" || item === "capucino"
    )
  ) {
    list.push("milk", "cherry");
  }

  if (order.length === 1 && order.includes("milk")) {
    list.push("espresso", "latte", "capucino");
  }

  return list;
};

const makeCoffee = name => {
  const item = items[name];

  order.push(name);

  currentCapacity = order.reduce((acc, cur) => acc + items[cur].capacity, 0);
  currentCup = Object.keys(cups).find(
    cupCapacity => Number(cupCapacity) >= currentCapacity
  );

  updateButtons([...order, ...getExlcudes()]);

  updateScreen();
};

const clear = () => {
  order = [];
  price = 0;
  name = "";
  currentCapacity = 0;
  currentCup = null;
  updateButtons();
  askOrder.classList.remove("hidden");
  orderName.textContent = "";
  orderPrice.textContent = "";
};

const done = () => {
  doneEl.classList.remove("hidden");
  doneEl.classList.add("done_alert");
  doneImg.src = "https://source.unsplash.com/200x200/?coffee";
};

const pay = () => {
  if (!order.length) {
    return;
  }
  cooking.classList.remove("hidden");
  let progressValue = 0;
  const tId = setInterval(() => {
    progress.value = progressValue = progressValue + 10;
    if (progressValue === 100) {
      clearInterval(tId);
      done();
    }
  }, getTime(order.length > 1 ? "custom" : order[0].type) / 10);

  order.forEach(item => {
    if (items[item].milkCapacity || items[item].type === "milk") {
      milk -= items[item].milkCapacity || items[item].capacity;
    }

    if (items[item].syrup) {
      syrups[item] -= 50;
    }
  });

  cups[currentCup] = -1;
};

document.querySelector(".buttons").addEventListener("click", event => {
  const name = event.target.dataset.itemName;
  if (name) {
    makeCoffee(name);
  }
});

document.querySelector(".cancel-button").addEventListener("click", clear);
document.querySelector(".payment").addEventListener("click", pay);

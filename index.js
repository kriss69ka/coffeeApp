let milk = 1000;
let order = [];

let price = 0;
let name = "";

const orderName = document.querySelector(".order-name");
const orderPrice = document.querySelector(".order-price");
const askOrder = document.querySelector(".ask-order");
const cooking = document.querySelector(".cooking");
const progress = document.querySelector("progress");
const doneEl = document.querySelector(".done");
const doneImg = doneEl.querySelector("img");
const buttons = document.querySelectorAll("[data-item-name]");
const syrupEl = document.querySelector(".syrup");

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
    type: "authrsCoffe"
  },
  vanillaCapucino: {
    name: "Ванильный капучино",
    price: 150,
    capacity: 300,
    milkCapacity: 80,
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

// const disableSyrup = () => {
//   syrupEl.setAttribute("disabled", "disabled");
// };

const toggle = (exclude = []) => {
  buttons.forEach(button => {
    const dataName = button.dataset.itemName;
    if (!exclude.includes(dataName)) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.removeAttribute("disabled");
    }
  });
};

const updateScreen = () => {
  const price = order.reduce((price, cur) => items[cur].price + price, 0);
  let name = "";
  if (order.length === 1) {
    name = items[order[0]].name;
  } else {
    let coffeName;
    let syrupName;
    let milkName;
  }
  askOrder.classList.add("hidden");
  orderName.textContent = name;
  orderPrice.textContent = `${price} руб`;
};

const makeCoffee = name => {
  const item = items[name];

  order.push(name);

  if (name !== "espresso" && name !== "latte" && name !== "capucino") {
    toggle(name === "milk" ? ["espresso", ...order] : order);
  } else {
    toggle(["cherry", ...order]);
  }

  updateScreen();
};

const clear = () => {
  price = 0;
  name = "";
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
  //   clear();
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
  });
};

document.querySelector(".buttons").addEventListener("click", event => {
  const name = event.target.dataset.itemName;
  if (name) {
    makeCoffee(name);
  }
});

document.querySelector(".cancel-button").addEventListener("click", clear);
document.querySelector(".payment").addEventListener("click", pay);

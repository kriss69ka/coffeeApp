// переменная обхем молока
// объект с коффе и цена, объем молока, объем напитка
// объект со стаканчиками б- кол-во м-кол-во

let milk = 1000;
const coffee = {
  espresso: {
    price: 90,
    capacity: 100
  },
  latte: {
    price: 130,
    capacity: 250,
    capacityMilk:100
  },
  capucino: {
    price: 110,
    capacity: 250,
    capacityMilk:80
  },
  bananaLatte: {
    price: 150,
    capacity: 300,
    capacityMilk:100,
    syrup:50
  },
  vanillaCapucino: {
    price: 150,
    capacity: 300,
    capacityMilk:80,
    syrup:50
  },
  flatWhite: {
    price: 100,
    capacity: 280,
    capacityMilk:120
  },
  milk: {
    price: 25,
    capacity: 50,
    capacityMilk: 50
  },
  cherry: {
    price: 35,
    syrup:50
  }
}
let cup = {
  big: {
    capacity: 380,
    amount: 6
  },
  small: {
    capacity:250,
    amount: 5
  }
}
let syrup = {
  vanilla: 500,
  banana: 500,
  cherry: 500
}

const buttons = document.querySelectorAll("button.coffee-button");

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    console.log(list[i])
      list[i].addEventListener(event, fn);
  }
}

const a = (e) => console.log(e.target);

addEventListenerList(buttons, 'click', a); 
"use strict"

// const goods = [
//   { title: 'Shirt', price: 150 },
//   { title: 'Socks', price: 50 },
//   { title: 'Jacket', price: 350 },
//   { title: 'Shoes', price: 250 },
//   {},
// ];

const reformData = (item) => {
  return item.map(({product_name, ...rest}) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_POSTFIX = "/catalogData.json";
  const service = function(url, postfix) {
    return new Promise((resolve, reject) => {
      fetch(`${url}${postfix}`).then((res)=> {
        return res.json();
    }).then((date)=> {
      resolve(date)
    })
  })
}

class CartItems {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.count = 0;
  }
  addToCart() {
    // добавляем товары в корзину с проверкой повторяющихся позиций
  }
  removeItems() {
    //  удаляем товары из корзины
  }
  showTotalPrice() {
    // подсчитываем общую сумму
  }
}

class GoodsItem {
  constructor({ title = "Вакантно", price = 0 }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
          <div class="goods-item">
            <img class="goods-item__img" src="img/${this.title}.jpg" alt="goods_image">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
          </div>
        `;
  }
}

class GoodsList {
  setGoods(){
    return service(URL, GOODS_POSTFIX).then((data)=> {
      return reformData(data)
    });
  }
  render() {
    this.setGoods().then((data)=> {
      this.goods = data;
      const _goods = [...this.goods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
      document.querySelector('.goods-list').innerHTML = _goodsItems.join("");
    });
  }
  getTotalPrice() {
    let totalSumm = 0;
    service(URL, GOODS_POSTFIX).then((data)=> {
      data.map((item) => {
        if (item.price == undefined) {
          item.price = 0;
          return item.price
        }
        this.price = item.price
        totalSumm += this.price;
      })
      console.log(`Стоимость всех товаров ${totalSumm} у.е.`);
    });
  }
};

const goodsList = new GoodsList();
goodsList.render();
goodsList.getTotalPrice();


// промисы

// const prom = fetch("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json");

// prom.then((res) => {
//   return res.json()
// }).then((date) => {

// })


// гамбургерная

  // const burgers = [
  //   {title: "Большой", price: 100, fat: 40 },
  //   {title: "Маленький", price: 50, fat: 20 },
  // ];
  // const garnears = [
  //   {title: "Сыр", price: 10, fat: 20 },
  //   {title: "Салат", price: 20, fat: 5 },
  //   {title: "Картофель", price: 15, fat: 10 },
  // ]
  // const topings = [
  //   {title: "Приправа", price: 15, fat: 0 },
  //   {title: "Майонез", price: 20, fat: 5 },
  // ];

  // class MakeOrder {
  //   constructor(title){
  //     this.title = title;
  //     this.price = 0;
  //     this.fat = 0;
  //   }
  //   calc(item){
  //     this.price += item.price;
  //     this.fat += item.fat;
  //   }
  //   chooseBurger(item){
  //     // this.burger = item;
  //     burgers.map((item) => {
  //       if (item.title == this.title){
  //         this.calc(item);
  //       }
  //     })
  //     this.addGarnear();
  //   }
  //   addGarnear(){
  //     const garnear = prompt('Каклй гарнир положить?');
  //     garnears.map((item) => {
  //       if (item.title === garnear) {
  //         this.calc(item);
  //       }
  //     })
  //     this.addToping()
  //   }
  //   addToping(){
  //     topings.map((item) => {
  //     if ( confirm(`Добавить ${item.title} ?`)) {
  //       this.calc(item);
  //     }
  //     })
  //   }
  // }

  // const newOrder = new MakeOrder("Маленький");
  // newOrder.chooseBurger();
  // console.log(newOrder);
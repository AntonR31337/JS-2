"use strict"

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
const BASKET_POSTFIX = "/getBasket.json";
const ADD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_FROM_BASKET_POSTFIX = "/deleteFromBasket.json";

  const service = function(url, postfix, method = "GET") {
    return new Promise((resolve, reject) => {
      fetch(`${url}${postfix}`, {method}).then((res)=> {
        return res.json();
    }).then((date)=> {
      resolve(date)
    })
  })
}

class Basket {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.count = 0;
  }
  getBasket() {
    // Получаем json корзины 
    return service(URL, BASKET_POSTFIX).then((data)=> {
      this.goods = reformData(data.contents);
      console.log(this.goods);
    });
  }
  delGoodsFromBasket(id){
    return service(URL, `${DELETE_FROM_BASKET_POSTFIX}/${id}`, "DELETE").then((data)=> {
      return reformData(data)
    });
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
            <img class="goods-item__img" src="" alt="goods_image">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
          </div>
        `;
  }
}

class GoodsList {
  constructor(){
    const searchBtn = document.getElementById('search');
    searchBtn.addEventListener('click', () => {
      this.filteredGoods().preventDefault();
    })
  }
  filteredGoods(){
    const input = document.getElementsByClassName('search-text')[0];
    this.filterGoods = this.goods.filter(({ title })=>{
      return new RegExp(input.value).test(title);
    })
    this.render();
  }
  addGoodsToBasket(){
    return service(URL, ADD_TO_BASKET_POSTFIX, "POST").then((data)=> {
      return reformData(data)
    });
  }

  setGoods(){
    return service(URL, GOODS_POSTFIX).then((data)=> {
      const result = reformData(data);
      this.goods = result;
      this.filterGoods = result;
    });
  }
  render() {
    const _goods = [...this.filterGoods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
      document.querySelector('.goods-list').innerHTML = _goodsItems.join("");
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
goodsList.setGoods().then(()=>{
  goodsList.render();
});
goodsList.getTotalPrice();

const cart = new Basket;
cart.getBasket();
cart.delGoodsFromBasket("10010110100");


// регулярные выражения

  // const text = "Lorem i'm a person who 'ipsum' dolor sit, amet consectetur adipisicing elit. Tempore placeat eaque totam, blanditiis 'temporibus vel' sunt consequuntur. Amet quos delectus exercitationem non ratione animi placeat nulla ipsa eveniet, 'blanditiis aperiam voluptates' sit, alias aspernatur nihil. Adipisci nihil eos optio, maxime atque nam, voluptatibus placeat, 'inventore id' recusandae est nulla itaque ";

  // const re = /'/g;
  // const re2 = /\b'(?!\b)|(?<!\b)'\b/gi;

  // const result = text.replace(re2, "\"");



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
"use strict"

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
  {},
];

class GoodsItem {
  constructor({ title = "Вакантно" , price = 0 }) {
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
  constructor() {
    this.goods = goods;
  }
  render() {
    const _goods = [...this.goods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
    debugger
    document.querySelector('.goods-list').innerHTML = _goodsItems.join("");
  }
  getTotalPrice() {
    let totalSumm = 0;
    this.goods.map((item) => {
      this.price = item.price
      totalSumm += this.price;
    })
    console.log(totalSumm);
  }
}

const goodsList = new GoodsList();
goodsList.render();
goodsList.getTotalPrice();
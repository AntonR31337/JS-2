"use strict"

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    {},
  ];

const renderGoodsItem = ({title="Empty title", price="Empty price"}) => 
    `   <div class="goods-item">
            <img class="goods-item__img" src="img/${title}.jpg" alt="goods_image">
            <h3>${title}</h3>
            <p>${price}</p>
        </div>`;
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
  }
  
  renderGoodsList(goods);
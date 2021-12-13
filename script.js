const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

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

  const service = function(url, postfix, method ="GET") {
    return new Promise((resolve, reject) => {
      fetch(`${url}${postfix}`, {
        method
      }).then((res) => {
        return res.json();
      }).then((data) => {
        resolve(data)
      })
    });
  }

class Basket {
  setGoods() {
    return service(URL, BASKET_POSTFIX).then((data) => {
      this.goods = reformData(data.contents);
    });
  }
deleteGoodToBasket(id) {
  return service(URL, `${ADD_TO_BASKET_POSTFIX}/${id}`, "DELETE").then((data) => {

  });
}
setVision() {}
render() {}
}
class BasketItem {
  setCount() {}
  deleteItem() {}
  render() {}
}

onload = () => {
  const app = new Vue({
    el: "#app",
    data: {
      goods: [],
      filteredGoods: [],
      search: '',
      basketVision: false
    },
    mounted() {
      service(URL, GOODS_POSTFIX).then((data) => {
        const result = reformData(data);
        this.goods = result;
        this.filteredGoods = result;
      });
    },
    methods: {
      filter() {
        this.filteredGoods = this.goods.filter(({ title })=>{
          return new RegExp(this.search, "i").test(title);
        });
      },
      showBasket() {
        this.basketVision = true
      },
      closeBasket() {
        this.basketVision = false
      }
    }
  })
}
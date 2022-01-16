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
      setTimeout(() => {
        fetch(`${url}${postfix}`, {
          method
        }).then((res) => {
          return res.json();
        }).then((data) => {
          resolve(data)
        })
      }, 1000)
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
  Vue.component('search', {
    props: ['click', 'filter'],
    data: function () {
      return {
        filteredGoods: [],
        search: '',
      }
    },
    template: `
      <div class="search">
        <input v-model="search" class="search-text" type="text" placeholder="Что ищешь?">
        <button id="search" v-on:click="$emit('click', search)" class="search-btn">Искать!</button>
      </div>
    `,
  })
  Vue.component('basket-item', {
    props: ['item'],
    template: `
    <div>
      <div class="basket_items">
        <div class="basket_items-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}</p>
          <close-button></close-button>
        </div>
        <hr>
      </div>
    </div>
    `
  })
  Vue.component('close-button', {
    props: ['click'],
    template: `
      <button v-on:click="$emit('click')" class="close-btn">X</button>
    `
  })

  Vue.component('basket', {
    props: ['close'],
    data: function () {
      return {
        basketGoods: [],
      }
    },
    template: `
      <div class="cart">
        <h3 class="cart__title">Корзина</h3>
        <close-button @click="$emit('close')"></close-button>
        <div>
          <basket-item v-for="item in basketGoods" :item="item"></basket-item>
        </div>
      </div>
    `,
    mounted() {
      service(URL, BASKET_POSTFIX).then((data) => {
        const result = reformData(data.contents);
        this.basketGoods = result;
      });
    },
    methods: {
      fu: function () {
        basketVision = false
      }
    }
  })

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
      filter(event) {
        debugger
        this.search = event;
        this.filteredGoods = this.goods.filter(({ title })=>{
          return new RegExp(this.search, "i").test(title);
        });
      },
      showBasket() {
        if (this.basketVision != true) {
          this.basketVision = true
        } else {
          this.closeBasket.call()
        }
      },
      closeBasket() {
        this.basketVision = false
      }
    }
  })
}
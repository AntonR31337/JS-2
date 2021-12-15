const URL = "http://localhost:8000";
const GOODS_POSTFIX = "/goods.json";
const BASKET_POSTFIX = "/getBasket.json";
const ADD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_FROM_BASKET_POSTFIX = "/deleteFromBasket.json";

const fetchAddGood = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
}

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
      this.goods = data;
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
  Vue.component('custom-button', {
    props: ['click'],
    template: `
      <button @click="$emit('click')">
        <slot></slot>
      </button>
    `
  })
  Vue.component('goods-item', {
    props: ['item'],
    template: `
      <div>
        <div class="goods-item">
          <img class="goods-item__img" src="" alt="goods_image">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}</p>
          <div>
            <custom-button @click="addGood">Добавить</custom-button>
          </div>
        </div>
      </div>
    `,
    methods: {
      addGood() {
        fetchAddGood(this.item.id);
      }
    }
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
        const result = data.contents;
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
        this.goods = data;
        this.filteredGoods = data;
      });
    },
    methods: {
      filter(event) {
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
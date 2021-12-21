import {fetchAddBasketGoods} from '../../services';

export default Vue.component('basket', {
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
      fetchAddBasketGoods().then((data) => {
        this.basketGoods = data;
      })
    },
    methods: {
      fu: function () {
        basketVision = false
      }
    }
  })
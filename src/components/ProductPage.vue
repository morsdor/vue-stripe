<template>
  <template v-for="product in productArray" :key="product.name">
    <div class="main-block">
      <img src="./../assets/pic.png" alt="" class="img-block" />
      <div class="prod-details">
        <div class="prod-descp">
          {{product.description}}
        </div>
        <div class="prod-price-detail">
          <h2>{{ product.currency }}{{ product.amount }}</h2>
          <button class="buy-now" @click="() => handleClick(product)">
            <p v-if="!product.buyNowClicked">BUY NOW</p>
            <p v-else>Loading...</p>
          </button>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { projectFirestore } from "../config/config";
import { ProductModel } from "../models/ProductModel";
import axios from "axios";

export default defineComponent({
  setup() {
    const currency = ref("$");
    const price = ref(30);
    const productArray = ref<ProductModel[]>([]);

    onMounted(async () => {
      const docs = await projectFirestore.collection("product").get();
      if (docs) {
        docs.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            data.currency = (data.currency as string).toUpperCase();
            data.id = doc.id;
            data.buyNowClicked = false;
            productArray.value.push(data as ProductModel);
          }
        });
      }
    });

    const handleClick = async (product: ProductModel) => {
      product.buyNowClicked = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/stripe-tutorial-bytepad/us-central1/createCheckoutSession",
          { id: product.id }
        );
        if (response.status === 200) {
          product.buyNowClicked = false;
          window.location.href = response.data;
        } else {
          alert(response.status + response.data);
        }
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      currency,
      price,
      handleClick,
      productArray,
    };
  },
});
</script>

<style scoped>
.main-block {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 30px;
}

.img-block {
  width: 300px;
  height: 300px;
}

.prod-details {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.prod-price-detail {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.buy-now {
  color: blueviolet;
  background-color: blueviolet;
  color: white;
  border: none;
  border: solid 1px;
  border-radius: 3px;
  box-shadow: 10px;
  width: 200px;
  height: 50px;
}


</style>

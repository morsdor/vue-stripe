<template>
  <div class="block">
    <label> Email : </label>
    <span>{{ customer.email }}</span>
    <label> Amount : </label>
    <span>{{ customer.amount }}</span>
    <label> Payment status : </label>
    <span>{{ customer.name }}</span>
  </div>
</template>


<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { CustomerModel } from "../models/CustomerModel";

export default defineComponent({
  setup() {
    const customer = ref<CustomerModel>(new CustomerModel());

    onMounted(async () => {
      const sessionId = useRoute().query.session_id;
      console.log(sessionId);
      const details = await axios.post(
        "http://localhost:5000/stripe-tutorial-bytepad/us-central1/getCustomerDetails",
        { sessionId: sessionId }
      );
      if (details.data) {
        console.log(details.data);
        customer.value.email = details.data.customerEmail;
        customer.value.name = details.data.name;
        customer.value.amount = details.data.amount;
      }
    });

    return {
      customer,
    };
  },
});
</script>
<style scoped>
.block {
  flex-flow: column wrap;
}
</style>

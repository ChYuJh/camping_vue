import { onMounted, ref } from "vue";
import axios from "axios";
export default function (id) {
  let productItem = ref(null);
  onMounted(async () => {
    let result = await axios.get(`http://localhost:8000/Product/${id}`);
    productItem.value = result.data[0];
  });
  return productItem;
}

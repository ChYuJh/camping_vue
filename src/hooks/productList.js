import { ref, onBeforeMount } from "vue";
import axios from "axios";
export default function () {
  const data = ref(null);
  onBeforeMount(async () => {
    let response = await axios.get("http://localhost:8000/allProduct");
    data.value = response.data;
  });
  return data;
}

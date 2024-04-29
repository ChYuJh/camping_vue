import { ref } from "vue";

export default function (value1) {
  value1 = ref(value1);
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒數
  const timestamp1 = new Date(value1.value[0]).getTime();
  const timestamp2 = new Date(value1.value[1]).getTime();
  const diffInMilliseconds = Math.abs(timestamp2 - timestamp1);
  let days = Math.round(diffInMilliseconds / oneDay);
  value1.value = days < 3 ? "" : value1.value;
  return days;
}

<template>
  <div v-if="productItem">
    <div class="product-page">
      <div class="class-list">
        <h3>
          商品分類
          <img
            class="angle-down"
            src="../assets/image/icon/angle-down.png"
            alt="angle-down"
            @click="angleDown"
          />
        </h3>
        <ul class="class-item">
          <li><router-link to="/product/cart">露營推車</router-link></li>
          <li><router-link to="/product/light">露營燈</router-link></li>
          <li>
            <router-link to="/product/tables-chairs">桌椅組</router-link>
          </li>
          <li><router-link to="/product/sleeping-pad">睡墊</router-link></li>
          <li><router-link to="/product/tent">帳篷</router-link></li>
          <li><router-link to="/product/keep-fresh">保鮮</router-link></li>
          <li><router-link to="/product/other">其他</router-link></li>
        </ul>
      </div>
      <div class="product-intro">
        <div class="product-image">
          <img
            :src="require(`../assets${productItem.url_image}`)"
            :alt="`${productItem.product}`"
          />
        </div>
        <div class="product-info">
          <form>
            <div class="product-title">
              <h3 data-id="SKU-5695038003" data-price="">
                {{ productItem.product }}
              </h3>
            </div>
            <ul v-for="(item, index) in productItem.feature" :key="index">
              <li>{{ item }}</li>
            </ul>
            <p class="price">{{ productItem.priceStr }}</p>
            <div class="add-cart">
              <p>數量:</p>
              <span
                ><button type="button" class="reduce-btn" @click="reduce">
                  -
                </button></span
              >
              <input
                type="text"
                name="quantitly"
                class="select-quantitly"
                v-model="order.quantity"
              />
              <span
                ><button type="button" class="add-btn" @click="add">
                  +
                </button></span
              >
            </div>
            <div class="pick-method">
              <p>運送方式:</p>
              <label for="home-delivery">
                <input
                  type="radio"
                  id="home-delivery"
                  name="method"
                  value="宅配"
                  v-model="order.shippingMethod"
                />
                宅配</label
              >
              <label for="store-pickup">
                <input
                  type="radio"
                  id="store-pickup"
                  name="method"
                  value="門市取件"
                  v-model="order.shippingMethod"
                />
                門市取件</label
              >
            </div>
            <div class="reserve">
              <p>租借期間:</p>
              <div class="demo-date-picker">
                <div class="block">
                  <el-date-picker
                    class="select-date"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :size="size"
                    :disabled-date="disabledDate"
                    v-model="value1"
                  />
                </div>
              </div>
              <button type="button" class="reserve-btn" @click="reserveBtn">
                預約
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="product-table">
      <table>
        <tr>
          <th class="table-header" colspan="2">規格說明</th>
        </tr>
        <tr v-for="(key, i) in Object.keys(productItem.Specification)" :key="i">
          <th class="row-header">{{ key }}</th>
          <td>
            {{ productItem.Specification[key] }}
          </td>
        </tr>
      </table>
    </div>

    <div class="remind">
      <h3>預約須知</h3>
      <p>預約前請先詳細閱讀租借規範</p>
      <p>
        提醒您請於預約下單後3日內完成匯款，逾時訂單將會取消 並釋出商品供他人預訂
      </p>
    </div>
    <div v-if="!productItem">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import productItemdata from "../hooks/productItem";
import { ElDatePicker } from "element-plus";
import "element-plus/dist/index.css";
import usedateDiffInDays from "../hooks/dateDiffInDays";
import { reactive, ref, watch } from "vue";
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "ProductDetail",
  props: ["id"],
  components: [ElDatePicker],
  setup(props) {
    let productItem = reactive(null);
    productItem = productItemdata(props.id);

    watch(productItem, (newValue) => {
      order.productName = newValue.product;
      order.price = newValue.price;
      order.url_image = newValue.url_image;
    });
    //訂單
    let order = reactive({
      quantity: 1,
      shippingMethod: "",
    });
    //選擇日期
    let value1 = ref("");
    //數量
    function reduce() {
      if (order.quantity > 1) {
        order.quantity--;
      } else {
        return;
      }
    }
    function add() {
      order.quantity++;
    }
    watch(value1, (newValue) => {
      let days = dateDiffInDays(newValue);
      if (days >= 3) {
        value1.value = newValue;
        order.days = days;
        order.date = newValue;
      } else {
        swal({
          title: "租借天數最少為三天",
          icon: "warning",
          dangerMode: true,
        });
        value1.value = "";
        order.date = "";
        return;
      }
    });
    //計算租借天數
    function dateDiffInDays(value1) {
      return usedateDiffInDays(value1);
    }
    //限制可選日期
    const size = "default";
    const disabledDate = (time) => {
      const today = new Date();
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      return (
        time.getTime() < today.getTime() ||
        time.getTime() > oneMonthLater.getTime()
      );
    };

    //預約
    async function reserveBtn() {
      if (!order.shippingMethod || !order.date) {
        swal({
          title: "租借日期、取貨方式不得為空",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }

      let startY = order.date[0].getFullYear();
      let startM = order.date[0].getMonth() + 1;
      let startD = order.date[0].getDate();
      let endY = order.date[1].getFullYear();
      let endM = order.date[1].getMonth() + 1;
      let endD = order.date[1].getDate();
      let sendServer = {
        ...order,
        lastPrice:
          order.days === 3
            ? order.price
            : Math.ceil(order.days / 3) * order.price,
        stardate: startY + "/" + startM + "/" + startD,
        enddate: endY + "/" + endM + "/" + endD,
      };
      let config = {
        headers: {
          "content-type": "application/json",
        },
      };
      await axios
        .post("http://localhost:8000/create/carts", sendServer, config)
        .then(() => swal("成功加入購物車", "加入購物車", "success"));

      console.log(sendServer);
    }
    //RWD分類列表
    let angleDown = () => {
      const angleDown = document.querySelector(".class-item");
      angleDown.classList.toggle("show");
    };

    return {
      productItem,
      order,
      reduce,
      add,
      disabledDate,
      value1,
      size,
      reserveBtn,
      angleDown,
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: GenJyuuGothicX;
  src: url("../fonts/GenJyuuGothicX-P-Normal.ttf");
}
body {
  font-family: GenJyuuGothicX;
}
.class-list {
  flex: 1 1 100px;
  margin-top: 200px;
  padding-left: 15px;
}
.class-list h3 {
  background-color: #6a5b45;
  color: #ffffff;
  font-weight: normal;
  font-size: 22px;
  padding: 15px 10px;
}
.angle-down {
  display: none;
}
.class-item {
  list-style-image: url(../assets/image/icon/angle-right.png);
  background-color: #6a5b45;
  padding-left: 29px;
}
.class-item li {
  padding: 15px;
  border-bottom: 1px solid rgb(201, 201, 201);
}
.class-item li:hover {
  background-color: #e0c091;
  transition: background-color 0.3s linear;
}
.class-item li a {
  text-decoration: none;
  display: block;
}
.class-item li a:link,
.class-item li a:visited {
  color: #ffffff;
}
.product-page {
  display: flex;
}
.class-list {
  min-height: 300px;
}
.product-intro {
  margin-top: 200px;
  flex: 8 1 100px;
  display: flex;
  margin-left: 80px;
  flex-wrap: wrap;
  background-color: #ffffff;
  justify-content: center;
}
.product-image {
  max-width: 400px;
  margin: 100px;
}
.product-image img {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.409);
  box-shadow: 2px 2px 2px 1px rgba(195, 195, 195, 0.297);
}

.product-info h3 {
  margin: 20px;
  font-size: 25px;
}
.product-info ul {
  margin-left: 40px;
  list-style-image: url("../assets/image/icon/social-network-icon.png");
}
.product-info ul li {
  font-size: 20px;
  margin: 10px 0;
}
.product-info input[type="text"] {
  height: 40px;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  font-size: 25px;
  max-width: 300px;
}

.product-info h3 {
  margin: 20px;
  font-size: 25px;
}
.product-info ul {
  margin-left: 40px;
  list-style-image: url("../assets/image/icon/social-network-icon.png");
}
.product-info ul li {
  font-size: 20px;
  margin: 10px 0;
}
p.price {
  font-size: 25px;
  margin-top: 30px;
  padding: 0 20px;
}
.reserve-btn {
  background-color: #b1a481;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  margin: 4px 2px;
  cursor: pointer;
}
.add-cart {
  margin: 20px;
}
.add-cart p {
  margin: 20px 0;
  font-size: 25px;
}
.add-cart input {
  margin: 0;
  font-size: 25px;
}
.reserve {
  font-size: 25px;
  margin: 20px;
}
.reserve p {
  margin: 20px 0;
}

.reduce-btn,
.add-btn {
  background-color: #505151;
  border: none;
  color: white;
  min-height: 40px;
  min-width: 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  cursor: pointer;
}

.pick-method p {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.pick-method input[type="radio"] {
  vertical-align: middle;
  margin-top: -2px;
  margin-bottom: 1px;
}

.pick-method label {
  font-size: 25px;
  padding: 23px;
  margin: 5px;
}
.product-table {
  margin-top: 100px;
  background-color: #ffffff;
  padding: 50px 0;
}
.product-table table {
  min-width: 800px;
  margin: 0px auto;
}
.product-table h3 {
  font-size: 25px;
  text-align: center;
  color: #47574c;
  font-weight: bold;
  padding: 50px 0;
}
.product-table table,
th,
tr,
td {
  border: 1px solid rgb(0, 0, 0);
  padding: 20px;
}
.remind {
  text-align: center;
  height: 350px;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: #aa9d7c;
  color: #ffffff;
  padding: 100px 0;
}
.remind h3 {
  padding-bottom: 10px;
  font-size: 25px;
  color: #ffffff;
  font-weight: bold;
}

.remind p {
  padding: 20px 0;
}

@media screen and (max-width: 1320px) {
  iframe {
    display: block;
    position: static;
    margin: 10px auto;
    width: 100%;
  }

  .service-intro {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    max-width: 100%;
    margin: 10px auto;
    display: inline-block;
  }
}
@media screen and (max-width: 910px) {
  .about-form {
    padding: 10px;
  }
  .form-input label {
    width: 100%;
  }
  .about-form {
    padding: 25px;
  }
  .form-input {
    flex-direction: column;
  }
  .about-form form label input {
    margin: 20px 0;
    width: 100%;
  }
}
@media screen and (max-width: 810px) {
  .nav-list {
    display: none;
  }
  .shopping-cart {
    display: inline;
  }
  .product-intro {
    margin-left: 0;
  }
  .product-page {
    flex-direction: column;
  }
  .class-list {
    margin-top: 0px;
    padding-left: 0;
    min-height: 100%;
  }
  .class-item {
    display: none;
    background: #6a5b45;
    padding-bottom: 15px;
    text-align: center;
  }

  .angle-down {
    display: inline;
    padding-left: 15px;
    cursor: pointer;
  }

  .class-item.show {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .class-item li {
    display: block;
    border-bottom: none;
    margin-bottom: 10px;
  }
  .product-intro {
    margin-top: 80px;
  }
  .nav-container {
    flex-direction: column;
  }
  .menu-burger {
    display: block;
    padding: 15px 0;
  }
  .nav-list {
    display: none;
  }
  .nav-list.menu-show {
    display: flex;
    flex-direction: column;
  }
  .nav-list li {
    display: block;
    border-bottom: none;
    margin-bottom: 10px;
  }
  .product-content {
    flex-direction: column;
  }
  .product {
    margin-top: 80px;
  }
  li.product-card {
    margin: 0 auto;
  }
}
@media screen and (max-width: 800px) {
  .product-table table {
    min-width: 100%;
  }
}
@media screen and (max-width: 410px) {
  .product-info input[type="text"] {
    max-width: 200px;
  }
  .reserve input[type="text"] {
    max-width: 300px;
  }
  .reserve-btn {
    margin: 40px auto;
    width: 100%;
  }
}
</style>

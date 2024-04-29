<template>
  <div class="buy-cart-container">
    <table class="buy-cart-table">
      <thead>
        <tr>
          <th>商品名稱</th>
          <th>價格</th>
          <th>數量</th>
          <th>預約日期</th>
          <th>運送方式</th>
        </tr>
      </thead>
      <tbody class="order-List">
        <tr v-for="(item, i) in carData" :key="i">
          <td class="product-name">
            <div class="graphics-text">
              <img
                :src="require(`../assets${item.productImage}`)"
                alt="productImage"
              />
              <p>{{ item.productName }}</p>
            </div>
          </td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.stardate }}~{{ item.enddate }}</td>

          <td>
            <div class="methodFrash">
              <span>{{ item.method }}</span>
              <span @click="deleteBtn(i)">
                <img
                  src="../assets/image/icon/trash.png"
                  alt="frash"
                  class="frash"
                />
              </span>
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan="5" class="total-price">總計{{ total }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pay-btn">
      <button type="button" @click="submitCar">結帳</button>
    </div>

    <div class="pay-form">
      <form action="">
        <div class="cross-img" @click="closeBtn">
          <img src="../assets/image/icon/cross.png" alt="" />
        </div>
        <h3>您的訂單</h3>
        <div>
          <label htmlFor="attention">
            收件人姓名:
            <input
              type="text"
              id="attention"
              name="attention"
              v-model.lazy="ordersInfo.recipientName"
            />
          </label>
        </div>
        <div>
          <label for="address">
            收件人地址:
            <input
              type="text"
              id="address"
              name="address"
              v-model="ordersInfo.recipientAdderss"
            />
          </label>
        </div>
        <div>
          <label for="attention-phone">
            收件人電話:
            <input
              type="text"
              id="attention-phone"
              name="attention-phone"
              v-model.lazy="ordersInfo.recipientPhone"
            />
          </label>
        </div>
        <div>
          <p>
            訂單金額:
            <span class="pay-price">{{ total }}</span>
          </p>
        </div>
        <div class="pay-method">
          <span>付款方式:</span>
          <label for="ATM">
            網路轉帳
            <input
              type="radio"
              name="pay"
              value="網路轉帳"
              id="ATM"
              v-model="ordersInfo.recipientMethod"
            />
          </label>
          <label for="visa">
            信用卡
            <input
              type="radio"
              name="pay"
              value="信用卡"
              id="visa"
              v-model="ordersInfo.recipientMethod"
            />
          </label>
        </div>
        <div class="finish-btn">
          <button type="button" @click="sentOrder">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "buyCartView",

  setup() {
    let carData = ref(null);
    let total = ref(0);
    let ordersInfo = reactive({
      recipientName: "",
      recipientAdderss: "",
      recipientPhone: "",
      recipientMethod: "",
    });
    function submitCar() {
      if (carData.value.length < 1) {
        swal({
          title: "購物車為空",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }
      document.querySelector(".pay-form").style.display = "block";
    }

    let closeBtn = () => {
      document.querySelector(".pay-form").style.display = "none";
    };

    //檢查
    watch(ordersInfo, (newValue) => {
      let rules;
      console.log(newValue);
      if (newValue.recipientName) {
        rules = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
        ordersInfo.recipientName = rules.test(newValue.recipientName)
          ? newValue.recipientName
          : "";

        if (!newValue.recipientName) {
          swal({
            title: "請填入正確的姓名",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
      if (newValue.recipientPhone) {
        rules = new RegExp(/^09\d{8}/);
        ordersInfo.recipientPhone = rules.test(newValue.recipientPhone)
          ? newValue.recipientPhone
          : "";

        if (!newValue.recipientPhone) {
          swal({
            title: "請填入正確的電話號碼",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });

    //送出訂單
    async function sentOrder() {
      if (
        !ordersInfo.recipientName ||
        !ordersInfo.recipientAdderss ||
        !ordersInfo.recipientPhone ||
        !ordersInfo.recipientMethod
      ) {
        swal({
          title: "請將表單資訊填寫完整",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }
      await axios
        .delete("http://localhost:8000/delete/carts")
        .then(async () => {
          let result = await axios.get("http://localhost:8000/carts");
          carData.value = result.data;
          total.value = 0;
        });
      document.querySelector(".pay-form").style.display = "none";
    }
    //刪除品項
    function deleteBtn(index) {
      if (carData.value.length <= 1) {
        swal({
          title: "已無法再減少商品",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }

      swal({
        icon: "info",
        title: "確定刪除嗎",
        buttons: {
          Btn: false,
          cancel: {
            text: "取消",
            visible: true,
          },
          danger: {
            text: "確定",
            visible: true,
          },
        },
      }).then(async (res) => {
        if (res) {
          console.log(res, "刪除");
          await axios
            .delete(`http://localhost:8000/delete/carts/${index}`)
            .then(async () => {
              let result = await axios.get("http://localhost:8000/carts");
              carData.value = result.data;
              total.value = 0;
              carData.value.forEach((element) => {
                total.value += element.price * element.quantity;
              });
            });
        }
      });
    }

    onMounted(async () => {
      let result = await axios.get("http://localhost:8000/carts");
      carData.value = result.data;
      carData.value.forEach((element) => {
        total.value += element.price * element.quantity;
      });
    });

    return {
      carData,
      total,
      submitCar,
      closeBtn,
      ordersInfo,
      sentOrder,
      deleteBtn,
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
table,
th,
tr,
td {
  border: 1px solid rgb(0, 0, 0);
  padding: 20px;
}
.buy-cart-container {
  padding-top: 150px;
  min-height: 1000px;
}
.buy-cart-table {
  margin: 0px auto;
  max-width: 1000px;
}
.graphics-text {
  display: flex;
  align-items: center;
}
.product-name img {
  float: left;
  width: 50%;
}
.product-name p {
  float: right;
}
.order-List td {
  text-align: center;
  vertical-align: middle;
}
td.total-price {
  text-align: end;
}
.pay-btn {
  text-align: center;
}
.pay-btn button {
  font-size: 20px;
  background-color: #07603fc4;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 50px 2px;
  cursor: pointer;
}
.pay-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  width: 500px;
  border: 1px solid black;
  font-size: 20px;
  display: none;
}
.pay-form h3 {
  margin-top: 10px;
  text-align: center;
}
#address,
#attention,
#attention-phone {
  font-size: 22px;
}

.pay-form div {
  margin-top: 50px;
  padding-left: 20px;
}
.finish-btn {
  margin-bottom: 20px;
  text-align: center;
}
.finish-btn button,
.form-btn {
  font-size: 20px;
  background-color: #07603fc4;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}

.cross-img img {
  float: right;
  margin-right: 25px;
}
.cross-img img:hover {
  cursor: pointer;
}
.methodFrash {
  display: flex;
  align-items: center;
}
.frash {
  width: 40px;
  cursor: pointer;
}
</style>

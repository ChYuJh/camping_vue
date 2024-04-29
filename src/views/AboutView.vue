<template>
  <div>
    <div class="about-page">
      <div class="about-banner">
        <img
          style="height: 900px; width: 100%"
          src="../assets/image/banner/5.jpg"
          alt=""
        />
      </div>

      <div class="about-intro">
        <h3>我們的服務特色：</h3>
        <div class="service-intro">
          <h4>1. 多樣化的露營用具</h4>
          <p>
            從帳篷、睡袋到露營炊具，我們提供多樣化的露營用品，滿足不同需求和場合。無論是單人探險還是家庭露營，我們都有適合您的器材。
          </p>
          <h4>2. 方便快捷的租借流程</h4>
          <p>
            我們致力於簡化租借流程，讓您能夠輕鬆租借所需用具。透過線上預訂系統，您可以輕鬆選擇您需要的器材，選擇租借日期，並在線上支付租金。我們的流程簡單迅速，讓您更專注於您的露營體驗。
          </p>
          <h4>3. 品質保證和清潔衛生</h4>
          <p>
            我們注重用具的品質和清潔，每件器材在租借前都會經過嚴格的檢查和清潔程序，以確保您在使用時享受到最佳的品質和衛生條件。
          </p>
          <h4>4. 隨時的客戶支援</h4>
          <p>
            無論您在租借過程中遇到什麼問題，我們隨時為您提供支援。我們的客戶服務團隊樂意回答您的問題，解決您的疑慮，確保您的露營體驗順利無憂。
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14561.550206181988!2d120.67327926232807!3d24.15813748280831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d61597adcef%3A0xbbef51b8cd9fc6f9!2zNDA05Y-w5Lit5biC5YyX5Y2A!5e0!3m2!1szh-TW!2stw!4v1704003014756!5m2!1szh-TW!2stw"
          width="600"
          height="700"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="about-form">
      <h3>聯絡我們</h3>
      <form action="">
        <div class="form-input">
          <label
            >姓名:
            <input type="text" v-model.lazy="fromData.name" />
          </label>
          <label
            >Email:
            <input type="email" v-model.lazy="fromData.email" />
          </label>
          <label
            >電話:
            <input type="text" v-model.lazy="fromData.phone" />
          </label>
        </div>
        <label class="message"
          >訊息:
          <textarea cols="10" rows="1" v-model.lazy="fromData.mes"></textarea>
        </label>
        <button type="button" @click="messageSubmit" class="form-btn">
          提交
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import swal from "sweetalert";
export default {
  name: "AboutInfo",
  setup() {
    let fromData = reactive({
      name: "",
      phone: "",
      mes: "",
    });

    watch(fromData, () => {
      let rules;
      if (fromData.name) {
        rules = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
        fromData.name = rules.test(fromData.name) ? fromData.name : "";
        if (!fromData.name) {
          swal({
            title: "請填入正確的姓名",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
      if (fromData.email) {
        rules = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        fromData.email = rules.test(fromData.email) ? fromData.email : "";
        if (!fromData.email) {
          swal({
            title: "請填入正確的信箱",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });

    let messageSubmit = () => {
      if (
        !fromData.email ||
        !fromData.name ||
        !fromData.phone ||
        !fromData.mes
      ) {
        swal({
          title: "請將表單資訊填寫完整",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }
      fromData.email = "";
      fromData.name = "";
      fromData.phone = "";
      fromData.mes = "";
      swal("成功送出表單", "我們將盡快回復您", "success");
    };

    return { fromData, messageSubmit };
  },
};
</script>

<style>
@font-face {
  font-family: GenJyuuGothicX;
  src: url("../fonts/GenJyuuGothicX-P-Normal.ttf");
}
body {
  font-family: GenJyuuGothicX;
}
/*關於我們*/
.about-intro {
  background-color: #aa9d7c;
  margin-top: 150px;
  position: relative;
  margin: 150px auto;
  max-width: 1500px;
}
.about-intro h3 {
  color: #47574c;
  font-size: 35px;
  padding: 20px;
  font-weight: bold;
  padding-bottom: 0;
}
.about-intro h4,
.about-intro p {
  font-weight: 600;
}

.service-intro {
  background-color: #aa9d7c;
  padding: 20px;
  max-width: 700px;
  margin: 10px 10px;
  display: inline-block;
}

iframe {
  position: absolute;
  top: -60px;
  right: 50px;
  width: 600px;
  height: 700px;
}

.service-intro h4 {
  margin: 20px 0;
}
.service-intro p {
  line-height: 1.5;
}
.about-banner img {
  position: relative;
  width: 100%;
  max-height: 500px;
}
.about-banner img,
.rule-banner img {
  position: relative;
}

.about-banner .banner-text,
.rule-banner .banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  background-color: #6a5b45;
  padding: 20px;
  color: #ffffff;
}

.about-form {
  min-height: 400px;
  padding: 50px 150px;
  background-image: url("../assets/image/camping/tent-campsite-woods.jpg");
  background-position: bottom;
}
.about-form h3 {
  color: #aa9d7c;
  font-size: 35px;
  text-align: center;
  margin: 20px;
  font-weight: bold;
}
.about-form form {
  color: #ffffff;
  background-color: transparent;
}
.about-form form input,
.message textarea {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ffffff;
  font-size: 20px;
  color: #ffffff;
}

.message {
  display: block;
  margin: 50px 0;
}
.message textarea {
  width: 100%;
  height: 30px;
  margin: 25px 0;
}
.about-form form input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ffffff;
}
.form-input {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.about-form form label input {
  margin: 25px;
  height: 30px;
  width: 200px;
  font-size: 20px;
  color: #ffffff;
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

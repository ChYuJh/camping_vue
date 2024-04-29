<template>
  <div>
    <div class="rule-banner">
      <img src="../assets/image/banner/4.png" alt="租借" />
    </div>
    <div class="contentrule">
      <button class="accordion" @click="accordion">1.租借流程：</button>
      <div class="panel">
        <p>顧客可透過線上平台選擇所需露營用具，選擇租借日期，完成預訂程序。</p>
        <p>確認： 系統將發送確認郵件，包含租借詳情、價格和取貨地點。</p>
        <p>支付： 顧客需在預訂後指定時間內完成支付，確保租借訂單生效。</p>
      </div>
      <button class="accordion" @click="accordion">2.租借期限：</button>
      <div class="panel">
        <p>起訖日期： 租借期限以預訂時選擇的開始和結束日期為準。</p>
        <p>超時： 若在租借期滿後未歸還，將產生額外費用。</p>
      </div>
      <button class="accordion" @click="accordion">3.預訂取消</button>
      <div class="panel">
        <p>
          取消政策： 顧客可在指定期限內取消預訂，取消後將扣除部分或全部租金。
        </p>
      </div>
      <button class="accordion" @click="accordion">4.保證金</button>
      <div class="panel">
        <p>
          保證金：
          部分租借物品可能需支付保證金，保證金將在歸還物品且無損壞的情況下全額退還。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useAccordion from "../hooks/accordion";
export default {
  name: "RuleView",
  setup() {
    let accordion = useAccordion;
    return { accordion };
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
.rule-content {
  border: 10px solid #aa9d7c;
  background-color: #ffffff;
  padding: 50px;
}
.rule-banner {
  position: relative;
}
.rule-banner img {
  width: 100%;
  max-height: 500px;
}

.contentrule {
  max-width: 1000px;
  margin: 50px auto 150px auto;
}
.accordion {
  background-color: #aa9d7c;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 20px;
  transition: 0.4s;
  font-weight: 600;
}

.active,
.accordion:hover {
  background-color: #aa9d7c;
  color: #f7f7f7;
}

.accordion:after {
  content: "\002B";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.panel p {
  padding: 10px;
  color: #444;
  font-size: 18px;
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

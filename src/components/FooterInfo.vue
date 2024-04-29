<template>
  <footer>
    <div className="footer-logo">
      <div className="logo-image">
        <img
          src="../assets/image/linkedin_banner_image_1.png"
          alt="linkedin_banner_image_1"
        />
      </div>
      <div className="pay-list">
        <img
          src="../assets/image/pay/1156722_finance_jcb_logo_payment_icon.png"
          alt=""
        />
        <img
          src="../assets/image/pay/294654_visa_icon.png"
          alt="1156722_finance_jcb_logo_payment_icon"
        />
        <img
          src="../assets/image/pay/380809_card_master_mastercard_icon.png"
          alt="380809_card_master_mastercard_icon"
        />
        <img
          src="../assets/image/pay/7123945_logo_pay_google_gpay_icon.png"
          alt="7123945_logo_pay_google_gpay_icon"
        />
        <img
          src="../assets/image/pay/8666205_apple_pay_icon.png"
          alt="8666205_apple_pay_icon"
        />
      </div>
    </div>
    <div className="footer-content">
      <h3>camping</h3>
      <ul className="meau">
        <li>
          <router-link to="/home">首頁</router-link>
        </li>
        <li>
          <router-link to="/product">所有商品</router-link>
        </li>
        <li>
          <router-link to="/rule">租借規範</router-link>
        </li>
        <li>
          <router-link to="/about">關於我們</router-link>
        </li>
      </ul>
    </div>
    <div className="footer-content">
      <h3>聯絡我們</h3>
      <p>台中市北區三民路5號</p>
      <p>TEL:(04)22194322</p>
      <p>E-mail:campingservice@gmail.com</p>
    </div>
    <div className="footer-content">
      <h3>營業時間</h3>
      <p>週一~週五: 8am-5pm</p>
      <p>週六~週日:10am-3pm</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterInfo",
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
footer {
  background-color: #47574c;
  display: flex;
  flex-wrap: wrap;
}
.footer-content {
  flex: 1 1 100px;
  margin: 0 10px;
  padding: 10px 50px;
}
.footer-content h3 {
  color: #ffffff;
  font-size: 22px;
  margin: 10px 0;
  font-weight: normal;
}
.footer-content p {
  color: #ffffff;
  margin-top: 15px;
}

.footer-logo {
  flex: 0 1 100px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
}
.logo-image img {
  width: 300px;
}
.pay-list {
  text-align: center;
  background-color: #ffffff;
}
.pay-list img {
  width: 40px;
}
.meau {
  list-style-type: none;
}
.meau li {
  margin-top: 15px;
}
.meau li a {
  text-decoration: none;
}
.meau li a:link,
.meau li a:visited {
  color: #ffffff;
}
#active-bottom {
  color: #c5a265;
}

.img-width {
  width: 100px;
}
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

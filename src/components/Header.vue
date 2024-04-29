<template>
  <nav>
    <div className="nav-container">
      <div className="logo">
        <img src="../assets/image/linkedin_banner_image_1.png" alt="banner" />
      </div>
      <ul className="nav-list">
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
      <div class="log-in">
        <router-link v-show="!userName" class="login-link" to="/login">
          登入/註冊</router-link
        >

        <div v-show="userName">
          <span class="account-name">Hi {{ userName }}</span>
          <a @click="logOut" class="log-out"> 登出 </a>
        </div>

        <router-link to="/buycart">
          <img
            class="shopping-cart"
            src="..//assets/image/icon/shopping-cart.png"
            alt="shopping-cart"
        /></router-link>
        <img
          class="menu-burger"
          src="../assets/image/icon/menu-burger.png"
          alt="menu-burger"
          @click="menuBurger"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "HeaderInfo",
  setup() {
    let userName = ref(null);
    //登出
    let logOut = () => {
      localStorage.removeItem("user");
      userName.value = "";
    };
    //漢堡選單
    let menuBurger = () => {
      const navList = document.querySelector(".nav-list");
      navList.classList.toggle("menu-show");
    };
    onMounted(() => {
      let userdata = localStorage.getItem("user");
      if (userdata) {
        userdata = JSON.parse(userdata);
        userName.value = userdata.userName;
      }
    });
    return { userName, logOut, menuBurger };
  },
};
</script>

<style scoped>
/* 導覽列 */
@font-face {
  font-family: GenJyuuGothicX;
  src: url("../fonts/GenJyuuGothicX-P-Normal.ttf");
}
body {
  font-family: GenJyuuGothicX;
}
nav {
  width: 100%;
  background-color: #47574c;
}
.nav-container {
  display: flex;
}
.logo img {
  height: 100px;
}
.nav-list {
  display: flex;
  list-style-type: none;
}
.nav-list li {
  text-align: center;
  align-self: center;
  margin: 25px;
  font-size: 20px;
}
.nav-list li a {
  text-decoration: none;
  padding: 20px 0;
}
.nav-list li a:link,
.nav-list li a:visited {
  color: #c5a265;
}
.nav-list li :hover {
  background-color: #6b6b6a;
  transition: background-color 0.3s linear;
}
.router-link-active {
  color: white !important;
}
.log-in {
  position: absolute;
  top: 0px;
  right: 20px;
}
.log-in a,
.log-in span {
  font-size: 20px;
  margin: 15px;
  text-decoration: none;
  float: left;
  color: #ffffff;
}
.log-in span,
.log-out {
  cursor: pointer;
}
.login-link:link,
.login-link:visited,
.log-out:link,
.log-out:visited {
  color: #c5a265;
}
.shopping-cart,
.menu-burger {
  width: 25px;
  float: left;
  margin: 0 5px;
}
.shopping-cart:hover,
.menu-burger:hover {
  cursor: pointer;
}
.menu-burger {
  display: none;
}

/* 導覽列結束 */
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

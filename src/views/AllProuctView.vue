<template>
  <div class="product-content">
    <div class="class-list">
      <h3>
        商品分類
        <img
          class="angle-down"
          src="../assets/image/icon/angle-down.png"
          alt="angle-dow"
          @click="angleDown"
        />
      </h3>
      <ul class="class-item">
        <li><router-link to="/product/cart">露營推車</router-link></li>
        <li><router-link to="/product/light">露營燈</router-link></li>
        <li><router-link to="/product/tables-chairs">桌椅組</router-link></li>
        <li><router-link to="/product/sleeping-pad">睡墊</router-link></li>
        <li><router-link to="/product/tent">帳篷</router-link></li>
        <li><router-link to="/product/keep-fresh">保鮮</router-link></li>
        <li><router-link to="/product/other">其他</router-link></li>
      </ul>
    </div>
    <div class="product">
      <h3>所有商品</h3>

      <ul class="product-card-first product-list">
        <li v-for="item in data" :key="item.id" class="product-card">
          <router-link
            :to="{
              name: 'productInfo',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              :src="require(`../assets${item.url_image}`)"
              :alt="item.product"
            />
            <h3>{{ item.product }}</h3>
            <p>{{ item.priceStr }}</p>
            <div class="product-btn">預約</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import productList from "../hooks/productList";
export default {
  name: "ProductInfo",
  props: ["class"],
  setup(props) {
    console.log(props);
    let data = productList();

    //RWD分類列表
    let angleDown = () => {
      const angleDown = document.querySelector(".class-item");
      angleDown.classList.toggle("show");
    };
    return { data, angleDown };
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
/* 所有商品 */
.product-content {
  display: flex;
  min-height: 1500px;
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
  list-style-image: url("../assets/image/icon/angle-right.png");
  background-color: #6a5b45;
  padding-left: 29px;
}
.class-item li {
  border-bottom: 1px solid rgb(201, 201, 201);
}
.class-item li:hover {
  background-color: #e0c091;
  transition: background-color 0.3s linear;
}
.class-item li a {
  text-decoration: none;
  display: block;
  color: #ffffff;
  padding: 15px;
  cursor: pointer;
}
.class-item li a:link,
.class-item li a:visited {
  color: #ffffff;
}
.product {
  flex: 8 1 100px;
  margin-top: 200px;
}
.product h3:first-child {
  color: #47574c;
  font-weight: bold;
  font-size: 22px;
  margin-left: 20px;
  border-left: 12px solid #47574c;
  padding: 10px;
}
.product-card-first {
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1000px;
}

li.product-card {
  background-color: #47574c;
  text-align: center;
  font-size: 20px;
  border: 1px solid rgba(195, 195, 195, 0.171);
  box-shadow: 5px 2px 5px 2px rgb(142, 142, 142);
  border-radius: 0 0 20px 20px;
  transition: transform 0.6s linear;
  transform: scale(0.8, 0.8);
}
.product-card a {
  font-weight: bold;
  text-decoration: none;
}

.product-card a:link,
.product-card a:visited {
  color: #ffffff;
}
.product-card:hover {
  transition: transform 0.8s linear;
  transform: scale(0.9, 0.9);
}

.product-card img {
  max-width: 300px;
  background-color: #ffffff;
}
.product-card h3 {
  padding-top: 20px;
}
.product-card p {
  padding-top: 20px;
}
.product-btn {
  background-color: #b2a582;
  margin-top: 20px;
  padding: 20px;
  margin-bottom: 15px;
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

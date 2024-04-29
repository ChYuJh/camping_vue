<template>
  <div class="login-background">
    <div class="login-page">
      <div class="login-page-btn">
        <button class="login-btn" id="defaultOpen" @click="openPage('login')">
          登入
        </button>
        <button class="singup-btn" @click="openPage('singup')">註冊</button>
      </div>

      <div id="login" class="inputcontent" style="vertical-align: middle">
        <h3>登入帳號</h3>
        <form>
          <div>
            <label for="login-account-input">信箱 </label>
            <input
              id="login-account-input"
              type="email"
              v-model.lazy="logInUser.userEmail"
            />
          </div>
          <label for="login-password-input">密碼 </label>
          <input
            id="login-password-input"
            type="password"
            v-model.lazy="logInUser.userPassword"
          />
          <div>
            <button @click="loginBtn" type="button" class="login-go-btn">
              登入
            </button>
          </div>
        </form>
      </div>

      <div id="singup" class="inputcontent">
        <h3>註冊帳號</h3>
        <form action="">
          <div>
            <label for="singup-name-input">姓名 </label>
            <input
              id="singup-name-input"
              type="text"
              v-model="register.userName"
            />
          </div>
          <div>
            <label for="singup-account-input">信箱 </label>
            <input
              id="singup-account-input"
              type="email"
              v-model.lazy="register.email"
            />
          </div>
          <label for="singup-password-input">密碼 </label>
          <input
            id="singup-password-input"
            type="password"
            v-model.lazy="register.password"
          />
          <div>
            <button type="button" class="singup-go-btn" @click="submitRegister">
              註冊
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from "vue";
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "LoginView",
  setup() {
    let register = reactive({
      email: "",
      userName: "",
      password: "",
    });

    let logInUser = reactive({
      userEmail: "",
      userPassword: "",
    });

    watch(register, (newValue) => {
      let rules;
      if (newValue.email) {
        rules = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        newValue.email = rules.test(newValue.email) ? newValue.email : "";
        if (!newValue.email) {
          swal({
            title: "請輸入正確的信箱",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
      if (newValue.password) {
        rules = new RegExp(/^[a-zA-Z0-9@]{5,}$/);
        newValue.password = rules.test(newValue.password)
          ? newValue.password
          : "";
        if (!newValue.password) {
          swal({
            title: "密碼只接受英文字母、數字和@符號且不得少於5個字元",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });

    let submitRegister = async () => {
      if (!register.email || !register.password || !register.userName) {
        swal({
          title: "請完整填寫註冊資訊",
          icon: "warning",
          dangerMode: true,
        });
      } else {
        let severData = {
          registerName: register.userName,
          email: register.email,
          password: register.password,
        };
        let config = {
          headers: {
            "content-type": "application/json",
          },
        };
        await axios
          .post("http://localhost:8000/user/create", severData, config)
          .then(() => {
            swal("註冊成功", "註冊", "success");
            document.getElementById("defaultOpen").click();
          });
      }
    };

    let loginBtn = async () => {
      let result = await axios.get("http://localhost:8000/user/login");
      for (let i = 0; i < result.data.length; i++) {
        if (
          result.data[i].useremail === logInUser.userEmail &&
          result.data[i].userpassword === logInUser.userPassword
        ) {
          let userobj = JSON.stringify({
            userName: result.data[i].userName,
          });
          localStorage.setItem("user", userobj);
          window.location.replace("./home");
          return;
        } else if (
          result.data[i].useremail === logInUser.userEmail &&
          result.data[i].userpassword !== logInUser.userPassword
        ) {
          swal({
            title: "信箱或密碼輸入錯誤",
            icon: "warning",
            dangerMode: true,
          });
          return;
        } else if (
          logInUser.userEmail === "" ||
          logInUser.userPassword === ""
        ) {
          swal({
            title: "請填入信箱與密碼",
            icon: "warning",
            dangerMode: true,
          });
          return;
        }
      }
      swal({
        title: "帳號不存在",
        icon: "warning",
        dangerMode: true,
      });
    };

    function openPage(pageName) {
      let i, tabcontent;
      tabcontent = document.getElementsByClassName("inputcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        let a = tabcontent[i].id + "-btn";
        document.querySelector(`.${a}`).style.backgroundColor = "gray";
      }
      document.getElementById(pageName).style.display = "block";
      let b = pageName + "-btn";
      document.querySelector(`.${b}`).style.backgroundColor = "black";
    }

    onMounted(() => {
      document.getElementById("defaultOpen").click();
    });
    return { openPage, register, logInUser, submitRegister, loginBtn };
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
.login-background {
  background-image: url(../assets/image/af3783a9e2ed2b7e26f982a276e2990c.jpg);
}
.login-background {
  border: 1px solid transparent;
}
.login-page {
  max-width: 700px;
  height: 500px;
  text-align: center;
  background-color: rgba(122, 122, 122, 0.679);
  position: relative;
  background-color: rgba(255, 255, 255, 0.925);
  margin: 250px auto;
}
.login-page h3 {
  margin: 25px 0;
  font-size: 30px;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.login-btn,
.singup-btn {
  padding: 10px 0 10px 0;
  border: none;

  margin: 0;
  width: 50%;
  font-size: 22px;
  background-color: rgb(1, 1, 1);
  color: floralwhite;
}
.login-btn {
  position: absolute;
  left: 0;
  top: -10px;
  border-radius: 15px 0 0 0;
}
.singup-btn {
  position: absolute;
  right: 0;
  top: -10px;
  border-radius: 0 15px 0 0;
}
#login,
#singup {
  text-align: center;
}
#login label,
#singup label {
  vertical-align: middle;
  line-height: 30px;
  padding: 0 10px;
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}
#login-account-input,
#login-password-input,
#singup-account-input,
#singup-password-input,
#singup-name-input {
  height: 50px;
  margin-top: 15px;
  width: 50%;
  font-size: 20px;
}

#login,
#singup {
  padding-top: 50px;
}
.login-go-btn,
.singup-go-btn {
  margin-top: 50px;
  font-size: 25px;
  background-color: #010a04;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;

  cursor: pointer;
}
.inputcontent {
  vertical-align: middle;
}
</style>

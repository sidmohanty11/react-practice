<template>
  <div class="login">
    <h1>CONVO.</h1>
    <h2>Signup</h2>
    <input type="text" placeholder="username" v-model="username" />
    <input type="text" placeholder="name" v-model="name" />
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <input type="text" placeholder="image_url" v-model="image_url" />
    <p>
      Already have an account? <router-link to="/login">Login.</router-link>
    </p>
    <button @click="signup"><i class="fas fa-arrow-right"></i></button>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      username: "",
      image_url: "",
    };
  },
  methods: {
    async signup() {
      const { email, password, name, username, image_url } = this;
      const res = await axios.post("/signup", {
        email,
        password,
        name,
        username,
        image_url,
      });
      if (res.status === 201) {
        this.$router.push("/login");
      } else {
        console.log("error bro");
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: grid;
  place-items: center;
}
h1 {
  font-size: 60px;
  background: #fff;
  background: -webkit-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: -moz-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: linear-gradient(to right, #fff 0%, #cf1512 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h2 {
  font-size: 40px;
}
input {
  width: 80%;
  height: 10px;
  padding: 15px;
  margin: 5px;
  border-radius: 6px;
}
button {
  padding: 20px;
  margin: 10px;
  border-radius: 100%;
  border: none;
  color: whitesmoke;
  background-color: #b10e0b;
  cursor: pointer;
}
a {
  color: #b10e0b;
  font-weight: 600;
}
</style>
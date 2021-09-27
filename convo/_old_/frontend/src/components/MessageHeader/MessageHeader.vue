<template>
  <div>
    <router-link to="/"><i class="fas fa-chevron-left"></i>Back</router-link>
    <div class="header">
      <!-- <img class="user-image" :src="userTo.image_url" :alt="userTo.username" /> -->
      <h1>@{{ userTo }}</h1>
      <!-- <span
        ><i class="fas fa-circle"></i>
        {{ new Date(userTo.last_seen).getMinutes() }} mins ago</span
      > -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userTo: {
      default: "",
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-height: 70px;
  margin-bottom: 10px;
}
span {
  color: green;
}
a {
  font-weight: 600;
  background: #fff;
  background: -webkit-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: -moz-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: linear-gradient(to right, #fff 0%, #cf1512 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.user-image {
  max-height: 50px;
  width: 50px;
  border-radius: 100%;
}
</style>
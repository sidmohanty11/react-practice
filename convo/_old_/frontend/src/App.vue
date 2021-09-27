<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nixie+One&display=swap");
body {
  background-color: black;
  margin: 0;
  padding: 0;
  font-size: 1em;
  color: white;
  font-family: "Nixie One", cursive;
}

.container {
  background-color: #333;
  height: 100vh;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: auto;
  overflow: hidden;
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: #eee;
  outline: none;
}
</style>

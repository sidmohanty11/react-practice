<template>
  <div class="container">
    <img class="user-image" src="" />
    <button @click="pushFunc(room.room_name)" class="chat-component">
      @{{ room.room_name }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["room", "pushFunc"],
};
</script>

<style scoped>
.container {
  max-height: 57px;
  margin: 10px;
  padding: 10px;
  width: 90%;
  border-radius: 7px;
  display: flex;
  background-color: #222;
  transition: 0.5s;
}

.container:hover {
  background-color: #b10e0b;
}

.chat-component {
  border: none;
  width: 76%;
  font-size: 20px;
  color: whitesmoke;
  background-color: transparent;
  font-family: "Nixie One", cursive;
  cursor: pointer;
}
.user-image {
  max-height: 50px;
  width: 50px;
  border-radius: 100%;
}
</style>
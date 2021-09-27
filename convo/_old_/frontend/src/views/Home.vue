<template>
  <div class="home">
    <router-link to="/login"
      ><i class="fas fa-chevron-left"
        ><span class="span"> Back</span></i
      ></router-link
    >
    <h1 style="font-size: 28px">
      Welcome to <span class="span">Convo!</span> @{{ user?.username }}
    </h1>
    <div class="search">
      <input class="search-input" placeholder="Search" />
    </div>
    <ChatComponent
      v-for="room in user.rooms"
      :key="room.id"
      :room="room"
      :pushFunc="pushFunc"
    />

    <div class="add-chat">
      <button @click="addChat" class="add-chat-icon">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ChatComponent from "../components/ChatComponent/ChatComponent.vue";
import axios from "../axios";
export default {
  name: "Home",
  components: {
    ChatComponent,
  },
  data() {
    return {
      user: {},
      chats: [],
    };
  },
  methods: {
    pushFunc(id) {
      this.$router.push(`/messages/${id}`);
    },
    async addChat() {
      const token = sessionStorage.getItem("token");
      const room_name = prompt("Who do you want to chat with?");
      if (room_name) {
        const res = await axios.post(
          "/room",
          {
            room_name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res);
        // if (res) {
        //   this.pushFunc(res.data.to);
        // }
      } else {
        console.log("error bro");
      }
    },
  },
  async created() {
    const token = sessionStorage.getItem("token");
    const res = await axios.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.user = res.data;
  },
};
</script>

<style scoped>
.home {
  margin: 10px;
  padding: 10px;
}

.addChat {
  margin: 0 auto;
}

.add-chat-icon {
  position: absolute;
  padding: 20px;
  margin: 10px;
  border-radius: 100%;
  border: none;
  top: 85%;
  left: 80%;
  background-color: #b10e0b;
  cursor: pointer;
}

.search {
  display: grid;
  place-items: center;
}

.search-input {
  width: 80%;
  height: 10px;
  padding: 15px;
  margin: 5px;
  border-radius: 6px;
}

i {
  color: whitesmoke;
}

.span {
  background: #fff;
  background: -webkit-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: -moz-linear-gradient(to right, #fff 0%, #cf1512 100%);
  background: linear-gradient(to right, #fff 0%, #cf1512 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
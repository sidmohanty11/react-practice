<template>
  <div class="container">
    <MessageHeader :userTo="roomName" />
    <main>
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.from === user.username" class="chat right">
          <p>{{ message.message }}</p>
          <span class="timestamp">{{ message.sent_at }}</span>
        </div>
        <div v-else class="chat left">
          <p>{{ message.message }}</p>
          <span class="timestamp">{{ message.sent_at }}</span>
        </div>
      </div>
    </main>
    <ChatInput :userFrom="user.username" :userTo="roomName" />
  </div>
</template>

<script>
import MessageHeader from "../components/MessageHeader/MessageHeader.vue";
import ChatInput from "../components/ChatInput/ChatInput.vue";
import axios from "../axios";
import Pusher from "pusher-js";
export default {
  data() {
    return {
      user: {},
      messages: [],
      roomName: "",
      paramId: this.$route.params.id,
    };
  },
  components: {
    MessageHeader,
    ChatInput,
  },
  async created() {
    // const pusher = new Pusher(process.env.VUE_APP_PUSHER_API_CONFIG, {
    //   cluster: "ap2",
    // });

    // const channel = pusher.subscribe("my-channel");
    // channel.bind("my-event", function (data) {
    //   realtime(data.message);
    // });

    // const realtime = (data) => {
    //   this.messages.push(data);
    // };
    const token = sessionStorage.getItem("token");
    try {
      const res = await axios.get(`/room/${this.paramId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res && res.status == 200) {
        this.user = res2.data;
        this.roomName = res.data.room_name;
        this.messages = res.data.messages;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  margin: 10px;
}

main {
  background-image: url("../assets/bg1.jpg");
  max-height: 1000px;
  min-height: 770px;
  width: 92%;
  overflow-y: scroll;
}

main::-webkit-scrollbar {
  display: none;
}

main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.chat {
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
}
.right {
  margin-left: auto;
  background-color: #641220;
  color: whitesmoke;
}

.left {
  background-color: black;
  text-align: left;
}

.timestamp {
  color: whitesmoke;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
}
</style>
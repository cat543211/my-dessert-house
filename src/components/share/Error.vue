<template>
<div class="error_area">
  <div class="error bg-danger" v-for="(msg, key) in messages" :key="key">
    <div class="close" @click.prevent="closeMsg(key)">
      <i class="fas fa-times"></i>
    </div>
    <p>{{ msg.msg }}</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    getMsg(msg) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        msg,
        timestamp,
      });

      this.setTime(timestamp);
    },
    closeMsg(item) {
      this.messages.splice(item, 1);
    },
    setTime(item) {
      setTimeout(() => {
        this.messages.forEach((msg, i) => {
          const isTimestampMatch = item === msg.timestamp;
          if (isTimestampMatch) { this.messages.splice(i, 1); }
        });
      }, 3000);
    },
  },
  created() {
    this.$bus.$on('showError', (msg) => {
      this.getMsg(msg);
    });
  },
};
</script>

<style scoped>
.error_area {
  position: fixed;
  top: 56px;
  right: 20px;
  z-index: 1100;
}

.error {
  max-width: 500px;
  min-width: 100px;
  margin-top: 20px;
}

.close,
p {
  display: inline-block;
  margin: 20px 20px;
}
</style>

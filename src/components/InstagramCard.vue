<template>
  <div class="card">
    <div class="card-header text-left">{{ info.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted text-left">
      {{ postedFromNow }}
    </div>
  </div>
</template>

<script>
import moment from "moment"; // za timestamp 03556 u time value
export default {
  props: ["info"],
  data() {
    return {
      postedFromNow2: "ok from data",
    };
  },
  name: "InstagramCard",
  computed: {
    postedFromNow() {
      //moze koristit data i modificirat podatke
      return moment(this.info.time).fromNow();
    },
  },
};
</script>

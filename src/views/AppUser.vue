<template>
  <div id="user">
    <router-view></router-view>
  </div>
</template>

<script>
// import SignIn from "@/components/user/SignIn.vue";

export default {
  name: "AppUser",
  components: {
    // SignIn,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>

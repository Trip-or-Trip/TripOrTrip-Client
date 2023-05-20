<template>
  <div id="mypage">
    <div class="row">
      <div id="left-container" class="col-3"></div>
      <div id="right-container" class="col-9"></div>
    </div>
    <!-- <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <router-view name="mypagecategory"></router-view>
        </b-col>
        <b-col>
          <router-view name="mypagedetail"></router-view>
        </b-col>
      </b-row>
    </b-container> -->
  </div>
</template>

<script>
export default {
  name: "AppMypage",
};
</script>

<style scoped>
#left-container {
  background-color: red;
  height: 100vh;
}
#right-container {
  background-color: blue;
  height: 100vh;
}
</style>

<template>
  <div id="mypage">
    <div class="row">
      <div id="left-container" class="col-3">
        <mypage-category></mypage-category>
      </div>
      <div id="right-container" class="col-9">
        <router-view></router-view>
      </div>
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
import MypageCategory from "@/components/mypage/MypageCategory";
export default {
  components: { MypageCategory },
  name: "AppMypage",
};
</script>

<style scoped>
/* #left-container {
  height: 80vh;
} */
#right-container {
  border: 1px solid blue;
  height: 100%;
}
</style>

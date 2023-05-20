<template>
  <div id="mypage">
    <div class="row">
      <div id="left-container" class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-11">
        <mypage-category></mypage-category>
      </div>
      <div id="right-container" class="col-xxl-8 col-xl-8 col-lg-8 col-md-7 col-sm-11">
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
#left-container {
  margin: 0;
  padding: 0;
  margin-left: 3rem;
}
#right-container {
  margin: 0;
  padding: 0;
}
</style>

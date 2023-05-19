<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <router-view name="mypagecategory"></router-view>
        </b-col>
        <b-col>
          <router-view name="mypagedetail"></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AppMypage",
};
</script>

<style scoped></style>

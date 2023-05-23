<template>
  <div id="result-list-item">
    <div class="result-content py-1">
      <div class="d-flex">
        <div>
          <img class="result-img" :src="require('@/assets/img/noimage.png')" />
        </div>
        <div class="flex-grow-1">
          <div class="align-self-center">
            <div style="font-size: 0.9rem">
              <b>{{ result.place_name }}</b>
            </div>
            <div style="font-size: 0.8rem">{{ result.address_name }}</div>
            <button type="button" @click="clickDetailResult(result, $event)" class="btn btn-sm place-btn">자세히 보기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanList",
  props: {
    result: Object,
  },
  components: {},
  methods: {
    clickDetailResult(place) {
      this.$emit("makeCustomOverlay", place);
    },
  },
};
</script>

<style>
.result-content {
  border: 1px solid lightgray;
}
.result-img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}
.place-btn {
  font-size: 0.7rem;
  width: 4.5rem;
  height: 1.4rem;
  background-color: #dee4e9;
}
.place-btn:hover {
  /* font-size: 0.7rem;
  width: 4.5rem;
  height: 1.4rem; */
  background-color: #c9d1da;
}
</style>

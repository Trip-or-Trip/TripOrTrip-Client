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
            <button type="button" class="btn btn-sm place-btn">위치 보기</button>
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
  width: 4rem;
  height: 1.4rem;
  background-color: #dee4e9;
}
</style>

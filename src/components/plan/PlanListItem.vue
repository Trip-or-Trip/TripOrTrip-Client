<template>
  <div id="plan-list-item">
    <div class="place-content py-1">
      <div class="d-flex">
        <div>
          <img class="place-img" :src="require('@/assets/img/noimage.png')" />
        </div>
        <div class="flex-grow-1">
          <div class="align-self-center" style="position: relative">
            <div style="font-size: 0.9rem">
              <b>{{ place.place_name }}</b>
            </div>
            <div style="position: absolute; top: -3px; right: 5px">
              <i @click="clickRemoveBtn(index, place, $event)" class="cancel-btn bi bi-x-circle-fill" style="font-size: 1.1rem"></i>
            </div>
            <div style="font-size: 0.8rem">{{ place.address_name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="index != total - 1" class="text-center my-1">
      <img :src="require('@/assets/img/arrows_down.png')" height="32px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanListItem",
  props: {
    place: Object,
    index: Number,
    total: Number,
  },
  created() {
    console.log(this.place);
  },
  methods: {
    clickRemoveBtn(index, place) {
      this.$emit("removeItem", index, place);
    },
  },
};
</script>

<style>
.place-content {
  border: 1px solid lightgray;
}
.place-img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}
.arrow-iamge {
  width: 1rem;
  height: 1rem;
  object-fit: cover;
}
</style>

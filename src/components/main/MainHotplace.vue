<template>
  <div id="main-hotplace">
    <div id="hotplace-list" class="col-lg-4 col-md-5">
      <div class="mb-2">
        <h4>핫플레이스</h4>
      </div>
      <div v-if="hotplaces && hotplaces.length">
        <b-carousel id="carousel-1" :interval="4000" controls indicators background="#FFFFFF" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333; height: 30rem; align: center">
          <b-carousel-slide v-for="hotplace in hotplaces" :key="hotplace.num" width="100%" height="100%" style="height: 30rem; object-fit: cover" :img-src="`/upload/hotplace/${hotplace.image}`" :caption="hotplace.title" :text="hotplace.desc">
            #{{ hotplace.tag1 }} #{{ hotplace.tag2 }} <br />
            <b-button :href="`${hotplace.mapUrl}`" variant="primary">지도 검색</b-button>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div v-else>
        <h4>등록된 핫플레이스가 없습니다.</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHotplace",
  props: {
    hotplaces: Object,
  },
  created() {
    console.log("created: ", this.hotplaces);
  },
};
</script>

<style></style>

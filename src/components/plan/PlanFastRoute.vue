<template>
  <div id="plan-fast-route">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="modal-dialog">
        <div class="modal-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanFastRoute",
};
</script>

<style scoped>
#plan-fast-route,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  width: 80%;
  max-width: 70rem;
  height: 42rem;
  margin: auto;
  margin-top: 10rem;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
  overflow-y: auto;
}
</style>

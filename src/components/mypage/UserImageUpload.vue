<template>
  <div class="upload-image">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header mb-3">
            <h5 class="modal-title">프로필 업로드</h5>
            <button type="button" @click="$emit('close-modal')" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center form-group-row">
              <div class="col-7 mt-3">
                <input type="file" @change="upload" accept="image/*" class="form-control my-3" />
              </div>
              <div class="col-3 mt-3">
                <button type="button" @click="selectProfile" class="btn submit-btn my-3" style="width: 100%">선택</button>
              </div>
            </div>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <div id="img-container">
              <div v-if="!image" class="align-self-center text-center my-5">이미지가 표시됩니다.</div>
              <img v-else class="p-5" :src="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserImageUpload",
  data() {
    return {
      image: "",
    };
  },
  methods: {
    upload(e) {
      var file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.image = url;
    },
    selectProfile() {
      if (!this.image) {
        alert("사진을 선택해 주세요.");
        return;
      }
    },
  },
};
</script>

<style scoped>
#hotplace-search,
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
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 7rem;
  width: 70%;
  max-width: 70rem;
  /* margin-top: 10rem; */
  padding: 20px;
  background-color: white;
  z-index: 10;
  opacity: 1;
}
#img-container {
  max-width: 500px;
  max-height: 40rem;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
}
.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
  color: white;
}
</style>

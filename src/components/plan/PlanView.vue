<template>
  <div class="regist">
    <h1 class="underline">여행계획 상세보기</h1>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ article.article.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="fw-bold">{{ article.article.userId }}</span> <br />
              <span class="text-secondary fw-light">
                {{ article.article.createdAt }} 조회 : {{ article.article.hit }}
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
        <div class="divider mb-3"></div>
        <div class="container">
          <div class="row">
            <!-- kakao map 보여주기 -->
            <div
              id="map"
              class="col-md-8 shadow rounded mx-auto p-2 mb-2"
              style="height: 25em"
            ></div>
            <c:forEach items="${places}" var="place" varStatus="status">
              <div class="border border-4 rounded me-1 p-2" style="width: 20%; display: none">
                <div class="travel-info">
                  <strong id="old_place_name" class="old_place_name" style="display: none"
                    >${place.name}</strong
                  >
                  <p id="old_address" class="old_address" style="display: none">${place.address}</p>
                  <div id="old_lat" class="old_lat" style="display: none">${place.lat}</div>
                  <div id="old_lng" class="old_lng" style="display: none">${place.lng}</div>
                  <div id="old_img" class="old_img" style="display: none">${place.imageUrl}</div>
                </div>
              </div>
            </c:forEach>
            <!-- kakao map 영역 끝 -->
            <div class="plan-box container col-md-4" style="height: 25em">
              <div class="row">
                <div class="col-md-6">
                  <label for="register-id">등록자</label>
                  <input
                    id="register-id"
                    type="text"
                    readonly="readonly"
                    v-bind:value="article.article.userId"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="register-date">등록일</label>
                  <input
                    id="register-date"
                    type="text"
                    readonly="readonly"
                    v-bind:value="article.article.createdAt"
                    class="form-control"
                  />
                </div>
              </div>
              <label for="plan-title">계획 이름</label>
              <input
                id="plan-title"
                type="text"
                readonly="readonly"
                v-bind:value="article.article.title"
                class="form-control"
              />
              <div class="row">
                <div class="col-md-6">
                  <label for="plan-start-date">출발일</label>
                  <input
                    id="plan-start-date"
                    type="text"
                    readonly="readonly"
                    v-bind:value="article.article.startDate"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label for="plan-end-date">도착일</label>
                  <input
                    id="plan-end-date"
                    type="text"
                    readonly="readonly"
                    v-bind:value="article.article.endDate"
                    class="form-control"
                  />
                </div>
              </div>
              <label for="plan-description">계획 상세</label>
              <input
                id="plan-description"
                type="text"
                readonly="readonly"
                v-bind:value="article.article.description"
                class="form-control overflow-auto"
                style="height: 10em"
              />
            </div>
          </div>
        </div>
        <div class="divider mb-4"></div>
        <h2 align="center">추천 경로</h2>
        <div
          id="planmap"
          class="col-md-8 shadow rounded mx-auto p-2 mb-2"
          style="height: 25em"
        ></div>
        <div>
          <div
            class="d-flex center flex-row"
            v-for="(fastPlace, index) in article.fastPlaces"
            v-bind:key="fastPlace.id"
          >
            <div class="border border-4 rounded me-1 p-2" style="width: 20%">
              <div class="travel-info">
                <strong id="fast_place_name" class="fast_place_name">{{ fastPlace.name }}</strong>
                <p id="fast_address" class="fast_address">{{ fastPlace.address }}</p>
                <div id="fast_lat" class="fast_lat" style="display: none">{{ fastPlace.lat }}</div>
                <div id="fast_lng" class="fast_lng" style="display: none">{{ fastPlace.lng }}</div>
                <div id="fast_img" class="fast_img" style="display: none">
                  {{ fastPlace.imageUrl }}
                </div>
              </div>
            </div>
            <div
              v-if="index != article.fastPlaces.length - 1"
              class="d-flex align-items-center"
              style="width: 20%"
            >
              <img
                :src="require('@/assets/icon/arrows.png')"
                @error="require('@/assets/noimage.png')"
                style="width: 100%"
                class="me-2"
              />
            </div>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="align-middle">
          <h2>타임 라인</h2>
          <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="fastPlace in article.fastPlaces"
                v-bind:key="fastPlace.id"
                :img-src="fastPlace.imageUrl"
                :caption="fastPlace.name"
                :text="fastPlace.address"
              >
              </b-carousel-slide>
            </b-carousel>
          </div>
          <div v-for="(fastPlace, index) in article.fastPlaces" v-bind:key="fastPlace.id">
            <div v-if="index % 2 == 0" class="mb-2 container row" style="margin: 100 auto">
              <div
                class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded"
                style="width: 50%; margin: 0 auto"
              >
                <img
                  v-if="fastPlace.imageUrl == '/' || fastPlace.imageUrl == 'undefined'"
                  :src="require('@/assets/logo.png')"
                  @error="
                    {
                      {
                        fastPlace.name;
                      }
                    }
                  "
                  style="width: 50%"
                  class="me-2"
                />
                <img
                  v-else
                  :src="fastPlace.imageUrl"
                  :alt="fastPlace.name"
                  style="width: 50%"
                  class="me-2"
                />
                <div class="travel-info">
                  <h2 class="place_name">{{ fastPlace.name }}</h2>
                  <p class="address">{{ fastPlace.address }}</p>
                  <div class="lat" style="display: none">{{ fastPlace.lat }}</div>
                  <div class="lng" style="display: none">{{ fastPlace.lng }}</div>
                </div>
              </div>
              <div class="col-md-4" style="width: 10em"></div>
            </div>

            <div v-else class="mb-2 row">
              <div
                class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded"
                style="width: 50%; margin: 0 auto"
              >
                <img
                  v-if="fastPlace.imageUrl == '/' || fastPlace.imageUrl == 'undefined'"
                  :src="require('@/assets/logo.png')"
                  @error="
                    {
                      {
                        fastPlace.name;
                      }
                    }
                  "
                  style="width: 50%"
                  class="me-2"
                />
                <img
                  v-else
                  :src="fastPlace.imageUrl"
                  :alt="fastPlace.name"
                  style="width: 50%"
                  class="me-2"
                />
                <div class="travel-info">
                  <h2 class="place_name">{{ fastPlace.name }}</h2>
                  <p class="address">{{ fastPlace.address }}</p>
                  <div class="lat" style="display: none">{{ fastPlace.lat }}</div>
                  <div class="lng" style="display: none">{{ fastPlace.lng }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <!-- 본인일때만 글수정, 글 삭제 버튼 보이도록 함 -->
            <div style="padding-top: 15px">
              <button class="btn" @click="moveModifyArticle">수정</button>
              <button class="btn" @click="deleteArticle">삭제</button>
              <button class="btn" @click="moveList">목록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "PlanView",
  data() {
    return {
      articleno: Number,
      article: Object,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno);
    http.get(`/plan/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      alert("서비스 준비중입니다.");
      // console.log("글수정 하러가자!!!");
      // this.$router.push({ name: "planmodify", params: { articleno: this.article.id } });
    },
    deleteArticle() {
      this.$router.push({ name: "plandelete", params: { articleno: this.article.id } });
    },
    moveList() {
      this.$router.push({ name: "planlist" });
    },
  },
};
</script>

<style></style>

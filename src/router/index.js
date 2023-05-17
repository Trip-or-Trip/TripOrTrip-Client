import Vue from "vue";
import VueRouter from "vue-router";
// views
import AppMain from "@/views/AppMain";
import AppUser from "@/views/AppUser";
// import AppUser from "@/views/AppUser.vue";
// import AppBoard from "@/views/AppBoard.vue";
// import AppNotice from "@/views/AppNotice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
  },
  {
    path: "/user",
    name: "user",
    component: AppUser,
    children: [
      {
        path: "signin",
        name: "signin",
        component: () => import(/* webpackChunkName: "user" */ "@/components/user/SignIn"),
      },
      {
        path: "signup",
        name: "signup",
        component: () => import(/* webpackChunkName: "user" */ "@/components/user/SignUp"),
      },
    ],
  },
  {
    path: "/board/",
    name: "board",
    // component: AppBoard,
    component: () => import(/* webpackChunkName: "board" */ "../views/AppBoard"),
    // redirect: "/board",
    children: [
      {
        path: "",
        name: "boardlist",
        // component: BoardList,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",
        // component: BoardWrite,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardWrite"),
      },
      {
        path: ":articleno",
        name: "boardview",
        // component: BoardView,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardView"),
      },
      {
        path: "",
        name: "boardmodify",
        // component: BoardModify,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardModify"),
      },
      {
        path: "",
        name: "boarddelete",
        // component: BoardDelete,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardDelete"),
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    // component: AppNotice,
    component: () => import(/* webpackChunkName: "notice" */ "../views/AppNotice"),
    // redirect: "/notice/list",
    children: [
      {
        path: "",
        name: "noticelist",
        // component: NoticeList,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeList"),
      },
      {
        path: "",
        name: "noticewrite",
        // component: NoticeWrite,
        component: () =>
          import(/* webpackChunkName: "notice" */ "../components/notice/NoticeWrite"),
      },
      {
        path: ":articleno",
        name: "noticeview",
        // component: NoticeView,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeView"),
      },
      {
        path: "",
        name: "noticemodify",
        // component: NoticeModify,
        component: () =>
          import(/* webpackChunkName: "notice" */ "../components/notice/NoticeModify"),
      },
      {
        path: "",
        name: "noticedelete",
        // component: NoticeDelete,
        component: () =>
          import(/* webpackChunkName: "notice" */ "../components/notice/NoticeDelete"),
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "plan" */ "../views/AppPlan"),
    // redirect: "/plan",
    children: [
      {
        path: "",
        name: "planlist",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanList"),
      },
      {
        path: "",
        name: "planwrite",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanWrite"),
      },
      {
        path: ":articleno",
        name: "planview",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanView"),
      },
      {
        path: "",
        name: "planmodify",
        // component: NoticeModify,
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanModify"),
      },
      {
        path: "",
        name: "plandelete",
        // component: NoticeDelete,
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanDelete"),
      },
    ],
  },
  {
    path: "/tourist",
    name: "tourist",
    component: () => import(/* webpackChunkName: "tourist" */ "@/components/tourist/SearchTourist"),
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: () => import(/* webpackChunkName: "hotplace" */ "@/components/hotplace/HotplaceList"),
    children: [
      {
        path: "search",
        name: "search",
        component: () => import(/* webpackChunkName: "hotplace" */ "@/components/hotplace/HotplaceSearch"),
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

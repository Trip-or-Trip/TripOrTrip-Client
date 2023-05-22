import Vue from "vue";
import VueRouter from "vue-router";
// views
import AppMain from "@/views/AppMain";
import AppUser from "@/views/AppUser";
import AppHotplace from "@/views/AppHotplace";
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
      {
        path: "password",
        name: "findpassword",
        component: () => import(/* webpackChunkName: "user" */ "@/components/user/FindPassword"),
      },
    ],
  },
  {
    path: "/mypage",
    name: "mypage",
    redirect: { name: 'userdetail' },
    component: () => import(/* webpackChunkName: "mypage" */ "../views/AppMypage"),
    children: [
      {
        path: "",
        name: "userdetail",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypageUser"),
      },
      {
        path: "",
        name: "mypageboard",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypageBoard"),
      },
      {
        path: "",
        name: "mypageplan",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypagePlan"),
      },
      {
        path: "",
        name: "mypagehotplace",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypageHotplace"),
      },
      {
        path: "",
        name: "mypagecomment",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypageComment"),
      },
      {
        path: "",
        name: "mypagelike",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/mypage/MypageLike"),
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
        path: "modify/:articleno",
        name: "boardmodify",
        // component: BoardModify,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardModify"),
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
        path: "write",
        name: "noticewrite",
        // component: NoticeWrite,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeWrite"),
      },
      {
        path: ":articleno",
        name: "noticeview",
        // component: NoticeView,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeView"),
      },
      {
        path: "modify/:articleno",
        name: "noticemodify",
        // component: NoticeModify,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeModify"),
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
        path: "write",
        name: "planwrite",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanWrite"),
      },
      {
        path: ":articleno",
        name: "planview",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanView"),
      },
      {
        path: "modify/:articleno",
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
    component: AppHotplace,
    children: [
      {
        path: "",
        name: "hotplacelist",
        component: () => import(/* webpackChunkName: "hotplace" */ "@/components/hotplace/HotplaceList"),
      },
      {
        path: "create",
        name: "hotplacecreate",
        component: () => import(/* webpackChunkName: "hotplace" */ "@/components/hotplace/HotplaceCreate"),
      },
      {
        path: ":num",
        name: "hotplaceupdate",
        component: () => import(/* webpackChunkName: "hotplace" */ "@/components/hotplace/HotplaceUpdate"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

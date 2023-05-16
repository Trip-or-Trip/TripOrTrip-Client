import Vue from 'vue'
import VueRouter from 'vue-router'
// views
import AppMain from "@/views/AppMain";
import AppUser from "@/views/AppUser";
// import AppUser from "@/views/AppUser.vue";
// import AppBoard from "@/views/AppBoard.vue";
// import AppNotice from "@/views/AppNotice.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: AppMain
  },
  {
    path: '/user',
    name: 'user',
    component: AppUser,
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: () => import(/* webpackChunkName: "user" */ "@/components/user/SignIn"),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "user" */ "@/components/user/SignUp"),
      },
    ]
  },
  {
    path: "/board",
    name: "board",
    // component: AppBoard,
    component: () => import(/* webpackChunkName: "board" */ "../views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
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
        path: "view/:articleno",
        name: "boardview",
        // component: BoardView,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardView"),
      },
      {
        path: "modify",
        name: "boardmodify",
        // component: BoardModify,
        component: () => import(/* webpackChunkName: "board" */ "../components/board/BoardModify"),
      },
      {
        path: "delete",
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
    redirect: "/notice/list",
    children: [
      {
        path: "list",
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
        path: "view/:articleno",
        name: "noticeview",
        // component: NoticeView,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeView"),
      },
      {
        path: "modify",
        name: "noticemodify",
        // component: NoticeModify,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeModify"),
      },
      {
        path: "delete",
        name: "noticedelete",
        // component: NoticeDelete,
        component: () => import(/* webpackChunkName: "notice" */ "../components/notice/NoticeDelete"),
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "plan" */ "../views/AppPlan"),
    redirect: "/plan/list",
    children: [
      {
        path: "list",
        name: "planlist",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanList"),
      },
      {
        path: "write",
        name: "planwrite",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanWrite"),
      },
      {
        path: "view/:articleno",
        name: "planview",
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanView"),
      },
      {
        path: "modify",
        name: "planmodify",
        // component: NoticeModify,
        component: () => import(/* webpackChunkName: "plan" */ "../components/plan/PlanModify"),
      },
      {
        path: "delete",
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

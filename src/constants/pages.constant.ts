export const pages: IPages = {
  home: {
    path: "/",
    name: "Home"
  },
  login: {
    path: "/login",
    name: "Login"
  },
  register: {
    path: "/register",
    name: "Register"
  },
  "not-found": {
    path: "/:pathMatch(.*)*",
    name: "Not found"
  }
};

export const pages: IPages = {
  home: {
    path: "/",
    name: "Home"
  },
  "not-found": {
    path: "/:pathMatch(.*)*",
    name: "Not found"
  }
};

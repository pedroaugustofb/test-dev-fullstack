import base from "../base.api";

const category = {
  getCategories: async () => base.get("/category"),
};

export default category;

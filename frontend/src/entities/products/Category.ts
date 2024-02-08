type Category = {
  readonly id: string;
  parent: Category | null;
  name: string;
};

export default Category;

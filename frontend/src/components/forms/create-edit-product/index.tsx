import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import PageLimits from "../../atoms/page-limits";
import { ArrowLeftCircle, X } from "lucide-react";
import "./styles.scss";
import useFetchProduct from "../../../hooks/fetch/useFetchProduct";
import Loader from "../../molecules/loader";
import ErrorPage from "../../molecules/error";
import { SubmitHandler, useForm } from "react-hook-form";
import useFetchCategories from "../../../hooks/fetch/useFetchCategories";
import Form from "../../atoms/form";
import TextField from "../../molecules/text-field";
import { useEffect, useState } from "react";
import Button from "../../atoms/button";
import { toast } from "react-toastify";
import useFilePreview from "../../../hooks/file/useFilePreview";
import api from "../../../api";
import { CreateProductDto } from "../../../api/products/dtos/create-product.dto";
import Divider from "../../atoms/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "../../molecules/select";
import Category from "../../../entities/products/Category";

const schema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  qty: z.number().int().min(1, {
    message: "Quantity is required",
  }),
  price: z.number().min(1, {
    message: "Price is required",
  }),
  categories: z.array(z.string()),

  photo: z.any().optional(),
});

type ProductFields = z.infer<typeof schema>;

export default function CreateOrEditProductForm() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!productId;

  const [input, setInput] = useState<string>("");

  const { loading: lp, error: ep, product } = useFetchProduct(productId as string);
  const { loading: lc, error: ec, categories } = useFetchCategories();

  const loading = lp || lc;
  const error = ep || ec;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFields>({
    defaultValues: {
      name: "",
      qty: 0,
      price: 0,
      categories: [],
    },
    resolver: zodResolver(schema),
  });

  // for image preview
  // @ts-ignore - file is not a valid input
  const file = watch("photo");
  const [imgPreview] = useFilePreview(file);

  // to fill the form with the product data
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        qty: product.qty,
        price: product.price,
        categories: product.categories.map((category) => category.id),
      });
    }
  }, [product, reset]);

  if (loading) return <Loader />;

  if (error && error.message !== "Product ID is required") return <ErrorPage />;

  const onSubmit: SubmitHandler<ProductFields> = async (data: ProductFields) => {
    const requestData: CreateProductDto = {
      name: data.name,
      qty: data.qty,
      price: data.price,
      categories: data.categories,
    };

    const photo = data.photo[0] as File;
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      if (isEditing) {
        const response = await api.products.updateProduct(productId as string, requestData);

        if (!response) throw new Error("Error updating product");

        const photoResponse = await api.products.updatePhoto(productId as string, formData);

        if (!photoResponse) throw new Error("Error updating photo");

        toast.success("Product updated successfully");
      } else {
        const response = await api.products.createProduct(requestData);

        if (!response) throw new Error("Error creating product");

        const photoResponse = await api.products.updatePhoto(response.data.product.id, formData);

        if (!photoResponse) throw new Error("Error updating photo");

        toast.success("Product created successfully");
      }
      navigate("/admin/products");
    } catch (e) {
      console.error(e);
      toast.error(isEditing ? "Error editing product" : "Error creating product");
    } finally {
    }
  };

  const addCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const category = categories.find((category) => category.id === input);
    console.log(category, input, categories);
    if (!category) return toast.error("Category not found");

    if (watch("categories").includes(category.id)) return toast.error("Category already added");

    reset((prev) => {
      return {
        ...prev,
        categories: [...prev.categories, category.id],
      };
    });
  };

  const removeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.preventDefault();
    reset((prev) => {
      return {
        ...prev,
        categories: prev.categories.filter((category) => category !== id),
      };
    });
  };

  return (
    <PageLimits>
      <button onClick={() => navigate("/admin/products")} className="back-button">
        <ArrowLeftCircle className="icon" /> Voltar
      </button>

      <section className="products-page-container">
        <h1>{isEditing ? `Edit product` : `Create a new product`}</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField id="name" type="text" error={errors.name?.message} placeholder="Name of your Product" label="Name" register={register("name")} />

          <TextField
            id="qty"
            type="number"
            error={errors.qty?.message}
            placeholder="Quantity of your Product"
            label="Quantity"
            register={register("qty", {
              valueAsNumber: true,
            })}
          />

          <TextField
            id="price"
            type="number"
            error={errors.price?.message}
            placeholder="Price of your Product"
            label="Price (USD)"
            register={register("price", {
              valueAsNumber: true,
            })}
          />

          <div className="categories-container-grid">
            <div className="add-field">
              <SelectField<Category>
                setInput={setInput}
                options={categories.filter((category) => !watch("categories").includes(category.id))}
                label="Categories"
              />
              <Button color="secondary" type="button" onClick={(e) => addCategory(e)}>
                Add category
              </Button>
            </div>
            <div className="categories-grid-form">
              {categories
                .filter((category) => watch("categories").includes(category.id))
                .map((category) => (
                  <div key={category.name} className="category-mini-card" onClick={(e) => removeCategory(e, category.id)}>
                    {category.name} <X className="icon" />
                  </div>
                ))}
            </div>
            <Divider />
            <div className="img-submit-box">
              <input type="file" id="file" {...register("photo")} />
              {imgPreview && <img src={imgPreview as string} alt="product" className="img-product" />}
            </div>
          </div>

          <Button color="primary" type="submit">
            {isEditing ? `Edit product` : `Create product`}
          </Button>
        </Form>
      </section>
    </PageLimits>
  );
}

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../contexts/auth";
import { toast } from "react-toastify";
import TextField from "../../molecules/text-field";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
type LoginFormFields = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/admin/products");
      toast.success("Logged in successfully", {
        autoClose: 2000,
      });
    } catch (error: any) {
      const details = error.response?.data?.details || "An error occurred on login";

      return toast.error(details, {
        autoClose: 2000,
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField id="email" label="Email" type="email" placeholder="Enter your email" register={register("email")} error={errors.email?.message} />

      <TextField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" color="primary" loading={isSubmitting}>
        Login
      </Button>
    </Form>
  );
}

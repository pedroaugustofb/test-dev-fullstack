import "./styles.scss";
import LoginImg from "../../assets/imgs/login.jpg";
import LoginForm from "../../components/forms/login";
import Footer from "../../components/molecules/footer";
import Logo from "../../components/molecules/logo";

export default function LoginPage() {
  return (
    <main className="login-page-container">
      {/* Login Banner */}
      <section className="login-banner-section">
        <figure>
          <img src={LoginImg} alt="login-phone " />
          <figcaption />
        </figure>
      </section>

      {/* Login Form */}
      <div className="login-form-container">
        <section className="login-form-section">
          <article className="login-form-article">
            <div className="login-logo-container">
              <Logo />
            </div>
            <div className="login-form-place-items">
              <h2 className="font-bold text-h1 ">Nice to see you again</h2>
              <span>This page is only for admin accounts.</span>
              <LoginForm />
            </div>
          </article>
          <div className="login-page-footer-container">
            <Footer />
          </div>
        </section>
      </div>
    </main>
  );
}

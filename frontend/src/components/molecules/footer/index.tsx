import "./styles.scss";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div>
        <span className="md:text-sm ">Created by </span>
        <a href="https://www.linkedin.com/in/pedrofoltram/" target="_blank" rel="noreferrer">
          Pedro Foltram
        </a>
      </div>
      <span>@{new Date().getFullYear()} All rights reserved.</span>
    </footer>
  );
}

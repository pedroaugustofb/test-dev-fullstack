import "./styles.scss";

export default function PageLimits({ children }: { children: React.ReactNode }) {
  return (
    <main className="page-limits-container">
      <div className="page-limits-box">{children}</div>
    </main>
  );
}

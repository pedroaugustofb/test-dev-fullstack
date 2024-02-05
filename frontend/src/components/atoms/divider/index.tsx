import "./styles.scss";

export default function Divider({ vertical }: { vertical?: boolean }) {
  return <div className={vertical ? "divider-vertical" : "divider-horinzontal"} />;
}

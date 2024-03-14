import "./styles.css";

export default function NotificationComponent(props) {
  const { message, type = "default" } = props;
  const className = `notification ${type}`;
  return <div className={className}>{message}</div>;
}

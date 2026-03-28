import { Link } from "react-router-dom";

const EmptyState = ({
  title,
  description,
  actionLabel,
  actionTo = "/",
}) => {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon">🍽</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel ? (
        <Link className="primary-action action-link" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;

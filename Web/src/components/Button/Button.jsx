import { useNavigate } from "react-router-dom";
import './Button.css';

export default function Button({
  to,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  children,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e); // Executa ação customizada
    } else if (to) {
      navigate(to); // Faz navegação se "to" foi passado
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}

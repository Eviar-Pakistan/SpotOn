export default function GoldButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`gold-btn ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  )
}

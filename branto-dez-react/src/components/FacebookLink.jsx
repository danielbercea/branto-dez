export default function FacebookLink({ size = 20, showText = true }) {
  return (
    <a
      href="https://www.facebook.com/share/1abW8r3jJw/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        fontWeight: 600,
        color: "#1877F2",
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#1877F2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 12a10 10 0 10-11.5 9.9v-7H7v-3h3.5V9.5c0-3.5 2-5.5 5-5.5 1.5 0 3 .3 3 .3v3h-1.7c-1.7 0-2.3 1-2.3 2.2V12H18l-.5 3h-3v7A10 10 0 0022 12z"/>
      </svg>

      {showText && <span>Facebook</span>}
    </a>
  );
}

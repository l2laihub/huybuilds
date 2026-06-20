export function Wordmark({ withStudio = false }: { withStudio?: boolean }) {
  return (
    <span style={{ fontWeight: 800, fontSize: 21, letterSpacing: "-0.01em" }}>
      <span style={{ color: "var(--st-ink)" }}>Huy</span>
      <span style={{ color: "var(--st-terracotta)" }}>Builds</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: 999,
          background: "var(--st-amber)",
          marginLeft: 3,
          verticalAlign: "middle",
        }}
      />
      {withStudio && (
        <span style={{ color: "inherit", marginLeft: 6 }}>Studio</span>
      )}
    </span>
  );
}

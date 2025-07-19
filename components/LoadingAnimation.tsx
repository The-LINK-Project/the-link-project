export default function LoadingAnimation() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "var(--background)",
      }}
    >
      <div className="animate-spin rounded-full border-4 border-solid border-[var(--primary)] border-t-transparent h-12 w-12" />
    </div>
  );
}

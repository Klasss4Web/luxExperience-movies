export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <h1>404</h1>
      <p>Page not found</p>

      <a href="/">Go back home</a>
    </div>
  );
}

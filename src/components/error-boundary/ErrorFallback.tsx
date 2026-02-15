export default function ErrorFallback() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Oops</h1>
      <p>Something unexpected happened.</p>
      <button onClick={() => window.location.reload()}>Reload page</button>
    </div>
  );
}

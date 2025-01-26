'use client'; // Mark this as a Client Component

export default function GlobalError({ error, reset }) {
  console.error("Global Error:", error);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
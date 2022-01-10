function FullPageErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function Spinner({ style }) {
  return (
    <svg
      className={`animate-spin h-7 w-7  ${style}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

function FullPageSpinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner style="text-blue-500" />
    </div>
  );
}

export { FullPageErrorFallback, Spinner, FullPageSpinner };

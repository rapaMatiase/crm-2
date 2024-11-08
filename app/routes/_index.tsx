// app/routes/index.tsx
import { LoaderFunction, redirect } from "@remix-run/node";

// Define the loader function
export const loader: LoaderFunction = async () => {
  // Perform the redirection to the login page
  return redirect("/login");
};

export default function Index() {
  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
}
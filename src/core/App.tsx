import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./themes";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@modules/general/pages/404";

const queryClient = new QueryClient();

/**
 * Main application component.
 * Sets up global providers such as theming, routing, Google OAuth, and query client.
 *
 * @component
 * @returns {JSX.Element} - Returns the root component of the application.
 */
function App(): JSX.Element {
  /**
   * Local user state could be defined here to store authenticated user information.
   *
   * @state {AccountInformation | null} localUser - Authenticated user's account information.
   * @state {React.Dispatch<React.SetStateAction<AccountInformation | null>>} setLocalUser -
   * Function to update the user's account information.
   */

  return (
    /**
     * QueryClientProvider provides React Query functionalities across the app.
     */
    <QueryClientProvider client={queryClient}>
      {/* GoogleOAuthProvider provides authentication using Google accounts. */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_ID_GOOGLE_CLIENT}>
        {/* ThemeProvider applies the custom MUI theme globally. */}
        <ThemeProvider theme={getTheme}>
          <ErrorBoundary fallback={<ErrorPage />}>
            {/* RouterProvider enables client-side routing using React Router. */}
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;

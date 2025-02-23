import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ItemProvider } from "./ItemContext";
import { SnackbarProvider } from "./SnackbarProvider";

export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ItemProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ItemProvider>
    </AuthProvider>
  );
}

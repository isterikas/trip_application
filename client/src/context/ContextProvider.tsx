import  { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ItemProvider } from "./ItemContext";

export function ContextProvider ({children} : {children : ReactNode}) {

  return (
    <AuthProvider>
      <ItemProvider>{children}</ItemProvider>
    </AuthProvider>
  );
};
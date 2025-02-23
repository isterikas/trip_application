import { createContext, useState, ReactNode, useContext } from "react";

interface ISNackbarContext {
  showSnackbar: (message: string, status: Status) => void;
}

const SnackbarContext = createContext<ISNackbarContext>({
  showSnackbar: () => {},
});

type Status = "info" | "error" | "success";

interface ISnackbar {
  open: boolean;
  status: Status;
  message: string;
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    status: "info",
    message: "",
  });

  const showSnackbar = (message: string, status: Status = "info") => {
    setSnackbar({ message, status, open: true });

    //Auto hide after 3 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <Snackbar message={snackbar.message} status={snackbar.status} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

// Custom Snackbar component using plain CSS
const Snackbar = ({ message, status }: { message: string; status: Status }) => {
  return (
    <div
      className={`absolute p-8 text-2xl top-0 w-full ${
        status === "success" ? "bg-green-500" : "bg-red-400"
      }`}
    >
      {message}
      {/* <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white text-2xl"
      >
        &times;
      </button> */}
    </div>
  );
};

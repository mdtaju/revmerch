"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }) => {
      const queryClient = new QueryClient();
      return (
            <QueryClientProvider client={queryClient}>
                  {children}
                  <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
      );
};

export default QueryProvider;

// const firebaseConfig = {
//   apiKey: "AIzaSyBiioUGeHTWbDkLYEuwWXKPVKY-uAPdPWw",
//   authDomain: "revmerch-42a47.firebaseapp.com",
//   projectId: "revmerch-42a47",
//   storageBucket: "revmerch-42a47.appspot.com",
//   messagingSenderId: "261204564465",
//   appId: "1:261204564465:web:0f7e7c53aad55f4b100c50",
//   measurementId: "G-X6SZLJKYPT"
// };
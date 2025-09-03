import { Outlet } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Outlet />
    </>
  );
}

export default App;

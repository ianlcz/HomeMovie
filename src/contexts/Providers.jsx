import { AuthProvider } from "./auth.context";
import { PopUpProvider } from "./pop-up.context";

const Providers = ({ children }) => (
  <AuthProvider>
    <PopUpProvider>{children}</PopUpProvider>
  </AuthProvider>
);

export default Providers;

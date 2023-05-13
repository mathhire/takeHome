import { Route, Routes } from "react-router-dom";

import { NavbarSection } from "components";

import { LoginPage, SignupPage } from "pages/Auth";
import { AllResources, AllUsers, PostJobPage } from "pages/User";
import Homepage from "pages/User/Homepage";

import UseAuthentication from "hooks/UseAuthenticationHook";

import { Redirect } from "utils/helpers";

function App() {
  const { authenticated, logout } = UseAuthentication();

  return authenticated ? (
    <div className=" mb-5">
      <NavbarSection logout={logout} authenticated={authenticated} />
      <Routes>
        <Route path="/user/dashboard" element={<Homepage logout={logout} />} />
        <Route path="/user/postResource" element={<PostJobPage />} />{" "}
        <Route path="/user/allResources" element={<AllResources />} />
        <Route path="*" element={<Redirect to="/user/dashboard" />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  ) : (
    <div className="">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<SignupPage />} />

        <Route path="*" element={<Redirect to="/auth/login" />} />
      </Routes>
    </div>
  );
}

export default App;

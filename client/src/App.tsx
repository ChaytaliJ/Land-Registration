import { Routes, Route } from "react-router-dom";

import Authentication from "./pages/Authentication";
import UserRegistration from "./pages/UserRegistration";
import UserHomePage from "./pages/UserHomePage";
import { MainNav } from "./pages/components/layout/main-nav";
import UserLands from "./pages/UserLands";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/user/registration" element={<UserRegistration />} />

      <Route path='/user/dashboard' element={<MainNav />}>
        <Route path="" element={<UserHomePage />} />
        <Route path="add-lands" element={<>hello</>} />
        <Route path="my-lands" element={<UserLands />} />
        <Route path="land-gallery" element={<>hello</>} />
        <Route path="recieved-request" element={<>hello</>} />
        <Route path="sent-request" element={<>hello</>} />
      </Route>

      <Route path="/landInspector/registration" element={<div>land-inspector</div>} />
      <Route path="/contractOwner/registration" element={<div>contract owner</div>} />
    </Routes>


  );
}


export default App;




import { Routes, Route } from "react-router-dom";

import Authentication from "./pages/Authentication";

import { UserMainNav } from "./pages/components/layout/user-main-nav";
import UserRegistration from "./pages/User/UserRegistration";
import UserHomePage from "./pages/User/UserHomePage";
import UserLands from "./pages/User/UserLands";
import UserAddLands from "./pages/User/UserAddLands";
import UserLandGallery from "./pages/User/UserLandGallery";
import UserReceivedRequestPage from "./pages/User/UserReceivedRequestPage";
import UserSentRequestPage from "./pages/User/UserSentRequestPage";

import { ContractOwnerMainNav } from "./pages/components/layout/contract-owner-main-nav";
import ContractOwnerHomePage from "./pages/ContractOwner/ContractOwnerHomePage";
import ContractOwnerAddLandInspectorPage from "./pages/ContractOwner/ContractOwnerAddLandInspectorPage";
import ContractOwnerAllLandInspectorsPage from "./pages/ContractOwner/ContractOwnerAllLandInspectorsPage";


import { LandInspectorMainNav } from "./pages/components/layout/land-inspector-main-nav";
import LandInspectorHomePage from "./pages/LandInspector/LandInspectorHomePage";
import LandInspectorVerifyUserPage from "./pages/LandInspector/LandInspectorVerifyUserPage";
import LandInspectorVerifyLand from "./pages/LandInspector/LandInspectorVerifyLand";
import LandInspectorTransferOwnershipPage from "./pages/LandInspector/LandInspectorTransferOwnershipPage";
import NotFound from "./pages/NotFound";
import OwnershipDetailsPage from "./pages/LandInspector/OwnershipDetailsPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/user/registration" element={<UserRegistration />} />
      <Route path="*" element={<NotFound />} />

      <Route path='/user/dashboard' element={<UserMainNav />}>
        <Route path="" element={<UserHomePage />} />
        <Route path="add-lands" element={<UserAddLands />} />
        <Route path="my-lands" element={<UserLands />} />
        <Route path="land-gallery" element={<UserLandGallery />} />
        <Route path="recieved-request" element={<UserReceivedRequestPage />} />
        <Route path="sent-request" element={<UserSentRequestPage />} />
      </Route>


      <Route path='/land-inspector/dashboard' element={<LandInspectorMainNav />}>
        <Route path="" element={<LandInspectorHomePage />} />
        <Route path="verify-user" element={<LandInspectorVerifyUserPage />} />
        <Route path="verify-land" element={<LandInspectorVerifyLand />} />
        <Route path="transfer-ownership" element={<LandInspectorTransferOwnershipPage />} />
        <Route path="ownership-details" element={<OwnershipDetailsPage />} />


      </Route>

      <Route path='/contract-owner/dashboard' element={<ContractOwnerMainNav />}>
        <Route path="" element={<ContractOwnerHomePage />} />
        <Route path="add-land-inspector" element={<ContractOwnerAddLandInspectorPage />} />
        <Route path="all-land-inspectors" element={<ContractOwnerAllLandInspectorsPage />} />

      </Route>



    </Routes>


  );
}


export default App;




import { GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "559944985925-2514fkokgg0cuvpoumkl8ilfd2qo2peq.apps.googleusercontent.com";

const Logout = () => {
  return (
    <div id="signOutBtn">
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={console.log("LoggedOut")}
        onFailure={console.log("Failed")}
      />
    </div>
  );
};

export default Logout;

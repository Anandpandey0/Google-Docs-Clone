import { useAuth0 } from "@auth0/auth0-react";
const GoogleLoginBtn = () => {
  const { loginWithRedirect } = useAuth0();
  // console.log(loginWithRedirect);
  return (
    <button
      className="border-2 border-solid  p-2 px-8 border-blue-400 hover:bg-blue-400 hover:text-white hover:border-blue-800"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default GoogleLoginBtn;

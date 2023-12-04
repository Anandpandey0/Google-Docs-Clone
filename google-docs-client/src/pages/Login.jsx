import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center justify-center h-[80vh]">
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="border-2 border-solid  p-2 px-8 border-blue-400 hover:bg-blue-400 hover:text-white hover:border-blue-800"
          >
            Log Out
          </button>
        </div>
      ) : (
        <GoogleLoginBtn />
      )}
    </>
  );
};

export default Login;

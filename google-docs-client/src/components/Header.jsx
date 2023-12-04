import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { v4 as uuidv4 } from "uuid";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const redirectToSomeUrl = () => {
    // console.log(uuidv4());
    const newDocumentUrl = `/documents/${uuidv4()}`;
    // console.log(newDocumentUrl);
    navigate(newDocumentUrl);
  };
  return (
    <nav className="gap-8 lg:gap-0 shadow-md">
      <HamburgerIcon height={6} width={6} className="hover:bg-gray-500 " />
      <div
        className="image-container hover:bg-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://kstatic.googleusercontent.com/files/97ecc831526fbe8c60fe88ef0d7a6cbf06361809f0acf857326681f6a1f35740d3bd7d69bf4a5381f5c31a863bccace4d9d1660379182901f73d24ef137f6fb4"
          alt="google-docs-logo"
        />
        <span className="name-one">Google</span>
        <span>Docs</span>
      </div>
      <div className="hidden lg:block left-navbar-items">
        <Link to="">Overview</Link>
        <Link to="">Features</Link>
        <Link to="">Security</Link>
        <Link to="">Pricing</Link>
      </div>
      <div className="hidden lg:block right-navbar-items">
        {!isAuthenticated ? (
          <Link className="signInBtn" to="/login">
            Sign in
          </Link>
        ) : (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="mr-4 "
          >
            Log Out
          </button>
        )}

        <button className="editorBtn" onClick={redirectToSomeUrl}>
          Editor
        </button>
      </div>
    </nav>
  );
};

export default Header;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";

const Drive = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [loggedUser, setLoggedUser] = useState("");
  const [documentsData, setDocumentsData] = useState([]);

  const redirectToSomeUrl = () => {
    const newDocumentUrl = `/documents/${uuidv4()}`;
    navigate(newDocumentUrl);
  };

  const getUserDocuments = async (loggedUser) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api?email=${loggedUser}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user documents");
      }

      const data = await response.json();

      // Check if data is truthy before setting the state
      if (data) {
        setDocumentsData(data);
      }
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoggedUser(user.email);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Fetch documents when loggedUser changes
    if (loggedUser) {
      getUserDocuments(loggedUser);
    }
  }, [loggedUser]);

  const goToDocument = (id) => {
    navigate(`/documents/${id}`);
  };

  return (
    <div className="bg-gray-200 h-[50vh]">
      <div className="w-2/3 h-full border-2 border-solid border-black mx-auto p-4">
        <h1 className="text-xl font-medium">Start a new document</h1>
        <div className="flex gap-4 w-full h-full ">
          <div
            className="card w-1/4 bg-white h-5/6  mt-4 cursor-pointer"
            onClick={redirectToSomeUrl}
          >
            <img
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              alt=""
              className="w-full h-full"
            />
          </div>

          {documentsData.map((document) => (
            <div
              key={document._id}
              className="card w-1/4 bg-white h-5/6  mt-4 cursor-pointer flex justify-center items-center"
              onClick={() => goToDocument(document._id)}
              target="blank"
            >
              Document: {document._id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drive;

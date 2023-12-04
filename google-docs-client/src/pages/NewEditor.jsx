import { useState, useCallback, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./css/Editor.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const NewEditor = () => {
  const [socket, setSocket] = useState();
  const [loggedUser, setLoggedUser] = useState("");
  const [quill, setQuill] = useState(null); // Use useState to store the Quill instance
  const { id: documentId } = useParams();
  const { user } = useAuth0();
  const SAVE_INTERVAL_MS = 2000;

  useEffect(() => {
    const socketConnection = io("http://localhost:3000");
    setSocket(socketConnection);

    const fetchData = async () => {
      if (quill == null) return;
      try {
        if (user) {
          setLoggedUser(user.email);
        }

        const response = await fetch(
          `http://localhost:3000/api/documents?id=${documentId}`
        );
        const document = await response.json();
        // console.log(document);

        if (document && document.data) {
          quill.disable();
          quill.setContents(document.data);
          quill.enable();
        } else {
          quill.enable();
          quill.setText("");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        quill.enable();
        quill.setText("Error loading document");
      }
    };

    fetchData();

    return () => {
      socketConnection.disconnect();
    };
  }, [user, documentId, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const documentData = {
        id: documentId,
        content: quill.getContents(),
        user: loggedUser,
      };
      // console.log("Sending document data to server:", documentData);
      socket.emit("save-document", documentData);
      // console.log(documentData);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null || quill != null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const quillContainer = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      quillContainer.disable();
      quillContainer.setText("Loading...");

      setQuill(quillContainer);
    },
    [quill]
  );

  return <div className="container" ref={wrapperRef}></div>;
};

export default NewEditor;

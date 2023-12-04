import { useCallback, useEffect, useState } from "react";
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
const Editor = () => {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const { id: documentId } = useParams();
  const [loggedUser, setLoggedUser] = useState("");
  const { user } = useAuth0();
  const SAVE_INTERVAL_MS = 2000;

  // console.log(documentId);
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      const documentData = {
        content: quill.getContents(),
        user: loggedUser,
      };

      socket.emit("save-document", documentData);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    const socketConnection = io("http://localhost:3000");
    setSocket(socketConnection);
    if (user) {
      setLoggedUser(user.email);
    }
    return () => {
      socketConnection.disconnect();
    };
  }, [user]);
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const changeHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", changeHandler);
    return () => {
      quill.off("text-change", changeHandler);
    };
  }, [socket, quill]);
  useEffect(() => {
    if (socket == null || quill == null) return;
    const recieveChangeHandler = (delta) => {
      //   console.log(delta);
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", recieveChangeHandler);
    return () => {
      socket.off("recieve-changes", recieveChangeHandler);
    };
  }, [socket, quill]);
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

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
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;

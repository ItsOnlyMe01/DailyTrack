import { useState, useEffect } from "react";
import EmailModal from "./EmailModal";
import FileUpload from "./FileUpload";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import WorkspaceSelector from "./WorkspaceSelector";
import TopBar from "./TopBar";
import ChatArea from "./ChatArea";
import IntroPopup from "./IntroPopup";
import Header from "./Header";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // user & workspace
  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [showCreateWs, setShowCreateWs] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenIntro");
    if (!hasSeen) {
      setShowIntro(true);
    }
  }, []);

  /* ======================
     EMAIL → USER → WORKSPACES
     ====================== */
  async function handleEmailSubmit(email) {
    const res = await fetch(`${API_BASE}/user/identify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const userData = await res.json();
    setUser(userData);

    const wsRes = await fetch(`${API_BASE}/workspace/list/${userData.id}`);
    const wsList = await wsRes.json();
    setWorkspaces(wsList);
  }

  /* ======================
     CHAT
     ====================== */
  async function sendMessage() {
    if (!input.trim() || !activeWorkspace) return;

    const userMsg = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg].slice(-10));
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          workspaceId: activeWorkspace.id,
        }),
      });

      const data = await res.json();

      const botMsg = {
        role: "assistant",
        content: data,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg].slice(-10));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error talking to server",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  /* ======================
     UI
     ====================== */
  return (
    <div className="min-h-screen w-full font-sans flex justify-center">
      <Header />
      <div className="max-w-3xl w-full p-3 sm:p-6 flex flex-col h-screen pt-20 sm:pt-24">
        {showIntro && (
          <IntroPopup
            onClose={() => {
              localStorage.setItem("hasSeenIntro", "true");
              setShowIntro(false);
            }}
          />
        )}

        {!user && <EmailModal onSubmit={handleEmailSubmit} />}

        {/* Workspace selection */}
        {user && !activeWorkspace && (
          <WorkspaceSelector
            workspaces={workspaces}
            onSelectWorkspace={(ws) => {
              setActiveWorkspace(ws);
              setMessages([]);
            }}
            onCreateNew={() => setShowCreateWs(true)}
          />
        )}

        {/* Active workspace */}
        {activeWorkspace && (
          <>
            <TopBar
              activeWorkspace={activeWorkspace}
              workspaces={workspaces}
              onChangeWorkspace={(ws) => {
                setActiveWorkspace(ws);
                setMessages([]);
              }}
              onBack={() => {
                setActiveWorkspace(null);
                setMessages([]);
              }}
            />

            {/* Upload */}
            <FileUpload
              workspaceId={activeWorkspace.id}
              onSuccess={() => alert("File indexed successfully")}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatArea
                messages={messages}
                loading={loading}
                input={input}
                setInput={setInput}
                onSend={sendMessage}
              />
            </div>
          </>
        )}
      </div>

      {/* Create Workspace Modal */}
      {showCreateWs && user && (
        <CreateWorkspaceModal
          userId={user.id}
          onClose={() => setShowCreateWs(false)}
          onCreated={(ws) => {
            setWorkspaces((prev) => [...prev, ws]);
            setActiveWorkspace(ws);
            setMessages([]);
            setShowCreateWs(false);
          }}
        />
      )}
    </div>
  );
}

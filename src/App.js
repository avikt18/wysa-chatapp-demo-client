import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    setUserInfo(localStorage.getItem('userInfo'))
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {
          !userInfo ? (
            <>
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login setUserInfo={setUserInfo}/>} />
            </>
          ) : (
            <>
              <Route
                path="*"
                element={<Navigate to="/chat" replace />}
              />
              <Route path="/chat" element={<ChatPage userInfo={userInfo} />} />
            </>
          )
        }

      </Routes>
    </Layout>
  );
}

export default App;

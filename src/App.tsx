import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  )
}
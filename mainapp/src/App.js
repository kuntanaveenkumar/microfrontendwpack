import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//const Login = lazy(() => import("./login"));
const loadRemoteComponent = (remoteImport) => {
  return lazy(() =>
    remoteImport().catch((err) => {
      console.error("Failed to load remote component:" + remoteImport, err);
      return { default: () => <div>Component Failed to Load</div> };
    })
  );
};
const App1 = loadRemoteComponent(() => import("app1/App1"));
const App2 = loadRemoteComponent(() => import("app2/App2"));
//const App4 = loadRemoteComponent(() => import("app4/App4"));
import ErrorBoundary from "./ErrorBoundary";
const App = () => {
  return (
    <Router basename="/">
      <div>
        <h6>MainApp</h6>
        <Link to="app1">Guides</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="app2">Installations</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        
        <ErrorBoundary>
          <Suspense fallback="Loading">
            <Routes>
              <Route path="app1" element={<App1 />} exact="true" />
              <Route path="app2" element={<App2 />} exact="true" />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;

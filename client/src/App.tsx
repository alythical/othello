// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import "./app.css";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <div class="bg-slate-900 max-h-screen min-h-screen">
          <Navbar />
          <Suspense>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

import React, {StrictMode} from "react";
import ReactDOM from "react-dom"; // This import is no longer needed for rendering with createRoot
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";

// Import createRoot from react-dom/client
import { createRoot } from "react-dom/client";

// Get the root element
const container = document.getElementById('root');
// Create a root
const root = createRoot(container);
// Render the application
root.render(
    <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </StrictMode>
);

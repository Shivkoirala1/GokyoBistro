import React from "react"; // To create a react ui React is needed
import ReactDOM from "react-dom/client"; // To render the ui generated using React
import { BrowserRouter } from "react-router-dom"; // To route from one page to another page
import App from "./App.jsx"; // To route to the main App.jsx
import { AuthProvider } from "./context/AuthContext.jsx"; // This is to provide authentication throughout the web page
import { CartProvider } from "./context/CartContext.jsx"; // To access the cart details throughout the page
import "./index.css"; // To load global css style

ReactDOM.createRoot(document.getElementById("root")).render( // get Elementbyid is used to get the element root from the index.html and render everything inside the paranthesis
  <React.StrictMode> // This is the developer tool
    <BrowserRouter> // To route through the different page inside the website
      <AuthProvider> // To provide authentication data
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// ReactDOM is used to create a root of the react which is like the entry point for the react
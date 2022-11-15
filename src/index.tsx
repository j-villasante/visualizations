// src/App.tsx
import { MathJaxContext } from "better-react-mathjax";
import React from "react"
import ReactDOM from "react-dom/client"
import { WavePlate } from "./wavePlate";

const App = () => <MathJaxContext>
	<WavePlate />
</MathJaxContext>;

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

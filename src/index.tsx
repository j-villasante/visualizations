import './styles/main.scss';
import './styles/normalize.css';

import { MathJaxContext } from "better-react-mathjax";
import React from "react"
import ReactDOM from "react-dom/client"
import { WavePlate } from "./wavePlate";
import { Harmonic } from "./harmonic";

let c: React.ReactNode;
if (location.href.endsWith("/wave-plate")) {
	c = <WavePlate />
} else {
	c = <Harmonic />
}

const App = () => <MathJaxContext>
	{c}
</MathJaxContext>;

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

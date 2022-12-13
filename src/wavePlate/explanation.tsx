import React from "react"

export const Explanation = () => {
    return (
        <div className="explanation">
            The animation on the left shows the change of the electric field of
            light given by
            {`$$
					\\vec{E} = e^{i\\omega t}\\begin{pmatrix} E_{0x} \\\\ E_{0y}e^{i\\phi} \\end{pmatrix}
				$$`}
            The animation on the right is the light after going through a
            waveplate. To do this we start by expressing {"\\(\\vec{E}\\)"} in
            terms of components of the rotated axis. The angle {"\\(\\theta\\)"}{" "}
            of the rotated axis represents the angle of the wave plate.
            <br />
            {`$$
					\\vec{E}' = \\begin{pmatrix}
						\\cos\\theta & \\sin\\theta \\\\ 
						-\\sin\\theta & \\cos\\theta 
					\\end{pmatrix}
					\\begin{pmatrix} 
						E_{0x}e^{i\\omega t} \\\\
						E_{0y}e^{i(\\omega t + \\phi)}
					\\end{pmatrix}
				$$`}
            {`$$
					\\vec{E}' = \\begin{pmatrix}
						\\cos(\\theta) E_{0x}e^{i\\omega t} + \\sin(\\theta) E_{0y}e^{i(\\omega t + \\phi)} \\\\ 
						-\\sin(\\theta) E_{0x}e^{i\\omega t} + \\cos(\\theta) E_{0y}e^{i(\\omega t + \\phi)} 
					\\end{pmatrix}
				$$`}
            We then subtract {"\\(\\Gamma\\pi\\)"} to the component of{" "}
            {"\\(\\vec{E}'\\)"} that we want to slow down. In our case, the{" "}
            {"\\(x\\)"} component is being slowed down.
            <br />
            {`$$
					\\vec{E}_r = \\begin{pmatrix}
						\\cos(\\theta) E_{0x}e^{i(\\omega t - \\Gamma\\pi)} + \\sin(\\theta) E_{0y}e^{i(\\omega t + \\phi - \\Gamma\\pi)} \\\\ 
						-\\sin(\\theta) E_{0x}e^{i\\omega t} + \\cos(\\theta) E_{0y}e^{i(\\omega t + \\phi)} 
					\\end{pmatrix}
				$$`}
            {"\\(\\vec{E}_r\\)"} is the resulting vector, and it is basically
            obtained by changing the basis vectors of {"\\(\\vec{E}\\)"} to the
            rotated axis, and retarding the component on the slow axis by
            {"\\(\\Gamma\\pi\\)"}. With this method we are able to show any
            amount of retardation and not just the ones done by a half-wave or
            quarter-wave plates.
            <br />
            Finally, just as a side note, in other to be able to draw this in
            the browser using javascript, {"\\(\\vec{E}_r\\)"} was expressed in
            terms of cosines, and in terms of components of the non-rotated
            axis.
            {`$$
					\\vec{E}_r =
					\\begin{pmatrix}
						\\cos(\\theta) E_{0x}\\cos(\\omega t - \\Gamma\\pi) + \\sin(\\theta) E_{0y}\\cos(\\omega t + \\phi - \\Gamma\\pi) \\\\ 
						-\\sin(\\theta) E_{0x}\\cos(\\omega t) + \\cos(\\theta) E_{0y}\\cos(\\omega t + \\phi)
					\\end{pmatrix}
				$$`}
            {`$$
					\\vec{E}_f = 
					\\begin{pmatrix}
						\\cos\\theta & -\\sin\\theta \\\\ 
						\\sin\\theta & \\cos\\theta 
					\\end{pmatrix}
					\\vec{E}_r
				$$`}
            The scale parameter is how many screen pixels represent a unit when
            drawing the vector. The animation was done using{" "}
            <a href="https://ptsjs.org/">Pts.js</a>. The code can be found{" "}
            <a href="https://github.com/j-villasante/visualizations">here</a>.
        </div>
    )
}

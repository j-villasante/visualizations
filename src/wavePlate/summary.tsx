import React from "react"

export const Summary = () => {
    return (
        <div>
			<h2>Polarization</h2>
            <div>
                An electromagnetic wave is usually described by oscillations of
                the electric field. This can be written as
            </div>
            <div>{`$$
				\\vec{E}=e^{i(kz-\\omega t)}
				\\begin{pmatrix}
				E_{0x}\\\\
				E_{0y}e^{i\\phi}
				\\end{pmatrix}
			$$`}</div>
            <div>
                This is convenient but if necessary one may use the real part if
                we want to obtain the true field.
            </div>
            <div>{`$$
				\\vec{E}=\\begin{pmatrix}
				E_{0x}\\cos(kz-\\omega t)\\\\
				E_{0y}\\cos(kz-\\omega t+\\phi)
				\\end{pmatrix}
			$$`}</div>
            <div>{`In both cases, \\(E_{0x}\\) and \\(E_{0y}\\) are the 
			amplitudes in each of the components, and \\(\\phi\\) is the phase 
			shift that can be exist between each of the components of the field. 
			Using only \\(E_{0x}\\) and \\(E_{0y}\\) we can express any angle 
			of polarization. Likewise, using the phase shift we can express 
			linear, elliptical o circular polarization.`}</div>
            <div>{`Additionally, \\(k\\) is related to the wavelength, the 
			frequency, the angular frequency and the speed of light by the 
			following equation.`}</div>
            <div>{`$$
			k=\\frac{2\\pi}{\\lambda}=\\frac{2{\\pi}f}{c}=\\frac{\\omega}{c}
			$$`}</div>
            <div>{`It is also useful to express \\(\\vec{E}\\) in terms of a 
			vector that defines the polarization of the field. To do this we 
			define the amplitude \\(E_0\\) to be`}</div>
            <div>{`$$
			E_0=(E_{0x}^2+E_{0y}^2)^{1/2}
			$$`}</div>
            <div>
                Then we want to define our vector, the polarization vector, to
                be a unit vector. We can define it to be
            </div>
            <div>{`$$
				\\vec\\varepsilon=\\begin{pmatrix}
				E_{0x}/E_0 \\\\ 
				E_{0y}e^{i\\phi}/E_0
				\\end{pmatrix}
			$$`}</div>
            <div>And therefore the field expression can be reduced to</div>
            <div>{`$$
			\\vec{E}=E_0e^{i(kz-wt)}\\vec\\varepsilon
			$$`}</div>
            <h2>Linear polarization</h2>
            <div>{`For this kind of polarization we consider \\(\\phi=0\\). 
			Therefore, our electric field reduces to`}</div>
            <div>{`$$
				\\vec{E}=e^{i(kz-\\omega t)}
				\\begin{pmatrix}
				E_{0x}\\\\
				E_{0y}
				\\end{pmatrix}
			$$`}</div>
            <div>{`and at any given point in time the angle of polarization 
			with respect to the x-axis is given by`}</div>
            <div>{`$$
			\\theta=\\tan^{-1}\\bigg(\\frac{E_{0y}}{E_{0x}}\\bigg)
			$$`}</div>
            <div>{`Since the field always oscillates along a plane, this is 
			said to be linear polarization.`}</div>
            <h2>Circular polarization</h2>
            <div>{`For this kind of polarization we consider 
			\\(\\phi=\\frac{\\pi}{2}\\) and \\(E_{0x}=E_{0y}=E_0\\). 
			Using the real expression for \\(\\vec{E}\\) and \\(z=0\\) we 
			obtain`}</div>
            <div>{`$$
				\\vec{E}=\\begin{pmatrix}
				E_{0x}\\cos(-\\omega t)\\\\
				E_{0y}\\cos(-\\omega t+\\frac{\\pi}{2})
				\\end{pmatrix}
			$$`}</div>
            <div>{`$$
				\\vec{E}=E_{0}\\begin{pmatrix}
				\\cos(\\omega t)\\\\
				\\sin(\\omega t)
				\\end{pmatrix}
			$$`}</div>
            <div>{`From this equation we notice that \\(|\\vec{E}|=E_0\\). It 
			is constant in time and draws a circle. One full rotation is done 
			in a period \\(T\\), where \\(T=\\frac{2\\pi}{\\omega}\\).`}</div>
            <h2>Elliptical polarization</h2>
            <div>{`Any other case where \\(E_{0x}\\), \\(E_{0y}\\) or 
			\\(\\phi\\) are not equal to the values previously discussed will 
			produce a elliptical polarization.`}</div>
        </div>
    )
}

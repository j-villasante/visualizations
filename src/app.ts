import { Parameters } from "./parameters"
import { setupPolarizedField } from "./polarized"
import { setupRetardedField } from "./retarded"

const params = new Parameters()

const polarizedSpace = setupPolarizedField(params)
polarizedSpace.play()

const retardedSpace = setupRetardedField(params)
retardedSpace.play()

document.getElementById("but-stop")?.addEventListener("click", () => {
    polarizedSpace.pause(true)
    retardedSpace.pause(true)
})

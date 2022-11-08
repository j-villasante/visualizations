import { Parameters } from "./parameters"
import { setupPolarizedField } from "./polarized"
import { setupRetardedField } from "./retarded"
import { setupWavePlate } from "./wavePlate"

const params = new Parameters()

const polarizedSpace = setupPolarizedField(params)

const retardedSpace = setupRetardedField(params, {
    elementId: "#retarded",
})

const inTransitSpace = setupRetardedField(params, {
    elementId: "#in-transit",
    type: "in-transit",
})

const wavePlateSpace = setupWavePlate(params);

polarizedSpace.play()
retardedSpace.play()
inTransitSpace.play()
wavePlateSpace.play();

document.getElementById("but-stop")?.addEventListener("click", () => {
    polarizedSpace.pause(true)
    retardedSpace.pause(true)
    inTransitSpace.pause(true)
    wavePlateSpace.pause(true)
})

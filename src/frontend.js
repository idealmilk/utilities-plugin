import React from "react"
import { createRoot } from "react-dom/client"
import UtilitiesView from "./views/utilities"
import "./style.css"

console.log("Waiting for container...")

function mountReactApp() {
  const container = document.getElementById("ntherm-react-root")
  console.log("container is", container)
  if (container) {
    const root = createRoot(container)
    console.log("Mounting <UtilitiesView />")
    root.render(<UtilitiesView />)
    return true
  }
  return false
}

if (!mountReactApp()) {
  const observer = new MutationObserver(() => {
    if (mountReactApp()) {
      observer.disconnect()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
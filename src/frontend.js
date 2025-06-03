import React from "react"
import { createRoot } from "react-dom/client"
import UtilitiesView from "./views/utilities"
import "./style.css"

console.log("Waiting for container...")

function mountReactApp() {
  const container = document.getElementById("ntherm-react-root")
  if (!container || container.getAttribute('data-react-mounted') === 'true') {
    return false
  }

  try {
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <UtilitiesView />
      </React.StrictMode>
    )
    container.setAttribute('data-react-mounted', 'true')
    return true
  } catch (error) {
    console.error('Error mounting React app:', error)
    return false
  }
}

// Try to mount immediately when script loads
if (!mountReactApp()) {
  // If immediate mount fails, observe DOM changes
  const observer = new MutationObserver((mutations, obs) => {
    if (mountReactApp()) {
      obs.disconnect() // Stop observing once mounted
    }
  })

  // Start observing the document with the configured parameters
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// Also try mounting when Elementor frontend is initialized
if (window.elementorFrontend) {
  window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
    mountReactApp()
  })
}
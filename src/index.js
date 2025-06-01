
import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

import UtilitiesView from "./views/utilities"

import "./style.css"
import metadata from "./block.json"

registerBlockType(metadata.name, { edit: EditComponent })

function EditComponent(props) {
  return (
    <div {...useBlockProps()}>
      <div className="my-unique-plugin-wrapper-class">
        <UtilitiesView />
      </div>
    </div>
  )
}

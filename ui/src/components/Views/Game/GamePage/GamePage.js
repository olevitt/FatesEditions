import React from 'react'
import { convertFromRaw, Editor, EditorState, ContentState } from 'draft-js'
import Image from 'components/common/TextEditor/Image'
import GameTransition from './GameTransition'
import styles from './styles.scss'

const GamePage = ({ page = {} }) => {
  const pageContent = page.text ? convertFromRaw(JSON.parse(page.text)) : ContentState.createFromText('')

  const blockRenderer = (block) => {
    if (block.getType() === 'atomic') return { component: Image, editable: false }
    return null
  }
  return (
    <div className={styles.component} >
      <Editor
        editorState={EditorState.createWithContent(pageContent)}
        blockRendererFn={blockRenderer}
        readOnly
      />
      <div className={styles.gameTransitions}>
        {
          !!page.transitions && page.transitions.map(transitionId => <GameTransition
            key={transitionId}
            transitionId={transitionId}
          />)
        }
      </div>
    </div>
  )
}

export default GamePage

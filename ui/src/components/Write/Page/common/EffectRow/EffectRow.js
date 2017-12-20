import React from 'react'
import { SelectInput } from 'components/common'
import EffectInput from './EffectInput'
import styles from './styles.scss'

const EffectRow = ({ book, effect, index, updateResource, removeEffect }) => {
  const updateType = (type) => {
    effect.type = type
    updateResource(index, effect)
  }

  return !!book && (
    <div className={styles.component}>
      <div>
        <SelectInput
          className={styles.selectInput}
          debounce={1}
          domProps={{
            value: effect.type,
            onChange: type => updateType(type),
          }}
        >
          <option disabled value="">{"Source de l'effet"}</option>
          <option value="object">{"L'objet"}</option>
          <option value="stat">{'La statistique'}</option>
        </SelectInput>
        <EffectInput
          book={book}
          type={effect.type}
          effect={effect}
          index={index}
          updateResource={updateResource}
          removeEffect={removeEffect}
        />
      </div>
    </div>
  )
}

export default EffectRow

import React from 'react'
import { SelectInput } from 'components/common'
import styles from './styles.scss'

const ObjectInput = ({ objects, effect, index, updateResource }) => {
  return (
    <div className={styles.component}>
      <SelectInput
        debounce={500}
        className={styles.selectInput}
        domProps={{
          value: effect.subject,
          onChange: subject => updateResource(index, { ...effect, subject }),
        }}
      >
        {objects.map(object => <option key={object._id} value={object._id}>{object.name}</option>)}
      </SelectInput>
      <SelectInput
        className={styles.selectInput}
        debounce={500}
        domProps={{
          value: effect.value,
          onChange: value => updateResource(index, { ...effect, value }),
        }}
      >
        <option value="add">est ajouté</option>
        <option value="remove">est retiré</option>
      </SelectInput>
      <div className={styles.selectInput} />
    </div>
  )
}

export default ObjectInput

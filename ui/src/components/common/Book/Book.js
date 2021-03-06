import React from 'react'
import classnames from 'classnames/bind'
import { ButtonIcon } from 'components/common'
import Loader from 'components/common/Loader'
import styles from './style.scss'
import Infos from './Infos'

const cx = classnames.bind(styles)

class Book extends React.Component {
  constructor(props) {
    super(props)
    const { showDelay, onShow } = props
    this.state = { over: false, displayed: false }
    this.timeOut = setTimeout(() => {
      this.setState({ displayed: true })
      if (onShow) onShow()
    }, showDelay)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  render() {
    const { book, onClick, infos, onDelete } = this.props
    const { expanded, displayed } = this.state
    if (!book) return <Loader />
    const coverStyle = {
      backgroundImage: `url(${book.cover})`,
    }
    const classes = cx(styles.component, {
      expanded,
      displayed,
    })
    return (
      <div
        className={classes}
      >
        { !!onDelete &&
          <div className={styles.delete}>
            <ButtonIcon
              icon="close"
              className={styles.action}
              domProps={{
                onClick: () => onDelete(book.id),
              }}
            />
          </div>
        }
        <div className={styles.cover} onClick={() => onClick && onClick(book.id)}>
          <div className={styles.coverImage} style={coverStyle} />
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              <div className={styles.bookName}>
                {book.name || 'Livre sans titre'}
              </div>
              <Infos infos={infos || [book.author.username]} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book

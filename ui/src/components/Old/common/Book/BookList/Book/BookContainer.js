//eslint-disable-next-line
import { RestHoc as restHoc } from 'react-rest-resource'
import Book from './Book'
import { BookService } from '../../../../../../services'

export default restHoc(Book, BookService)

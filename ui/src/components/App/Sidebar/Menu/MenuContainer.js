import Menu from './Menu'
import { BookService } from 'services'
import { RestHoc as restHoc } from 'react-rest-resource'
export default restHoc(Menu, BookService)
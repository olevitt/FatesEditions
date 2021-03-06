import React from 'react'
import { Box, BoxHeader, BoxBody, BoxFooter } from '../../../common/Box'
import { Button, DataTable } from '../../../common'
import { RouteService } from '../../../../../services'
import styles from './styles.scss'
import PageRow from './PageRow'

const headers = [
  { type: <Button domProps={{ disabled: true }} className="fa fa-pencil md-whiteframe-z1" />, key: 'edit' },
  { type: 'Titre', key: 'title' },
  { type: 'Description', key: 'description' },
  { type: <Button domProps={{ disabled: true }} className="fa fa-close md-whiteframe-z1" />, key: 'delete' },
]

const BookPage = ({ pages = [], query, disabled, postResource, deleteResource }) => {
  const createPage = () => {
    postResource({ ...query, page: {} }).then((page) => {
      RouteService.goTo(RouteService.routes.writebookpage(query.bookId, page._id))
    })
  }

  const { bookId } = query

  return (
    <div className={styles.component}>
      <Box className="box-primary">
        <BoxHeader withBorder>
          <h3 className="box-title">Pages</h3>
          <div className="box-tools pull-right">
            <div className="btn-group" />
          </div>
        </BoxHeader>
        <BoxBody className="table-responsive no-padding">
          <DataTable className="table-hover" headers={headers}>
            {pages.map(page =>
              <PageRow
                pageId={page}
                key={page}
                disabled={disabled}
                bookId={bookId}
                deleteResource={deleteResource}
              />)}
          </DataTable>
        </BoxBody>
        <BoxFooter className={styles.centerFooter}>
          <Button domProps={{ onClick: createPage, disabled }}>
            Ajouter une page
          </Button>
        </BoxFooter>
      </Box>
    </div>
  )
}

export default BookPage

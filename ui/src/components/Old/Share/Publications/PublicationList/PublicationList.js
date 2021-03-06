import React from 'react'
import { Box, BoxHeader, BoxBody } from '../../../common/Box'
import Button from '../../../common/Button'
import DataTable from '../../../common/DataTable'
import PublicationRow from './PublicationRow'
import Modal from '../../../common/Modal'

const headers = [
  { type: 'Titre du livre', key: 'title' },
  { type: 'Genre', key: 'genre' },
  { type: 'Visibilité', key: 'visibility' },
  { type: 'Synopsis', key: 'synopsis' },
  { type: 'Editer', key: 'edit' },
  { type: 'Passer en brouillon', key: 'draft' },
]

class PublicationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: {
        open: false,
        data: null,
      },
    }
  }

  showModal = (data) => {
    this.setState({ modal: { open: true, data } })
  }

  bookToDraft = (book) => {
    const { updateResource } = this.props
    book.draft = true
    updateResource(book)
    this.setState({ modal: { open: false } })
  }

  render() {
    const { books } = this.props
    const { modal } = this.state
    return !!books && (
      <Box className="box-primary">
        <BoxHeader withBorder>
          <h4>Liste Complète</h4>
        </BoxHeader>
        <BoxBody>
          <DataTable headers={headers} className="table-bordered table-hover table-striped">
            {books.map(book => <PublicationRow
              bookId={book}
              key={book}
              showModal={this.showModal}
            />)}
          </DataTable>
        </BoxBody>
        <Modal
          title="Demande de confirmation"
          text={`Êtes vous sur de vouloir repasser ce livre en brouillon, cela supprimera toutes les parties en cours sur ce livre : ${modal.data ? modal.data.name : null} ?`}
          open={modal.open}
          buttons={
            <div>
              <Button
                className="btn-success"
                domProps={{ onClick: () => this.bookToDraft(modal.data) }}
              >
                Oui
              </Button>
              <Button
                className="btn-danger"
                domProps={{ onClick: () => this.setState({ modal: { open: false } }) }}
              >
                Non
              </Button>
            </div>
          }
        />
      </Box>
    )
  }
}

export default PublicationList

import React from 'react'
import BookRow from './BookRow'
import { Box, BoxHeader } from '../Box'

const BookList = ({ books = [] }) => {
  return (
    <Box>
      <BoxHeader withBorder>
        <h3 className="box-title">
          Livres publiés
        </h3>
      </BoxHeader>
      <div className="dataTables_wrapper form-inline" role="grid">
        <div className="row">
          <div className="col-xs-6">
            <div className="dataTables_info" id="example1_info" />
          </div>
          <div className="col-xs-6">
          </div>
        </div>
        <table className="table table-bordered table-hover table-striped dataTable">
          <thead>
            <tr>
              <th rowSpan="1" colSpan="1" style={{width:'10%'}}>
                Titre du livre
              </th>
              <th rowSpan="1" colSpan="1">
                Genre
              </th>
              <th rowSpan="1" colSpan="1">
                Auteur
              </th>
              <th rowSpan="1" colSpan="1">
                Synopsis
              </th>
              <th rowSpan="1" colSpan="1" style={{width:'1%'}}>
                <button disabled className="btn btn-primary md-whiteframe-z1">
                  Jouer
                </button>
              </th>
            </tr>
          </thead>
          <tbody role="alert" aria-live="polite" aria-relevant="all">
            { books.map(book => <BookRow bookId={book} key={book} />) }
          </tbody>
        </table>
        <div className="row">
          <div className="col-xs-6">
          </div>
          <div className="col-xs-6">
            <div className="dataTables_paginate paging_bootstrap">
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default BookList

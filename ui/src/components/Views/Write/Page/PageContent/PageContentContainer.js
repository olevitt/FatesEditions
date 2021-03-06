import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PageContent from './PageContent'

const core = `
  id
  text
`

const query = gql`
  query PageByID ($bookId: ID!, $pageId: ID!) {
    page(bookId: $bookId, pageId: $pageId) {
      ${core}
    }
  }
`

const queryOptions = {
  options: ({ params: { draftId, pageId } }) => ({
    variables: {
      bookId: draftId,
      pageId,
    },
  }),
  props: ({ data: { page } }) => ({
    page,
  }),
}

const mutation = gql`
  mutation updatePage($bookId: ID!, $page: PageInput!) {
    updatePage(bookId: $bookId, page: $page) {
      ${core}
    }
  }
`

const mutationOptions = {
  name: 'updatePage',
}

const PageContentContainer = (props) => {
  const { params: { draftId }, page, updatePage } = props
  const _updatePage = text => updatePage({
    variables: {
      page: { id: page.id, text },
      bookId: draftId,
    },
  })
  return <PageContent {...props} updatePage={_updatePage} />
}

export default compose(
  graphql(query, queryOptions),
  graphql(mutation, mutationOptions),
)(PageContentContainer)

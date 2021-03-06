import React from 'react'
import { Layout, Content, AppToolbar, Tabs, TabContent } from 'components/Layout'
import { RouteService } from 'services'

const tabNews = { label: 'Nouveautés', link: RouteService.routes.booksnews() }
const tabLibrary = { label: 'Bibliothèques', link: RouteService.routes.bookslibrary() }
const tabs = [tabNews, tabLibrary]

const Books = ({ location, children }) => (
  <Layout>
    <AppToolbar location={location.pathname} />
    <Content>
      <Tabs tabs={tabs} selectedTab={location.pathname} />
      <TabContent>
        {children}
      </TabContent>
    </Content>
  </Layout>
)


export default Books

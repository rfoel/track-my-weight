import React from 'react'
import { node } from 'prop-types'
import styled, { css } from 'styled-components/macro'

const Container = styled.div(
  ({
    theme: {
      colors: { primary },
    },
  }) => css`
    align-items: center;
    background-color: ${primary.base};
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  `,
)

const Layout = ({ children }) => <Container>{children}</Container>

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout

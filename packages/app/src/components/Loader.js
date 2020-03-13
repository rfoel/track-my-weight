import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Weight } from '../images/weight.svg'

const Loader = styled.div`
  color: white;
  width: 200px;

  svg {
    width: 100%;
  }
`

export default () => (
  <Loader>
    <Weight />
  </Loader>
)

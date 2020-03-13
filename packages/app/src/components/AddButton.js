import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@1e3/ui'

import { ReactComponent as Weight } from '../images/weight.svg'

const AddButton = styled(Button)`
  svg {
    width: 26px;
  }
`

export default () => (
  <Link to="/add">
    <AddButton>
      <Weight />
    </AddButton>
  </Link>
)

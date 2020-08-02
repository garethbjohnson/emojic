import React from 'react'

import { Name, Options, Wrap } from './style'

export const Title: React.FC = ({ children }) => (
  <Wrap>
    <Name>✨Emojic✨</Name>
    <Options>{children}</Options>
  </Wrap>
)

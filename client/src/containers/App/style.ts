import styled from 'styled-components'

export const Wrap = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  width: 100%;

  > * {
    flex-shrink: 0;
    margin: 8px;
  }
`

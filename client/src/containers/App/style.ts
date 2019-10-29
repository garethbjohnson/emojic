import styled from 'styled-components'

export const Battlefield = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: perspective(64rem) rotateX(30deg) scale(0.6);

  > * {
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
    margin: 8px;
  }
`

export const Hand = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: scale(0.8);

  > * {
    flex-shrink: 0;
    margin: 8px;
  }
`

export const Wrap = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`

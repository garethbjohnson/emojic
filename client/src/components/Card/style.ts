import styled, { css } from 'styled-components'

export const Attribute = styled.li<{ onClick?: Function }>`
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: blue;
      }
    `}
`

export const Attributes = styled.ul`
  background-color: whitesmoke;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 8px;
`

export const Image = styled.h3`
  align-items: center;
  display: flex;
  font-size: 6rem;
  height: 140px;
  justify-content: center;
  margin: 0;
`

export const ManaCost = styled.div`
  padding: 4px;
  position: absolute;
  right: 4px;
  top: 4px;
`

export const PowerToughness = styled.div`
  background-color: whitesmoke;
  border: 4px solid white;
  border-radius: 2px;
  bottom: 4px;
  padding: 8px;
  position: absolute;
  right: 4px;
`

export const Type = styled.div`
  background-color: whitesmoke;
  border-radius: 2px;
  flex-grow: 0;
  padding: 8px;
`

export const Wrap = styled.div<{ isTapped?: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 320px;
  padding: 12px;
  position: relative;
  ${props => props.isTapped && 'transform: rotateZ(90deg);'}
  transition: transform 0.5s;
  user-select: none;
  width: 240px;

  > * + * {
    margin-top: 4px;
  }
`

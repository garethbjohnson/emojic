import styled, { css } from 'styled-components'

const cardHeight = '20rem'
const cardWidth = '15rem'

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
  border-radius: 0.125rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0.5rem;
`

export const Image = styled.h3`
  align-items: center;
  display: flex;
  font-size: 6rem;
  height: 8.75rem;
  justify-content: center;
  margin: 0;
  text-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.5);
`

export const Main = styled.div<{ isTapped?: boolean; onClick?: Function }>`
  backface-visibility: hidden;
  background-color: white;
  border-radius: 0.5rem;
  box-sizing: border-box;
  ${props => props.onClick && 'cursor: pointer;'}
  display: flex;
  flex-direction: column;
  height: 20rem;
  margin: auto;
  padding: 0.75rem;
  position: relative;
  ${props => props.isTapped && 'transform: rotateZ(90deg);'}
  transition: transform 0.5s;
  user-select: none;
  width: 15rem;
  z-index: 2;

  > * + * {
    margin-top: 0.25rem;
  }
`

export const Back = styled(Main)`
  left: 0;
  position: absolute;
  top: 0;
  transform: ${props => props.isTapped && 'rotateZ(90deg)'} rotateY(180deg);
  z-index: 1;
`

export const ManaCost = styled.div`
  padding: 0.25rem;
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
`

export const PowerToughness = styled.div`
  background-color: whitesmoke;
  border: 0.25rem solid white;
  border-radius: 0.125rem;
  bottom: 0.25rem;
  padding: 0.5rem;
  position: absolute;
  right: 0.25rem;
`

export const StatusIcons = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  position: absolute;
  left: 1rem;
  top: 1rem;
`

export const Type = styled.div`
  background-color: whitesmoke;
  border-radius: 0.125rem;
  flex-grow: 0;
  padding: 0.5rem;
`

export const Wrap = styled.div<{ isAttacking?: boolean; isTapped?: boolean }>`
  position: relative;
  width: ${props => (props.isTapped ? cardHeight : cardWidth)};
  ${props => props.isAttacking && 'transform: translateY(-6rem);'}
  transform-origin: center;
  transform-style: preserve-3d;
  transition: transform 0.5s, width 0.2s;
`

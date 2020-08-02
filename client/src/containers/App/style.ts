import styled from 'styled-components'

export const MainBattlefield = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  height: 20rem;
  justify-content: center;
  margin-bottom: 2rem;

  > * {
    flex-shrink: 0;
    margin: 0.5rem;

    > * {
      box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
    }
  }
`

export const Hand = styled.div<{ cardCount: number }>`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  transform: scale(0.9);
  width: 100%;
  z-index: 0;

  > * {
    box-sizing: border-box;
    cursor: pointer;
    max-width: calc(100% / ${(props) => props.cardCount});
    transition: transform 0.2s;

    & + * {
      margin-left: -1rem;
    }

    &:last-child {
      max-width: unset;
    }

    > * {
      box-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
    }

    &:hover {
      transform: translateY(-0.5rem);
      z-index: 1;

      > * {
        box-shadow: 0 0.5rem 0.753rem rgba(0, 0, 0, 0.1);
      }
    }
  }
`

export const HandWrap = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
`

export const LibraryCardWrap = styled.div<{
  index: number
  totalCount: number
}>`
  position: absolute !important;
  transform: translateZ(
    ${(props) => 0.125 * (props.totalCount - props.index)}rem
  );
  transform-style: preserve-3d;
  z-index: ${(props) => props.totalCount - props.index};

  &:last-child {
    height: 20rem;
  }

  > * {
    transform: rotateY(180deg);

    > * {
      box-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
    }
  }
`

export const LibraryWrap = styled.div`
  flex-shrink: 0;
  margin-right: 1rem;
  width: 15rem;
`

export const LibraryManaWrap = styled.div`
  display: flex;
  height: 20rem;
  z-index: 2;
`

export const ManaWrap = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-shrink: 1;

    & + * {
      margin-left: 1rem;
    }

    > * {
      box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
    }
  }
`

export const ManaPool = styled.span`
  text-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.2);
`

export const StartButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.25);
  color: darkslategrey;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  margin-top: 2rem;
  padding: 2rem 2.5rem;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.15);
    transform: translateY(-0.5rem);

    &:active {
      box-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
      transform: translateY(0.25rem);
    }
  }
`

export const Table = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 18.75rem);
  justify-content: center;
  left: 0;
  margin-top: -4rem;
  position: absolute;
  top: 0;
  transform: perspective(128rem) rotateX(30deg) scale(0.75);
  transform-style: preserve-3d;
  width: 100%;
  z-index: 1;
`

export const Toolbar = styled.div`
  align-content: center;
  align-items: baseline;
  display: flex;
  justify-content: center;

  > * + * {
    margin-left: 1rem;
  }
`

export const Wrap = styled.div`
  align-items: center;
  height: 100%;
  width: 100%;
`

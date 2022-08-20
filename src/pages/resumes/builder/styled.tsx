import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: 1.5rem;
`
export const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`

export const Heading = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  p {
    font-size: 1.125rem;
    margin-left: 1.5rem;
  }
  svg {
    margin-bottom: 0.4rem;
  }
`

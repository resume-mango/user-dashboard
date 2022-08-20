import styled from 'styled-components'

export const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  overflow: hidden;
`

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;

  a {
    margin: 0 1rem;
    font-weight: 600;
    min-width: fit-content;
  }
`

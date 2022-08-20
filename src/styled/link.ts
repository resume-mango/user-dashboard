import styled from 'styled-components'

export const StyledLink = styled.a`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  width: fit-content;
  display: block;
  &:after {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: all ease 0.3s;
    transform-origin: 0;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`

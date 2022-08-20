import styled from 'styled-components'

export const Badge = styled.span<{
  type: 'success' | 'ghost' | 'info' | 'primary' | 'danger'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.7rem;
  height: fit-content;
  background-color: ${({ type, theme }) =>
    type === 'success'
      ? 'rgb(67 196 66 / 30%)'
      : type === 'ghost'
      ? '#eee'
      : type === 'primary'
      ? theme.shades.primary[3]
      : type === 'danger'
      ? theme.shades.danger
      : theme.shades.info};
  color: ${({ theme }) => theme.shades.dark[1]};
  text-transform: capitalize;
  font-size: 0.75rem;
  border-radius: 4px;
  @media (max-width: 1300px) {
    font-size: 0.7rem;
  }
`

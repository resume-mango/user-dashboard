import styled from 'styled-components'

export const Button = styled.button<{
  btnType?: 'primary' | 'secondary' | 'ghost' | 'text' | 'link'
  size?: 'lg' | 'sm' | 'xl'
  fontSize?: string
  backgroundColor?: string
  color?: string
}>`
  background-color: ${({ btnType, theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : btnType === 'secondary' || btnType === 'text' || btnType === 'link'
      ? theme.colors.white
      : btnType === 'ghost'
      ? theme.colors.light
      : theme.colors.primary};
  height: ${({ size }) =>
    size === 'xl' ? '48px' : size === 'lg' ? '40px' : '32px'};
  color: ${({ btnType, theme, disabled, color }) =>
    !disabled
      ? color
        ? color
        : btnType === 'secondary' || btnType === 'link'
        ? theme.colors.primary
        : btnType === 'ghost' || btnType === 'text'
        ? theme.colors.dark
        : theme.colors.white
      : theme.colors.white};
  border: 1px solid
    ${({ btnType, theme, disabled }) =>
      !disabled
        ? btnType === 'secondary' || btnType === 'primary'
          ? theme.colors.primary
          : 'transparent'
        : 'transparent'};
  user-select: none;
  font-size: ${({ fontSize }) => fontSize || '0.875rem'};
  text-align: center;
  justify-content: center;
  font-weight: normal;
  font-style: normal;
  letter-spacing: 0.035em;
  width: ${({ size }) => (size === 'xl' ? '200px' : '150px')};
  padding: 0;
  border-radius: 4px;
  margin: 0;
  transition: background 300ms ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    ${({ btnType, theme }) =>
      btnType === 'primary'
        ? `box-shadow: 0 0 1px 3px ${theme.shades.primary[3]}`
        : btnType === 'secondary'
        ? `background-color: ${theme.colors.primary}; color:#fff;`
        : btnType === 'ghost'
        ? `background-color: #e6e6e6`
        : null};
  }

  @media (max-width: 834px) {
    width: ${({ size }) => (size === 'xl' ? '160px' : '115px')};
    height: ${({ size }) =>
      size === 'xl' ? '40px' : size === 'lg' ? '40px' : '32px'};
    font-size: 0.875rem;
  }
  @media (max-width: 480px) {
    width: ${({ size }) => (size === 'xl' ? '130px' : '100px')};
    height: ${({ size }) =>
      size === 'xl' ? '32px' : size === 'lg' ? '40px' : '32px'};
    font-size: 0.75rem;
  }
`

export const LinkButton = styled.span`
  display: flex;
  height: 32px;
  align-items: center;
  width: fit-content;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
`

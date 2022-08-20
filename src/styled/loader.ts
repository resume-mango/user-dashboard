import styled, { keyframes } from 'styled-components'

const animateSkeleton = keyframes`
to{
     opacity: 0.5
   }`

const spin = keyframes`
to { transform: rotate(360deg);
}`

export const SK_Wrapper = styled.div.attrs({ className: 'loader-wrapper' })`
  animation: ${animateSkeleton} 1s ease infinite alternate;
`

export const SK_Thumbnail = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 6px;
  background-color: #eee;
`
export const SK_Circle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #eee;
`
export const SK_Heading = styled.div`
  width: 100%;
  height: 25px;
  background-color: #eee;
  border-radius: 6px;
`
export const SK_Text = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '70%')};
  height: 15px;
  background: #eee;
  border-radius: 6px;
`
export const SK_Form_Label = styled.div`
  width: 25%;
  height: 10px;
  background: #eee;
  border-radius: 4px;
`
export const SK_Form_Input = styled.div`
  width: 100%;
  height: 48px;
  background: #eee;
  border-radius: 6px;
`

export const Spinner = styled.div.attrs({ className: 'loading-spinner' })<{
  size: string
  type?: 'primary' | 'white'
}>`
  display: inline-block;
  width: ${({ size }) => size || '1.5rem'};
  height: ${({ size }) => size || '1.5rem'};
  border: ${({ type, theme }) =>
    `3px solid ${
      type === 'primary' ? theme.shades.primary[4] : 'rgba(255, 255, 255, 0.3)'
    }`};
  border-radius: 50%;
  border-top-color: ${({ type, theme }) =>
    type === 'primary' ? theme.colors.primary : theme.colors.white};
  animation: ${spin} 1s ease-in-out infinite;
`
const dots = (color: string) => keyframes`
   0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: ${color};
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 ${color};
    }
    
`

export const LoadingDots = styled.p<{ color?: string }>`
  display: inline-flex;
  margin: 0;
  color: ${({ theme, color }) => (color ? color : theme.colors.dark)};
  &:after {
    content: '.';
    margin-left: 0.1rem;
    animation: ${({ theme, color }) => dots(color ? color : theme.colors.dark)}
      1s steps(5, end) infinite;
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100%;
  p {
    margin-top: 1rem;
  }
`

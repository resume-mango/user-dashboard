import { fireEvent, render } from '@testing-library/react'
import { Fragment } from 'react'
import detectOutsideClick from '../../hooks/detectOutsideClick'

describe('Detect Single Outside Click', () => {
  const Wrapper = () => {
    const { ref, isOutside } = detectOutsideClick()

    return (
      <Fragment>
        <div className="outside"></div>
        <div className="wrapper" ref={ref}>
          <div className="child1"></div>
        </div>
        <p>Is Outside: {isOutside ? 'true' : 'false'}</p>
      </Fragment>
    )
  }

  test('Should render successfully', () => {
    const { container, getByText } = render(<Wrapper />)
    const outside = container.getElementsByClassName('outside')[0]
    const wrapper = container.getElementsByClassName('wrapper')[0]
    const child = container.getElementsByClassName('child1')[0]
    const isout = getByText(/Is Outside/i)
    fireEvent.mouseDown(child)
    expect(isout.textContent).toBe('Is Outside: false')
    fireEvent.mouseDown(wrapper)
    expect(isout.textContent).toBe('Is Outside: false')
    fireEvent.mouseDown(outside)
    expect(isout.textContent).toBe('Is Outside: true')
    expect(1).toBe(1)
  })
})

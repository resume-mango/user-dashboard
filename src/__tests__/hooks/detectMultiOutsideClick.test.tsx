import { fireEvent, render } from '@testing-library/react'
import { Fragment, useState } from 'react'
import detectMultiOusideClick from '../../hooks/detectMultiOusideClick'

describe('Detect Multiple Outside Clicks Hook', () => {
  const Wrapper = () => {
    const [show, setshow] = useState<any>(null)
    const { ref } = detectMultiOusideClick(setshow, 'ignored')
    return (
      <Fragment>
        <div className="ignored" onMouseDown={() => setshow('ignored')}></div>
        <div
          className="not-ignored"
          onMouseDown={() => setshow('not-ignored')}
        ></div>

        <div className="detect-wrapper" ref={ref}>
          <div
            className="child1 isVisible"
            onMouseDown={() => setshow('child1')}
          ></div>
          <div className="child2" onMouseDown={() => setshow('child2')}></div>
        </div>
        <p>show: {show ? show : 'null'}</p>
      </Fragment>
    )
  }
  test('should render successfully', async () => {
    const { getByText, container, debug } = render(<Wrapper />)
    const wrapper = container.getElementsByClassName('detect-wrapper')[0]
    const ignored = container.getElementsByClassName('ignored')[0]
    const notIgnored = container.getElementsByClassName('not-ignored')[0]

    const child1 = container.getElementsByClassName('child1')[0]
    const child2 = container.getElementsByClassName('child2')[0]
    expect(getByText(/show:/i).textContent).toBe('show: null')
    fireEvent.mouseDown(child1)
    expect(getByText(/show:/i).textContent).toBe('show: child1')
    fireEvent.mouseDown(child2)
    expect(getByText(/show:/i).textContent).toBe('show: child2')
    fireEvent.mouseDown(ignored)

    expect(getByText(/show:/i).textContent).toBe('show: ignored')

    fireEvent.mouseDown(notIgnored)
    expect(getByText(/show:/i).textContent).toBe('show: not-ignored')
  })
})

import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  SK_Form_Input,
  SK_Form_Label,
  SK_Heading,
  SK_Text,
  SK_Thumbnail,
  SK_Wrapper
} from '../../styled/loader'

const TemplateFormSekleton = () => {
  return (
    <Fragment>
      <LHSLoader>
        <SK_Wrapper>
          <Grid className='mb-3'>
            <div>
              <SK_Heading />
              <SK_Text width='95%' />
              <SK_Text width='75%' />
            </div>
            <SK_Thumbnail />
          </Grid>
          <Grid>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
            <div>
              <SK_Form_Label />
              <SK_Form_Input />
            </div>
          </Grid>
        </SK_Wrapper>
      </LHSLoader>
    </Fragment>
  )
}

export default TemplateFormSekleton

const LHSLoader = styled.div`
  padding: 2.75rem;
  max-width: 900px;
  margin: auto;
`
const Grid = styled.div<{ columns?: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns ? columns : 'repeat(2, 1fr)'};
  grid-gap: 2rem;
  margin-top: 1.5rem;
  align-items: center;
  ${SK_Thumbnail} {
    width: 100px;
    height: 100px;
  }
  ${SK_Heading} {
    margin-bottom: 1.7rem;
  }
  ${SK_Text} {
    margin-bottom: 0.8rem;
  }
  ${SK_Form_Label} {
    margin-bottom: 0.5rem;
  }
`

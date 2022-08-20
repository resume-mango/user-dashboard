import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  SK_Circle,
  SK_Form_Label,
  SK_Heading,
  SK_Text,
  SK_Thumbnail,
  SK_Wrapper
} from '../../styled/loader'

const PreviewSkeleton = ({
  style,
  scale
}: {
  style?: React.CSSProperties | undefined
  scale: number
}) => {
  const styles = {
    ...(style && style),
    ...(scale ? { transform: `scale(${scale})` } : { transform: 'scale(0.6)' })
  }
  return (
    <Fragment>
      <PreviewLoader className='template_skeleton' style={styles}>
        <SK_Wrapper>
          <Grid columns='30% 60%'>
            <PreviewAvatar>
              <SK_Circle />
            </PreviewAvatar>

            <div>
              <SK_Heading />
              <SK_Text />
            </div>
          </Grid>
          <Grid
            columns='40% 55%'
            style={{
              borderTop: ' 1px solid #ddd',
              height: '100%'
            }}
          >
            <div
              style={{
                borderRight: ' 1px solid #ddd',
                height: '100%',
                padding: '3rem 2rem 3rem 0'
              }}
            >
              <Blocks>
                <SK_Heading />
                <SK_Text width='75%' />
              </Blocks>
              <Blocks>
                <SK_Heading />
                <SK_Text width='75%' />
                <SK_Text width='65%' />
              </Blocks>
              <Blocks>
                <SK_Heading />
                <SK_Text width='95%' />
                <SK_Text width='55%' />
              </Blocks>
            </div>
            <div
              style={{
                height: '100%',
                padding: '3rem 2rem 3rem 0'
              }}
            >
              <Blocks>
                <SK_Heading />
                <SK_Text width='90%' />
                <SK_Text width='95%' />
                <SK_Text width='75%' />

                <br />
                <SK_Text width='95%' />
                <SK_Text width='80%' />
                <SK_Text width='55%' />
              </Blocks>
              <br />
              <Blocks>
                <SK_Heading />
                <SK_Text width='90%' />
                <SK_Text width='95%' />
                <SK_Text width='75%' />
              </Blocks>
              <br />
              <Blocks>
                <SK_Heading />
                <SK_Text width='90%' />
                <SK_Text width='95%' />
              </Blocks>
            </div>
          </Grid>
        </SK_Wrapper>
      </PreviewLoader>
    </Fragment>
  )
}

export default PreviewSkeleton

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

const PreviewLoader = styled.div`
  display: flex;
  flex-direction: column;
  height: 297mm;
  width: 210mm;
  background-color: #fff;
  padding: 2rem;
  ${SK_Circle} {
    width: 100px;
    height: 100px;
  }
`
const PreviewAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Blocks = styled.div`
  margin-bottom: 4rem;
`

import React, { Fragment } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { SK_Wrapper, Spinner } from "../../../styled/loader"
import { getAllCoverLetterTemplates } from "../../../queries/coverLetterQueries"

const CoverLetterTemplates = () => {
  const { data, isLoading, isError } = getAllCoverLetterTemplates()
  // const [loading, setLoading] = useState<string | null>(null)

  const history = useHistory()
  // const queryClient = useQueryClient()
  // const { setNotify } = useNotify()

  // const createNewResume = async (name: string) => {
  //   if (loading) return
  //   setLoading(name)
  //   try {
  //     const { data: resData, error } = await newCoverLetter()
  //     if (resData) {
  //       resData.template = name
  //       queryClient.setQueryData(['coverletter', resData._id], resData)
  //       history.push(`edit/${resData._id}`)
  //     }
  //   } catch (err) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to create design',
  //     })
  //   }
  //   setLoading(null)
  // }

  return (
    <Fragment>
      <Wrapper>
        {isError ? (
          <div className="align-center" style={{ height: "30vh" }}>
            <h3>Failed to load templates!</h3>
          </div>
        ) : !data || isLoading ? (
          <SK_Wrapper>
            <GridWrapper>
              {[...Array(12)].map((item, i) => (
                <Fragment key={i}>
                  <SkeletonItem />
                </Fragment>
              ))}
            </GridWrapper>
          </SK_Wrapper>
        ) : (
          <GridWrapper data-test-id="template-grid">
            {(data as any).map((item: any, i: number) => (
              <ItemWrapper
                key={i}
                onClick={() => history.push(`new/${item.name}`)}
                data-test-id="template"
              >
                <Item>
                  <img src={item.thumbnail} />
                  <Fragment>
                    <Loader>
                      <Spinner size="1.5rem" type="primary" />
                    </Loader>
                  </Fragment>
                </Item>
                <p>{item.friendly_name || item.name}</p>
              </ItemWrapper>
            ))}
          </GridWrapper>
        )}
      </Wrapper>
    </Fragment>
  )
}

export default CoverLetterTemplates

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  display: block;
  background-color: #cfcfcf5c;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 2rem;
`

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 3rem 2rem;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`
const SkeletonItem = styled.div`
  border-radius: 6px;
  background-color: #eee;
  min-height: 325px;
  min-width: 230px;
  max-width: 230px;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  @media (max-width: 480px) {
    min-height: 225px;
    min-width: 150px;
    max-width: 150px;
  }
`
const Item = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  min-height: 325px;
  min-width: 230px;
  margin: 0 auto;
  padding: 0;
  background-color: #eee;
  transition: ease-in-out 0.15s;
  outline: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 4px 8px 15px 6px #eeeeee78;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 480px) {
    min-height: 225px;
    min-width: 150px;
  }
`
const ItemWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  margin: 0 auto;

  p {
    text-transform: capitalize;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    transition: ease-in-out 0.3s;
  }
  &:hover {
    ${Item} {
      outline-color: ${({ theme }) => theme.shades.primary[2]};
      outline-width: 4px;
    }
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

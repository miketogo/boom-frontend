import styled from "styled-components/macro";
import "./index.css";
const Spinner = styled.div`
    & div:after {
        background: ${({theme}) => theme.textColor};
    }
`
export default function Loader() {
    return (
        <Spinner className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Spinner>
    )
}

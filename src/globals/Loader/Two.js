import styled from "styled-components/macro";
import "./two.css";
const Spinner = styled.div`
    & div {
        border: 8px solid ${({theme}) => theme.textColor};
        border-color: ${({theme}) => theme.textColor} transparent transparent transparent;
    }
`
export default function Two() {
    return (
        <Spinner className="lds-ring"><div></div><div></div><div></div><div></div></Spinner>
    )
}

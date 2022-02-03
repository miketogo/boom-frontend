import { useState } from "react";
import styled from "styled-components/macro";

const Wrapper = styled.aside`
    font-size: 22px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    line-height: 30px;
    gap: 10px;
    height: fit-content;
    position: sticky;
    top: 50px;
    @media(max-width: 1300px) {
        display: none;
    }
`;
const Items = styled.a`
    text-decoration: none;
    color: ${({theme}) => theme.textColor};
    position: relative;
    padding-left: 13px;
`
const HovrIcn = styled.div`
    background: #4B75FC;
    width: 15px;
    height: 3px;
    position: absolute;
    left: -10px;
    top: 50%;
    border-radius: 1.5px;
`
const itemslist = [
    "Мой тариф",
    "Услуги",
    "Роуминг",
    "Группы",
    "Детализация",
];
export default function Aside() {
    const [clicked, setClicked] = useState(0);
    return (
        <Wrapper>
            {itemslist.map((it, idx) =>
                <Items key={it} href={`#${it}`} onClick={()=>setClicked(idx)}>
                    {clicked === idx && <HovrIcn />}
                    {it}
                </Items>
            )}
        </Wrapper>
    )
}

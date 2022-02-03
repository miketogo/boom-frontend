import { motion } from "framer-motion";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components/macro";

const Line = styled.div`
    height: 5px;
    width: 100%;
    margin: 30px auto 30px;
    background: ${({service}) => service ? "rgba(75, 108, 253, 0.4)" : "rgba(255, 255, 255, 0.44)"};;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 2.5px;
    cursor: pointer;
    @media(max-width: 720px) {
      width: 100%;
  }
`;
const Thumb = styled(motion.div)`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({service}) => service ? "#4B75FC" : "#fff"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  z-index: 2;
`;

const Breakpoints = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  @media(max-width: 720px) {
    width: 100%;
}
`;
const Breakpoint = styled.span`
  width: 12px;
  height: 12px;
  background: ${({service}) => service ? "#4B75FC" : "#fff"};;
  border: 1px solid;
  border-radius: 50%;
  border: none;
`;

const Level = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  background: ${({service}) => service ? "#4B75FC" : "#fff"};;
  border-radius: 2.5px;
`;

const TariffBar = ({vip, handlePositionChange, service}) => {
  const [location, setLocation] = useState("0px");
  const moveTo = (e) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const location = clientX - left;
    const step1 = width / 3;
    const error = step1 / 5;
    const half = width / 2;
    if(vip) {
      if(location >= half) {
        setLocation(3 * step1 - 21 + "px");
        handlePositionChange(1)
      } else {
        setLocation("0px");
        handlePositionChange(0)
      }
    } else {
      if (location > error && location <= step1 + error) {
        setLocation(step1 - 13 + "px");
        handlePositionChange(1)
      } else if (location > step1 + error && location <= 2 * step1 + error) {
        setLocation(2 * step1 - 17 + "px");
        handlePositionChange(2)
      } else if (location > 2 * step1 + error) {
        setLocation(3 * step1 - 21 + "px");
        handlePositionChange(3)
      } else {
        setLocation("0px");
        handlePositionChange(0)
      }
    }
  };

  return (
    <Line service={service} onClick={moveTo}>
        <Level
            animate={{ width: location }}
            transition={{ duration: 0.7, type: "spring" }}
            location={location}
            service={service}
        />
        <Thumb
            animate={{ x: location }}
            transition={{ duration: 0.7, type: "spring" }}
            onClick={(e) => e.stopPropagation()}
            location={location}
            service={service}
        >
            <MdKeyboardArrowLeft size={20} color={service ? "#fff" : "#4B74FC"} />
            <MdKeyboardArrowRight size={20} color={service ? "#fff" : "#4B74FC"} />
        </Thumb>
        <Breakpoints>
            <Breakpoint service={service} />
            <Breakpoint service={service} />
            {vip || 
            <><Breakpoint service={service} />
            <Breakpoint service={service} /></>}
        </Breakpoints>
    </Line>
  );
};

export default TariffBar;
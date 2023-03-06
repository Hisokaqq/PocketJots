import React from 'react'
import styled from "styled-components"
import {motion} from "framer-motion"
const HomeScreen = () => {
  return (
    <StyledHome>
        <div className="container">
            <div className="left">
             PocketJots
            </div>
            <div className="right"></div>
        </div>
    </StyledHome>
  )
}
const StyledHome = styled(motion.div)`
    width: 100%;
    height: 100vh;
    position: relative;
    .container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(29,29,29, .6);
        border-radius: 1rem;
        width: 80%;
        height: 80vh;
        box-shadow: 0 0 20px 20px rgba(29,29,29, .4) inset;
        border: 2px solid white;
    }
    
`
export default HomeScreen
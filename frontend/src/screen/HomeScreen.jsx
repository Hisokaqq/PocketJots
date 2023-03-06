import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { AnimatePresence, color, motion} from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Note from '../components/Note';
import { Reorder } from "framer-motion"
function hexToRgba(hex, opacity) {
    const hexWithoutHash = hex.replace('#', '');
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

const dotAnim = {
    open: (i) => ({
      y: [-40, 0],
      opacity: 1,
      scaleY:[3,1],
      mixBlendMode: "difference",
      transition: {
        delay: i * .2,
      },
    }),
    
    close: (i) => ({
        y: -240,
        opacity: 0,
        // scale: 0.5,
        scaleY: 2,
        transition: {
        duration: .2,
      },
    }),
  };
  
  
  const dotContAnim = {
    open: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
        
      },
    },
    close: {},
  };
  
  const plusAnim = {
    rotateClockwise: {
      rotate: 360-45,
      transition: {
        duration: .7,
      },
    },
    rotateCounterClockwise: {
      rotate: -360,
      transition: {
        duration: .5,
      },
    },
  };
  
  const HomeScreen = () => {
    const [isRotated, setIsRotated] = useState(false);
    const [notes, setNotes] = useState([{color: "FFCF7D"}])
    const [isFirstNoteAdded, setIsFirstNoteAdded] = useState(false);
    const [prev, setPrev] = useState([])
    const [disabled, setDisabled] = useState(false);
    const handlePlusClick = () => {
        setDisabled(true)
        setIsRotated((prevState) => !prevState);
        
    };
    const [color, setColor] = useState(null)
    
    const HandleAddNote = (color) =>{
        setColor(color)
        setPrev(notes);
        setNotes([]);
        
    }
      
      useEffect(() => {
        if (prev.length > 0 && notes.length === 0) {
          setNotes([{color: color}, ...prev]);
        }
      }, [notes, prev]);
      
      
      
    
  
    return (
      <StyledHome>
        <div className="container">
          <div className="left">
            <p className="logo">PocetJots</p>
            <div className="notes-container">
              <StyledPlus
                disabled={disabled}
                animate={isRotated ? "rotateClockwise" : "rotateCounterClockwise"}
                variants={plusAnim}
                onClick={handlePlusClick}
                onAnimationComplete={() => setDisabled(false)}
              />
              <StyledDots
                variants={dotContAnim}
                animate={isRotated ? "open" : "close"}
              >
                <motion.div
                  className="dot"
                  style={{ background: "#FFCF7D", position: "absolute", top: 40 }}
                  variants={dotAnim}
                  custom={0}
                  whileHover={{scale:1.1}}
                  onClick={()=>HandleAddNote("#FFCF7D")}
                />
                <motion.div
                  className="dot"
                  style={{ background: "#F0A177", position: "absolute", top: 80 }}
                  variants={dotAnim}
                  custom={1}
                  whileHover={{scale:1.1}}
                  onClick={()=>HandleAddNote("#F0A177")}
                />
                <motion.div
                  className="dot"
                  style={{ background: "#B095F6", position: "absolute", top: 120 }}
                  variants={dotAnim}
                  custom={2}
                  whileHover={{scale:1.1}}
                  onClick={()=>HandleAddNote("#B095F6")}
                />
                <motion.div
                  className="dot"
                  style={{ background: "#55CFFA", position: "absolute", top: 160 }}
                  variants={dotAnim}
                  custom={3}
                  whileHover={{scale:1.1}}
                  onClick={()=>HandleAddNote("#55CFFA")}
                />
                <motion.div
                  className="dot"
                  style={{ background: "#E6EE96", position: "absolute", top: 200 }}
                  variants={dotAnim}
                  custom={4}
                  whileHover={{scale:1.1}}
                  onClick={()=>HandleAddNote("#E6EE96")}
                />
              </StyledDots>
            </div>
          </div>
          <StyledRight>
            <StyledSearchBar>
                <input type="text"  placeholder='Search for a note'/>
                <div className='icon'>
                    asdasda
                </div>
            </StyledSearchBar>
            <div className="data">
                {/* <Reorder.Group axis="x" values={notes} onReorder={setNotes}> */}
                {notes.map((note, index) => (
                    <Note key={index} note={note} id={index}/>
                ))}
                {/* </Reorder.Group> */}
            </div>
          </StyledRight>
        </div>
      </StyledHome>
    );
  };
  

  const StyledDots = styled(motion.div)`
    height: 300px;
    width: 30px;
    margin: auto;
    /* background-color: red; */
    overflow: hidden;
    position: relative;

    .dot {
      left: 5px;
      width: 20px;
      aspect-ratio: 1;
      border-radius: 50%;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, .5);
    }
  `;

const StyledNote = styled(motion.div)`
    background-color: rgba(255, 207, 125, 1);
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .date{
        margin-left: 1rem;
        margin-bottom: .3rem;
        color: #0000006a;
    }
    textarea {
        all: unset;
        flex: 1;
        color: #000;
        font-size: 1.5rem;
        padding: 1rem;
        font-family: 'Roboto', sans-serif;
        resize: none;
        overflow-wrap: break-word;
        white-space: pre-wrap;
        
        &::placeholder{
            color: #2e2e2e94;
        }
    }

`

const StyledRight = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    .data{
        width: 100%;
        height: 100%;
        padding: 1rem 3rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        overflow-y: scroll;

    }
`

const StyledSearchBar = styled(motion.div)`
    width: 100%;
    height: 4rem;
    display: flex;
    background-color: rgba(29, 29, 29, 0.6);
    padding: .2rem 1rem;
    align-items: center;
    input{
        all: unset;
        color: #fff;
        flex: 1;
        font-family: 'Roboto', sans-serif;
    }
    .icon{
        color: #fff;
    }
`


const StyledHome = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: relative;

  .notes-container {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .container {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(29, 29, 29, 0.6);
    width: 100%;
    height: 100vh;
    box-shadow: 0 0 20px 20px rgba(29, 29, 29, 0.4) inset;
    display: flex;

    .left {
        
      width: 7rem;
      height: 100%;
      background-color: rgba(29, 29, 29, 0.4);
      display: flex;
      align-items: center;
      flex-direction: column;
      border-right: #dddddd 2px solid;

      .logo {
        color: white;
        font-weight: 700;
        padding: 1rem 0.7rem;
        margin-top: .4rem;
      }
    }
  }
`;


const StyledPlus = styled(motion.button)`
  all:unset;
  z-index: 3;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 1);
  transition: all .3s ease-out;
  &:hover{
    background-color: #aaaaaa;
  }
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 20px;
    background-color: #000;
  }

  &::before {
    transform: rotate(90deg);
  }
`;
export default HomeScreen;

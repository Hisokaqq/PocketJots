import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";

function hexToRgba(hex, opacity) {
    const hexWithoutHash = hex.replace('#', '');
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }


  
  const Note = ({ note, color, id }) => {
    const noteVariants = {
        default:{
    
        },
        hidden: { 
            // opacity: 0,
            scale: .07,
            borderRadius: 1000,
            x: 0,
            y: -170,
            position: "static",
            background: hexToRgba(note.color, 1)
            
    
         },
        visible: { 
            x: [100,-100,0],
            y: 0,
            opacity: 1,
            scale: 1, 
            borderRadius: 16,
            // position: ["absolute", "absolute", "static"],
            background: "rgba(29, 29, 29, 0.6)",
            transition: { 
                x:{
                    duration: 1
                },
                y:{
                    duration: 1
                },
                scale:{
                    delay: 1,
                    duration: 1
                },
                borderRadius:{
                    delay: .7,
                    duration: 1
                },
    
                duration: 3
             } 
        },
      };
      

    const [value, setValue] = useState(note.color);
    
    
    useEffect(() => {
      setValue(note.color);
    }, [note.color]);
  
    return (
      <StyledNote
        color={hexToRgba(note.color, 1)}
        variants={noteVariants}
        initial={id === 0 ? "hidden" : null}
        animate={id === 0 ? "visible" : "default"}
      >
        <textarea
          spellCheck={false}
          placeholder="Make some notes"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        ></textarea>
        <p className="date">{id}</p>
      </StyledNote>
    );
  };
  

const StyledNote = styled(motion.div)`
    
    
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 103333;
    background: rgba(29, 29, 29, 0.6);
    border: 2px solid ${(props) => props.color};
    .date{
        margin-left: 1rem;
        margin-bottom: .3rem;
        color: #0000006a;
        
    }
    textarea {
        all: unset;
        flex: 1;
        color: #fff;
        font-size: 1.5rem;
        padding: 1rem;
        font-family: 'Roboto', sans-serif;
        resize: none;
        overflow-wrap: break-word;
        white-space: pre-wrap;
        
        &::placeholder{
            color: #ffffffc7;
        }
    }
`

export default Note
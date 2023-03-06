import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { motion,  } from "framer-motion";

function hexToRgba(hex, opacity) {
    const hexWithoutHash = hex.replace('#', '');
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }


  const Note = ({ note, color, id }) => {
    const [value, setValue] = useState(note);
  
    useEffect(() => {
      setValue(note);
    }, [note]);
  
    return (
      <StyledNote layoutId={id} style={{ background: hexToRgba("#FFCF7D", 7) }}>
        <textarea
          spellCheck={false}
          placeholder="Make some notes"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        ></textarea>
        <p className="date">{note}</p>
      </StyledNote>
    );
  };
  

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

export default Note
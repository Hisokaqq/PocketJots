import React, { useEffect, useState, useLayoutEffect } from 'react'
import styled from "styled-components";
import {  motion, useAnimation } from "framer-motion";
import axios from 'axios';
import Moment from 'react-moment';
const inviseAnim = {
  default:{

  },
  hidden:{
    opacity :0,
  },
  visible:{
    opacity: 1,
    transition:{
      delay: 2
    }
  }

}
function hexToRgba(hex, opacity) {
    const hexWithoutHash = hex.replace('#', '');
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }


  
  const Note = ({ note, id, setIsDragging, isDragging, from, setNotes, notes, setFrom}) => {
    // console.log(note)
    // console.log(from)

    const noteVariants = {
        default:{
          borderRadius: 16,
          
        },
        hidden: { 
            // opacity: 0,
            scale: .07,
            borderRadius: 1000,
            x: 0,
            y: -170,
            // position: "static",
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
        delete:{
          scale:0,
          borderRadius: 1000,
          border: "2px solid red",
          transition:{
            duration:.4
          }
        }
      };
      
      const [screenDimensions, setScreenDimensions] = useState({
        height: typeof window !== "undefined" ? window.innerHeight : 0,
        width: typeof window !== "undefined" ? window.innerWidth : 0
      });
    
      // Update screen dimensions if window size changes
      useLayoutEffect(() => {
        function updateScreenDimensions() {
          setScreenDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          });
        }
    
        window.addEventListener("resize", updateScreenDimensions);
    
        return () => window.removeEventListener("resize", updateScreenDimensions);
      }, []);
    


    const [value, setValue] = useState(note.text);
    useEffect(() => {
      setValue(note.text);
    }, [note.text]);
    const [ownDrag, setOwnDrag] = useState(false)
    const deleteHandler = async () =>{
      const profileData = localStorage.getItem('profile');
      const profileObject = JSON.parse(profileData);
      const profileId = profileObject.id;
      
      
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/notes/delete/${note.id}/`);
        // setisdelete(true)
        const response2 = await axios.get(`http://127.0.0.1:8000/api/notes/profile/${profileId}/`);
        setisdelete(true)
              // setNotes(response2.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    
    // useEffect(() => {
    //   setValue(note.color);
    // }, [note.color]);

    const [isdeleted, setisdelete] = useState(false)
    const profileData = localStorage.getItem('profile');
      const profileObject = JSON.parse(profileData);
      const profileId = profileObject.id;
    const updateNoteText = async (e) => {
      setValue(e.target.value)
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/notes/update/${note.id}/`, { text: e.target.value });
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    

    return (
      <StyledNote
        onDoubleClick={deleteHandler}
        color={hexToRgba(note.color, 1)}
        variants={noteVariants}
        initial={isdeleted ? "default" : (id === 0  && from) ? "hidden" : "default"}
        animate={isdeleted ? "delete" : (id === 0  && from) ? "visible" : "default"}
        
        drag
        dragConstraints={{
        top: -screenDimensions.height,
        right: screenDimensions.width,
        bottom: screenDimensions.height,
        left: -screenDimensions.width
      }}
        dragSnapToOrigin
        style={{
          zIndex: ownDrag ? 20 : 2,
        }}
        onDragStart={() => {
          setIsDragging(true)
          setOwnDrag(true)
        }}
        onDragEnd={() => {
          setIsDragging(false)
          setOwnDrag(false)
        }
        }

      > 
      <motion.div
        variants={inviseAnim}
        initial={(id === 0  && from) ? "hidden" : null}
        animate={(id === 0  && from)? "visible" : "default"}
      >
        <textarea
          spellCheck={false}
          placeholder="Make some notes"
          onChange={(e) => updateNoteText(e)}
          value={value}
        ></textarea>
          <p className="date">
          <Moment fromNow>{note.date_of_creation}</Moment>
          
          </p>
      </motion.div>
      </StyledNote>
    );
  };
  

const StyledNote = styled(motion.div)`
    
    z-index: 2;
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
    
    background: rgba(29, 29, 29, 0.6);
    border: 2px solid ${(props) => props.color};
    overflow: hidden;
    z-index: 2;
    div{
      width:100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      flex-direction: column;
    }
    .date{
        margin: 1rem;
        font-size: .8rem;
        color: #c8c6c6;
        
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
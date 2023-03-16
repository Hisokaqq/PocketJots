import React, { useEffect, useState} from 'react';
import styled from "styled-components";
import {  motion} from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faArrowRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import Note from '../components/Note';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';

const AnimRight = {
  initial:{
    x: "100%"
  },
  animate:{
    x: 0,
    transition:{
      duration:1
    }
  },
  exit:{
    x: "100%",
    transition:{
      duration:1
    }
  },
}

const AnimLeft = {
  initial:{
    x: "-100%"
  },
  animate:{
    x: 0,
    transition:{
      duration:.5,
      delay:.3
    }
  },
  exit:{
    x: "-100%",
    transition:{
      duration:1
    }
  },
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
      rotate: 0,
      transition: {
        duration: .5,
      },
    },
  };
  
  const HomeScreen = ({btnRef}) => {
    const profileData = localStorage.getItem('profile');
    const profileObject = JSON.parse(profileData);
    const profileId = profileObject?.id;
    const [isRotated, setIsRotated] = useState(false);
    const [notes, setNotes] = useState([])
    const [isFirstNoteAdded, setIsFirstNoteAdded] = useState(false);
    const [prev, setPrev] = useState([])
    const [disabled, setDisabled] = useState(false);
    const handlePlusClick = () => {
        
        setIsRotated((prevState) => !prevState);
        // setDisabled(true)
        
    };
    const [color, setColor] = useState(null)
    
    const HandleAddNote = async (color, pos) =>{
        setColor(color)
        setFrom(pos)
        setSearch("")
        // console.log(pos)
        setPrev(notes);
        setNotes([]);
        
      
        const data = {color:color, user_id: profileId}
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/notes/create/`, data);
          // setNotes([]);
          const response2 = await axios.get(`http://127.0.0.1:8000/api/notes/profile/${profileId}/`);

          const responce3 = await axios.get(`http://127.0.0.1:8000/api/profiles/${profileId}/`)
          localStorage.setItem('profile', JSON.stringify(responce3.data));

          setNotes(response2.data);
        } catch (error) {
          console.log(error);
        }
    }
      


    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate()
    const [from, setFrom] = useState(null)
    const handleLogout = () => {
      localStorage.removeItem('profile');
      navigate("/login")

    }
  
    const [search, setSearch] = useState("");

useEffect(() => {
  
  setFrom(null)

  const fetchProfileNotes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/notes/profile/${profileId}/?search=${search}`);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfileNotes();
}, [navigate, search]);
const [lastDragged, setLastDragged] = useState(null)
const deleteHandler = async (id) =>{
setSearch("")
  if(id){
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/notes/delete/${id}/`);
    const response2 = await axios.get(`http://127.0.0.1:8000/api/notes/profile/${profileId}/`);
    setNotes(response2.data);
  } catch (error) {
    console.log(error);
  }
}
}



    return (
      <StyledHome
      animate="animate"
      initial="initial"
      exit="exit"
      >
        <div className="container">
          
          <motion.div
          variants={AnimLeft} 
          className="left">
            <div className='all'>
            <p className="logo">PocetJots</p>
           

            <div className="notes-container">
              <StyledPlus
                // disabled={disabled}
                animate={isRotated ? "rotateClockwise" : "rotateCounterClockwise"}
                variants={plusAnim}
                onClick={ handlePlusClick}
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
                whileHover={{scale:1.3}}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const pos = { 
                    x: rect.left + rect.width / 2, 
                    y: rect.top + rect.height / 2 
                  };
                  HandleAddNote("#FFCF7D", pos);
                }}
              />
              <motion.div
                className="dot"
                style={{ background: "#F0A177", position: "absolute", top: 80 }}
                variants={dotAnim}
                custom={1}
                whileHover={{ scale: 1.3 }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  HandleAddNote("#F0A177", pos);
                }}
              />
              <motion.div
                className="dot"
                style={{ background: "#B095F6", position: "absolute", top: 120 }}
                variants={dotAnim}
                custom={2}
                whileHover={{ scale: 1.3 }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  HandleAddNote("#B095F6", pos);
                }}
              />
              <motion.div
                className="dot"
                style={{ background: "#55CFFA", position: "absolute", top: 160 }}
                variants={dotAnim}
                custom={3}
                whileHover={{ scale: 1.3 }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  HandleAddNote("#55CFFA", pos);
                }}
              />
              <motion.div
                className="dot"
                style={{ background: "#E6EE96", position: "absolute", top: 200 }}
                variants={dotAnim}
                custom={4}
                whileHover={{ scale: 1.3 }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                  HandleAddNote("#E6EE96", pos);
                }}
              />

              </StyledDots>
            </div>
              
            
            </div>
            <motion.div onMouseEnter={()=>deleteHandler(lastDragged)} animate = {isDragging ?  {color:"red", opacity: 1, rotate: 0, background:"white"} : {color: "white", opacity: 1, rotate:0 , background:"transparent"}} transition = {{duration:.5}}  whileHover={{scale:1.3, rotate:[20,-20,20,-20,0], color:"red", background:"transparent"}}  className="num">
              {/* <motion.p>{profileObject?.notes_count}</motion.p> */}
              <FontAwesomeIcon className='trash' icon={faTrash}/>
            </motion.div>
            
            
          </motion.div>
          <StyledRight
          variants={AnimRight}
          
          
          >
            <StyledSearchBar>
              <div className='is'>
                <div className='icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
                
                <input value={search} onChange={(e => setSearch(e.target.value))} type="text"  placeholder='Search for a note'/>
                </div>
                {
                profileData 
                ?
                <div className='icon icon2' >
                  <StyledName>
                    <p className='name'>{profileObject?.username}#{profileObject?.key}</p>
                  </StyledName>
                  <FontAwesomeIcon onClick={handleLogout} className='i' icon={faArrowRightFromBracket} />
                </div>
                :
                <Link  to="/login" className='icon'>
                 <FontAwesomeIcon icon={faUser}/>
               </Link>
                }
                
                
            </StyledSearchBar>
              <div className="data">

                  {notes.map((note, index) => (
                    <Note setLastDragged={setLastDragged}  key={index} note={note} id={index} setIsDragging={setIsDragging} isDragging={isDragging} from={from} setNotes={setNotes} notes={notes} setFrom={setFrom}/>
                  ))}

              </div>
          </StyledRight>
        </div>
      </StyledHome>
    );
  };
  

  
  
  const StyledName = styled(motion.div)`
    color: #fff;
    .name{
    }
  `

  const StyledDots = styled(motion.div)`
    height: 300px;
    width: 30px;
    margin: auto;
    overflow: hidden;
    position: relative;

    .dot {
      left: 5px;
      width: 20px;
      aspect-ratio: 1;
      border-radius: 50%;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, .5);
      z-index: 3;
    }
  `;



const StyledRight = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    /* background-color: red; */
    height: 100%;
    .data{
        height: 100%;
        padding: 1rem 9rem;
        
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        /* display: grid; */
        /* grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));  */
        gap: 2rem;
        overflow-y: scroll;
        overflow-x: hidden;
        /* margin-left: 7rem; */
        @media only screen and (max-width: 620px) {
        padding: 1rem 0 1rem 7rem;
        gap: 1rem;
        margin-top: 2rem;
      }
    }
`

const StyledSearchBar = styled(motion.div)`
    width: 100%;
    height: 4rem;
    margin-left: 8rem;
    display: flex;
    background-color: rgba(29, 29, 29, 0.6);
    /* background-color: red; */

    padding: .2rem 1rem;
    position: relative;
    justify-content: space-between;
    @media only screen and (max-width: 620px) {
        margin-left: 6rem;
        padding: 1rem;
        flex-direction: column;
      }
    .is{
      width: 100%;
      display: flex;
      padding-right: 1rem;
      align-items: center;
      @media only screen and (max-width: 620px) {
        padding-right: .5rem;
        align-items: baseline;
      }
      
    }
    input{
        all: unset;
        color: #fff;
        flex: 1;
        font-family: 'Roboto', sans-serif;
    }
    .icon{
        color: #fff;
        padding-right: 1rem;
        transition: all .4s;

        &:hover{
          color: #8f8f8f;
        }
    }
    .icon2{
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: 7rem;
      @media only screen and (max-width: 620px) {
        justify-content: space-between;
        margin-right: 0;
        width: 82%;
      }
      
      .i{
        padding: 1rem;
        @media only screen and (max-width: 620px) {
        padding: .8rem
      }
        transition: all .4s;

        &:hover{
          color: #8f8f8f;
        }
      }
    }
`


const StyledHome = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: relative;

  .notes-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 1.5rem;
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
      z-index: 3;
      width: 7rem;
      height: 100%;
      background-color: rgba(29, 29, 29, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      border-right: #dddddd 2px solid;
      @media only screen and (max-width: 620px) {
        width: 5rem;
      }
      .all{
      }
      .num{
        color: #fff;
        padding: 2rem;
        margin-bottom: 1rem;
        text-align: center;
        z-index: 300;
        position: relative;
        border-radius: 50%;
        .trash{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 1.2rem;
        }
        
      }
      .logo {
        color: white;
        font-weight: 700;
        padding: 1rem 0.7rem;
        margin-top: .4rem;
        @media only screen and (max-width: 620px) {
          font-size: .8rem;
      }
       
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
  @media only screen and (max-width: 620px) {
          width: 50px;
          height: 50px;
      }
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

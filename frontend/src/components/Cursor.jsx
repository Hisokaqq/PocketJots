import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";

const Cursor = () => {
    const cursorsize = 200
    const cursorsize2 = 30

    const [m_p, setM_p] = useState({
        x: window.innerWidth / 2,
        y: -20,
    });

    const variants = {
        default: {
            x: m_p.x - (cursorsize/2),
            y: m_p.y - (cursorsize/2),
            height: cursorsize,
            width: cursorsize,
            rotateX: [0, 360, 0],
            rotateY: [0, 180, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.15, 1],
            // filter: "blur(2000px)",
            
            transition: { x:
                {
                type: 'spring', stiffness: 20, damping: 30 
                },
                y:
                {
                type: 'spring', stiffness: 100, damping: 40 
                },
                rotateX:{
                    repeat: Infinity, duration: 100
                },
                rotateY:{
                    repeat: Infinity, duration: 100
                },
                rotate:{
                    repeat: Infinity, duration: 10
                },
                scale:{
                    repeat: Infinity, duration: 3
                }
            },
        },
        default2:{
            x: m_p.x - (cursorsize2/2),
            y: m_p.y - (cursorsize2/2),
            height: cursorsize2,
            width: cursorsize2,
        }
    };
      
    useEffect(() => {
        const mouseMove = (e) => {
            setM_p({
                x: e.clientX,
                y: e.clientY
            })   
        }
        window.addEventListener("mousemove", mouseMove)
        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    },[])

    return (
        <>
        <StyledCursor variants={variants} animate={"default"}>
        </StyledCursor>
        <StyledCursor2 variants={variants} animate={"default2"}/>
        </>
    );
};

const StyledCursor = styled(motion.div)`
    background: linear-gradient(
        to right,
        aquamarine,
        mediumpurple
    );
    aspect-ratio: 1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    filter: blur(100px);
`;

const StyledCursor2 = styled(motion.div)`
    position: fixed;
    pointer-events: none;
    z-index: 300;
    &:before,
    &:after {
        content: "";
        background-color: white;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        margin-top: -1.25px;
    }
    &:before {
        transform: rotate(90deg);
    }
`;



export default Cursor;

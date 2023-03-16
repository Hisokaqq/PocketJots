import axios from 'axios';
import { motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components'
const LogReg = () => {
  const [username, setUsername] = useState("");
  const [key, setKey] = useState("");
  const navitate = useNavigate() 
  const [error, setError] = useState(null)
  useEffect(()=>{
    const profileData = localStorage.getItem('profile')
    if(profileData){
        navitate("/")
    }
    else{
        navitate("/login")
    }
    
  }, [navitate])
    

  const LRhandler = async (e) => {
    e.preventDefault();
    const data = key ? { username: username, key: key } : { username: username };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/profiles/login/', data);
      const profileData = response.data;
      localStorage.setItem('profile', JSON.stringify(profileData));
      navitate('/');
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data)) {
            setError(error.response.data[0]);
        }
        // The server responded with a status code outside the 2xx range
        console.log(error.response.data); // Log the error response from the server
        // Show the error message to the user
        const errorMessage = error.response.data.error || 'An error occurred';
        setError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request); // Log the request object
        setError('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message); // Log the error message
        setError('An error occurred');
      }
    }
  };
  
  const keyInputRef = useRef(null);

  return (
    <StyledLogReg>
      <motion.p initial={{y:-300}} animate={{y:0}} transition={{duration:.3}} className='info'>Existing users can login with their username and <span className='key'>PocketJot key</span> , while new users can register with just their username</motion.p>
      <motion.form onSubmit={LRhandler}>
        <div className="incont">
          <input
            className='i1'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            type="text"
            maxLength={20}
          />
          <input
            className='i2'
            minLength={4}
            maxLength={4}
            value={key}
            onChange={(e) => {
                const regex = /^[0-9]*$/; // regular expression to match only numbers
                const value = e.target.value;
                if (regex.test(value) || value === '') {
                setKey(value);
                }
            }}
            placeholder="0000"
            ref={keyInputRef}
            />

        </div>
        {error && 
        <p className='error'>{error}</p>
        }
        <StyledBtn onClick={LRhandler}>Login/register</StyledBtn>
      </motion.form>
    </StyledLogReg>
  );
};




const StyledBtn = styled(motion.div)`
  
  all: unset;
  position: relative;
  color: #fff;
  margin-top: 1rem;
  padding: 1rem;
  
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
    transform-origin: center;
    transform: scaleX(0);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;


const StyledLogReg = styled(motion.div)`
.key{
  color: #fc9797;
  position: relative;
}
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  .error{
    color: #fc9797;
    align-self: flex-start;
    margin-left: 10%;
    margin-top: 1rem;
  }
  .info {
    justify-self: flex-start;
    color: #fff;
    position: fixed;
    top: 0;
    padding: 1rem;
  }
  form {
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .incont {
        margin: auto;
      display: flex;
      flex-direction: row;
      width: 80%;
      border: 2px solid rgba(254, 254, 254, 0.6);
      border-radius: .5rem;
    }
    
    input {
      all: unset;
      padding: 1rem 1rem;
      border-radius: 1rem;
      color: #fff;
    }
    .i1 {
      flex: 1;
      border-right: none;
    }
    .i2 {
      width: 2.8rem;
      padding: 0;
    }
    
    }
`
export default LogReg
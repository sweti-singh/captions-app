import './App.css';
import CaptionForm from './Components/CaptionForm';
import VideoPlayer from './Components/VideoPlayer';
import { useState } from 'react';
import styled from 'styled-components';

const ParentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: orange;

  @media (max-width: 1150px) {
    height: 200vh;
  }
  @media (max-width: 688px){
    height: 150vh;
    }
`;

const Heading = styled.h1`
  text-align: center;
  padding-top: 40px;
  color: black;
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly ;
  margin: 0 30px;
  padding: 20px;
  height: 80vh;

  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    gap:2rem;
  }
`;

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);

  console.log(captions)

  return (
    <ParentContainer>
      <Heading>VIDEO CAPTION APP</Heading>
      <AppContainer>
        <CaptionForm setVideoUrl={setVideoUrl} setCaptions={setCaptions} />
        <VideoPlayer videoUrl={videoUrl} captions={captions} />
      </AppContainer>
    </ParentContainer>
  );
}

export default App;

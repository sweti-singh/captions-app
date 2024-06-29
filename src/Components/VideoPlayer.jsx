import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';


function VideoPlayer({ videoUrl, captions }) {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  const convertToSeconds = ({ hours, minutes, seconds }) => {
    return (+hours) * 3600 + (+minutes) * 60 + (+seconds);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      let latestCaption = '';

      captions.sort((a, b) => {
        const timeA = convertToSeconds(a.time);
        const timeB = convertToSeconds(b.time);
        return timeA - timeB;
      });

      captions.forEach(caption => {
        const captionTimeInSeconds = convertToSeconds(caption.time);
        if (captionTimeInSeconds <= currentTime) {
          latestCaption = caption.text;
        }
      });
      setCurrentCaption(latestCaption);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [captions]);


  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} controls src={videoUrl} />
      <CaptionText>{currentCaption}</CaptionText>
    </VideoContainer>
  );
}

const CaptionText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const VideoContainer=styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #feefc3;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%;

    @media (max-width: 1150px) {
    width: 100%;
    min-height: 500px;
    height: fit-content;
  }
  @media (max-width: 688px){
    width: 100%;
    min-height: 400px;
    height: fit-content;
    }  
`

const StyledVideo = styled.video`
  width: 600px;

  @media (max-width: 1150px) {
    width: 80%;
    height: fit-content;
  }
  @media (max-width: 688px){
    width: 100%;
    height: fit-content;
    }
`


export default VideoPlayer;
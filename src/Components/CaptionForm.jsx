import React, { useState } from "react";
import styled from "styled-components";


function CaptionForm({ setVideoUrl, setCaptions }) {
    const [url, setUrl] = useState("");
    const [captionText, setCaptionText] = useState('');
    const time = {
        hours: '',
        minutes: '',
        seconds: '',
    }
    const [timestamp, setTimestamp] = useState(time);
    const [error, setError] = useState('');

    const handleReset = (e) =>{
        e.preventDefault()
        setUrl('')
        setVideoUrl('')
        setCaptionText('')
        setCaptions([])
        setTimestamp(time)
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!url) {
            setError("Video URL is required.");
            return;
        }
        if (!captionText) {
            setError("Caption text is required.");
            return;
        }
        if (!timestamp.hours && !timestamp.minutes && !timestamp.seconds) {
            setError("At least one of hours, minutes, or seconds is required.");
            return;
        }
        if (timestamp.hours && isNaN(timestamp.hours)) {
            setError("Hours must be a number.");
            return;
        }
        if (timestamp.minutes && isNaN(timestamp.minutes)) {
            setError("Minutes must be a number.");
            return;
        }
        if (timestamp.seconds && isNaN(timestamp.seconds)) {
            setError("Seconds must be a number.");
            return;
        }
        if (timestamp.minutes && timestamp.minutes>59) {
            setError("Minutes must be a valid number.");
            return;
        }
        if (timestamp.seconds && timestamp.seconds>59) {
            setError("Seconds must be a valid number.");
            return;
        }
        const newTimestamp = {
            hours: parseInt(timestamp.hours || 0, 10),
            minutes: parseInt(timestamp.minutes || 0, 10),
            seconds: parseInt(timestamp.seconds || 0, 10),
          };
      
          const newCaption = {
            text: captionText,
            time: newTimestamp,
          };
      
          setCaptions((prevCaptions) => {
            const existingCaptionIndex = prevCaptions.findIndex(caption =>
              caption.time.hours === newTimestamp.hours &&
              caption.time.minutes === newTimestamp.minutes &&
              caption.time.seconds === newTimestamp.seconds
            );
      
            if (existingCaptionIndex !== -1) {
              const updatedCaptions = [...prevCaptions];
              updatedCaptions[existingCaptionIndex] = newCaption;
              return updatedCaptions;
            } else {
              return [...prevCaptions, newCaption];
            }
          })
        setCaptionText("");
        setTimestamp(time);
        setVideoUrl(url)
    };



    return (

        <CaptionContainer onSubmit={handleSubmit}>
            <FormTitle>Captions</FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormGroup>
                <InputContainer
                    type="text"
                    placeholder="Video URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <InputContainer
                    type="textarea"
                    placeholder="Caption"
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                />
            </FormGroup>


            <FormGroup>
                <label>Timestamp :</label>
                <TimeGroup>
                    <InputContainer
                        placeholder="HH"
                        value={timestamp.hours}
                        onChange={(e) => setTimestamp(prev => ({ ...prev, hours: e.target.value }))}
                        maxLength={2}
                    />
                    <InputContainer
                        placeholder="MM"
                        value={timestamp.minutes}
                        onChange={(e) => setTimestamp(prev => ({ ...prev, minutes: e.target.value }))}
                        maxLength={2}
                    />
                    <InputContainer
                        placeholder="SS"
                        value={timestamp.seconds}
                        onChange={(e) => setTimestamp(prev => ({ ...prev, seconds: e.target.value }))}
                        maxLength={2}
                    />
                </TimeGroup>
            </FormGroup>
            <FormGroup> <ButtonContainer type="submit">Add Caption</ButtonContainer></FormGroup>
            <FormGroup> <ButtonContainer onClick={handleReset}>Hard Reload</ButtonContainer></FormGroup>
        </CaptionContainer>
    );
}
const CaptionContainer = styled.form`
  width: 30%;
  height: 100%;
  gap: 20px;
  background-color: #feefc3;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1150px) {
    width: 100%;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin: 1.5rem;
  margin-bottom: 3rem;
  font-size: 1.7rem;
  color: #333;
`

const FormGroup = styled.div`
    margin: 1.5rem;
    display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-direction: column;
`

const TimeGroup = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  gap:0.5rem;
  margin: 1.5rem;
`

const InputContainer = styled.input`
   width: 75%;
   padding: 0.75%;
   margin: 0 auto;
   height: 35px;
   text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  transition: border-color 0.3s ease;
`;

const ButtonContainer = styled.button`
   width: 120px;
   padding: 10px;
   font-size: 1rem;
   background-color: orange;
   color: black;
   border-radius: 5px;
   height: 40px;
   cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;


export default CaptionForm;

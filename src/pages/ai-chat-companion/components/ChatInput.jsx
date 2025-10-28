import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Icon from '../../../components/AppIcon.jsx';

const ChatInput = ({ onSendMessage, isLoading, onVoiceInput }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      inputRef?.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, this would stop recording and process the audio
      onVoiceInput?.("Voice input simulated - I'm feeling anxious today");
    } else {
      setIsRecording(true);
      // In a real app, this would start recording
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-1">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="resize-none"
        />
      </div>
      <Button
        type="button"
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={handleVoiceToggle}
        disabled={isLoading}
        className="flex-shrink-0"
      >
        <Icon 
          name={isRecording ? "MicOff" : "Mic"} 
          size={16} 
        />
      </Button>
      <Button
        type="submit"
        disabled={!message?.trim() || isLoading}
        loading={isLoading}
        size="icon"
        className="flex-shrink-0"
      >
        <Icon name="Send" size={16} />
      </Button>
    </form>
  );
};

export default ChatInput;
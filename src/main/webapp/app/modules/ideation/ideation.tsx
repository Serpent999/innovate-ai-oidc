import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import authentication, { logout } from 'app/shared/reducers/authentication';
import { Home } from 'app/modules/home/home';

import ChatWindow from 'app/modules/ideation/chatwindow';
import Inputbar from 'app/modules/ideation/Inputbar';
import axios from 'axios';
import './ideation.css';

export const Ideation = () => {
  const [messages, setMessages] = useState([]);
  const sendMessage = async text => {
    const userMessage = { text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    try {
      const apiEndpoint = 'https://api.cohere.ai/v1/chat';
      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer  `,
      };

      const data = {
        message: JSON.stringify(text),
        connectors: [{ id: 'web-search' }],
      };
      const response = await axios.post(apiEndpoint, data, { headers }).then(response => {
        console.log(response);
      }); /*axios({
        method: 'post', //you can set what request you want to be
        url: 'https://api.cohere.ai/v1/chat',
        data: { message: text},
        headers: {
           Authorization: 'Bearer ' + ' ',
         }
      })*/ /*axios.post(
        "https://api.cohere.ai/v1/chat",

        { message: text },
      );*/
      const botMessage = { text: 'JSON.stringify(response)', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div className="App">
      <ChatWindow messages={messages} />
      <Inputbar onSend={sendMessage} />
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { mapStateToProps };

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Ideation);

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
        Authorization: `Bearer Ol3Q9ZkuuHR1j9xwOqyjHPUgpc75cR9o5LxoXPRl`,
      };

      const data = {
        chat_history: [
          // {"role": "USER", "message": ""},
          {
            role: 'Admin',
            message:
              'This explanation is for you chatbot. you are a chatbot that helps you understand the problem and generate ideas for solving it. You can summarize the steps for user in the first message so they have an idea of how you help them.You are an innovation assistant. you will follow three main steps:1. Problem Clarification: This step helps the user identify the root goals, assumptions, context, and any additional information that could help in understanding the problem more deeply.2. Ideation: This step generates a list of ideas using various ideation engines like SCAMPER, Talk to a Stranger, Forced Connection, Future Scenarios, etc. The module will present all generated ideas at once in a list format, with the ideation technique used mentioned in parentheses at the end of each idea. This allows the user to choose from a range of solutions.3. Decision: In this step, the system will first present a list of relevant criteria for assessing the feasibility of the innovation plan. The user can edit or add new criteria. Then, a decision analysis matrix is created with the chosen ideas as rows and criteria as columns. The system scores each criterion from 1 to 5 and adds a column for the total score for each idea. After presenting the final decision matrix, the system also conducts a risk assessment for the chosen ideas.',
          },
          // {"role": "CHATBOT", "message": ""}
        ],
        message: JSON.stringify(text),
        connectors: [{ id: 'web-search' }],
      };
      const response = await axios.post(apiEndpoint, data, { headers }).then(response => {
        // console.log(response.data.text);
        data.chat_history.push({ role: 'USER', message: 'userMessage' }, { role: 'CHATBOT', message: response.data.text });
        return response.data.text;
      });

      const botMessage = { text: JSON.stringify(response), sender: 'bot' };
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

export default connect(mapStateToProps)(Ideation); /*axios.post(
        "https://api.cohere.ai/v1/chat",

        { message: text },
      );*/

/*axios({
        method: 'post', //you can set what request you want to be
        url: 'https://api.cohere.ai/v1/chat',
        data: { message: text},
        headers: {
           Authorization: 'Bearer ' + ' ',
         }
      })*/

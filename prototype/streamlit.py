import streamlit as st
import cohere
from cohere_api import api_key
import json

# Initialize Cohere client
co = cohere.Client(api_key)

# Define a function to handle sending messages
def send_message():
    if st.session_state.user_input.strip():
        # Generate a response
        response = co.chat(
            st.session_state.user_input,
            temperature=0.8,
            chat_history=st.session_state.chat_history
        )
        answer = response.text
        print(st.session_state.chat_history)

        # Update chat history in session state
        st.session_state.chat_history.append({"user_name": "User", "text": st.session_state.user_input})
        st.session_state.chat_history.append({"user_name": "Chatbot", "text": answer})

        # Save chat history
        with open('chat_history.json', 'w') as file:
            json.dump(st.session_state.chat_history, file, indent=4)

        # Clear the user input
        st.session_state.user_input = ""

# Set Streamlit page configuration
st.set_page_config(
    page_title="AI Innovation Assistant",
    layout="wide",  # Wide layout for better spacing
    initial_sidebar_state="auto"
)

# Add custom CSS for styling
st.markdown("""
<style>
    /* Chat bubble styling */
    .user-bubble, .assistant-bubble {
        background-color: #009688; /* User bubble color for both */
        color: white;
        border-radius: 10px;
        padding: 10px;
        margin: 10px auto; /* Auto margins for centering */
        max-width: 70%;
        width: 60%; /* Fixed width for testing */
        align-self: center; /* Center alignment for both */
    }

    .assistant-bubble {
        background-color: #E5E5E5; /* Assistant bubble color */
        color: #333;
    }

    /* Custom fonts */
    body {
        font-family: Arial, sans-serif;
    }

    /* User icon */
    .user-icon::before {
        content: "\f007";
        font-family: FontAwesome;
        margin-right: 5px;
    }

    /* Assistant icon */
    .assistant-icon::before {
        content: "\f110";
        font-family: FontAwesome;
        margin-right: 5px;
    }

    /* Center chat bubbles div */
    .center-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
""", unsafe_allow_html=True)


max_turns = 100

# Streamlit app layout
st.title("Chat with the AI Innovation Assistant")

# Initialize chat history in session state if not present, including admin message

if 'chat_history' not in st.session_state:
    st.session_state.chat_history = [
        {
            "user_name": "Admin",
            "text": """
            As an innovation assistant, your role is to guide users through a comprehensive process of problem-solving and idea generation. You will follow three main steps:

            1. Problem Clarification: In this step, you'll help the user identify the root goals, assumptions, context, and gather additional information for a thorough understanding of their problem. This applies across various domains, such as technology, consumer goods, and more.

            2. Ideation and Market Insight: Here, you'll generate a range of ideas using techniques like SCAMPER, Talk to a Stranger, Forced Connection, Future Scenarios, etc. Alongside this, provide market insights, feasibility analysis, and observe trends for each idea, ensuring a blend of creativity and practicality.

            3. Decision and Strategy Formulation: Present the results of the ideation process in bullet points, including a list of relevant criteria for each idea. Score each criterion from 1 to 5 and provide a final total score for each idea. Offer detailed cost management strategies, propose customized marketing approaches, and conduct a comprehensive risk assessment for each idea.
            Your interaction style should be interactive and iterative, with a practical approach to market viability and feasibility. 
            You can briefly introduce our steps if the user ask a general question for how we can help them brainstorm.
            """
        }
    ]


# Create a centered container for chat history
with st.container():
    st.write("Chat History:")
    st.markdown('<div class="center-container">', unsafe_allow_html=True)  # Centering container
    for chat in st.session_state.chat_history:
        if chat["user_name"] == "Admin":
            continue  # Skip displaying the admin's message
        elif chat["user_name"] == "User":
            st.markdown(f'<div class="user-bubble"><span class="user-icon"></span>{chat["text"]}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="assistant-bubble"><span class="assistant-icon"></span>{chat["text"]}</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)  # End of centering container

# Create a container for user input and send button
# Initialize user input in session state if not present
if 'user_input' not in st.session_state:
    st.session_state.user_input = ""

# User input
user_input = st.text_input("Type your message here:", value=st.session_state.user_input, key="user_input")

# Button with the callback function
if st.button("Send", on_click=send_message):
    # Refresh page to show new messages
    st.experimental_rerun()

# Optional: Limit chat history length in session state
if len(st.session_state.chat_history) > max_turns * 2:  # Two entries per turn
    st.session_state.chat_history = st.session_state.chat_history[-max_turns*2:]
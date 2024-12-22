const chatbotToggler = document.querySelector(".chatbot-toggler");
const body = document.body;

chatbotToggler.addEventListener("click", () => {
  if (body.classList.contains("show-chatbot")) {
    body.classList.remove("show-chatbot");
    body.classList.add("hide-chatbot");
  } else {
    body.classList.remove("hide-chatbot");
    body.classList.add("show-chatbot");
  }
});

const chatbotToggler2 = document.querySelector(".chatme1");
chatbotToggler2.addEventListener("click", () => {
  body.classList.remove("show-chatbot");
  body.classList.add("hide-chatbot");
});

const sendBtn = document.querySelector(".input-chat span");
const chatInput = document.querySelector(".input-chat textarea");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const generateResponse = (incomingChatLi) => {
  // const API_KEY = 'Enter your API key here, after creating or purchasing';
  const messageElement = incomingChatLi.querySelector("p");
  // const API_URL = "https://api.openai.com/v1/chat/completions"; use any API url 

  const requestOptions = {
    method: "POST",
    headers: {
      //  commented due to security reasons 
      // "Content-Type": "application/json",
      // "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      // commented due to security reasons of OPEN API
      // model: 'gpt-3.5-turbo',  
      // messages: [{ role: "user", content: userMessage }],
    }),
  };

  fetch(API_URL, requestOptions)
  // data is fetched here by using the promises
    .then(res => res.json())
    .then(data => {
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.textContent = "Sorry, Something went wrong";
    });
};

const handleChat = () => {
  // enters the values inside textarea into a question
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatbox.appendChild(createChatList(userMessage, "outgoing"));
  chatInput.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  setTimeout(() => {
    // fetch function iniciator
    const incomingChatLi = createChatList("Generating...", "incoming");
    chatbox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
};

const createChatList = (message, className) => {
  // create  the questions in the chatbox
  const chatList = document.createElement("li");
  chatList.classList.add("chat", className);

  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span><i class="ri-user-line"></i></span><p>${message}</p>`;

  chatList.innerHTML = chatContent;
  return chatList;
};

// made the enter key functional
sendBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleChat();
  }
});

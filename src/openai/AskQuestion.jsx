import axios from "axios";

async function askQuestion(question) {
  const response = await axios.post("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask", {
    question: question,
  });
  console.log(response.data.answer);
}

askQuestion("What is the capital of Ireland?");

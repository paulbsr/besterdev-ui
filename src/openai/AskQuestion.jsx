import OAuth2APIClient from '../oauth2/OAuth2APIClient';

async function askQuestion(question) {
  const response = await OAuth2APIClient.post("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask", {
    question: question,
  });
  console.log(response.data.answer);
}

askQuestion("What is the capital of Ireland?");

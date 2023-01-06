export function formatQuestion({ id, question, author }) {
  const { optionOne, optionTwo, timestamp, } = question;
  const { name, avatarURL } = author;

  return {
    id,
    timestamp,
    name,
    avatar: avatarURL,
    optionOne: {
      votes: optionOne.lenght,
      text: optionOne.text,
    },
    optionTwo: {
      votes: optionTwo.lenght,
      text: optionTwo.text,
    },
  };
}

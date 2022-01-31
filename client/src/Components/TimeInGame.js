const TimeInGame = ({ second, minute }) => {
  return (
    <div>
      <p>
        Time Playing: {minute}:{second}
      </p>
    </div>
  );
};

export default TimeInGame;

const InputContent = ({ ...props }) => {
  return (
    <input
      {...props}
      className="flex-1 h-full p-4 bg-transparent focus:outline-none"
    />
  );
};

export default InputContent;

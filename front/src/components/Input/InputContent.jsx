const InputContent = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full h-full p-4 bg-transparent focus:outline-none"
    />
  );
};

export default InputContent;

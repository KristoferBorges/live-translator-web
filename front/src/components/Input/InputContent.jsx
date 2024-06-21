const InputContent = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full h-full p-2 bg-transparent focus:outline-none md:p-4 md:text-lg"
    />
  );
};

export default InputContent;

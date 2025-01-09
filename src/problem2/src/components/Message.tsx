import type { FC } from "react";

interface MessageProps {
  text: string;
}

const Message: FC<MessageProps> = ({ text }) => {
  return (
    <>
      <h2 className="text-center uppercase tracking-widest text-gray-500">
        {text}
      </h2>
    </>
  );
};

export default Message;

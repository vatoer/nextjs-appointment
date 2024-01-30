"use client";
import { Button } from "@/components/ui/button";

interface ICardButtonProps {
  title: string;
  onClick: () => void;
}

const CardButton = ({ title, onClick }: ICardButtonProps) => {
  return (
    <div className="flex items-end flex-col w-full">
      <Button className="w-full md:w-1/3 my-5" onClick={onClick}>
        {title}
      </Button>
    </div>
  );
};

export default CardButton;

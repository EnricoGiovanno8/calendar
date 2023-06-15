import "./DateCard.css";
import { FC } from "react";

interface EventData {
    name: string;
    time: string;
    invitees: string[];
}

interface DateCardProps {
    date: number;
}

const DateCard: FC<DateCardProps> = ({ date }) => {
    return <div className="card-container">{date}</div>;
};

export default DateCard;

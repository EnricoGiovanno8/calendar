import { FC } from "react";
import "./Title.css";

interface TitleProps {
    month: string;
    year: number;
}

const Title: FC<TitleProps> = ({ month, year }) => {
    return (
        <div className="title-container">
            <h1 className="month-title">{month}</h1>
            <div className="year-container">
                <h1 className="year-title">{year}</h1>
            </div>
        </div>
    );
};

export default Title;

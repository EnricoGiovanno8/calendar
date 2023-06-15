import { FC, ReactNode } from "react";
import "./CalendarLayout.css";

interface CalendarLayoutProps {
    children: ReactNode;
}

const CalendarLayout: FC<CalendarLayoutProps> = ({ children }) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return (
        <div className="container">
            <div className="header-container">
                {days.map((day, index) => (
                    <div key={"day-header-" + index} className="header-item">
                        <p className="header-text">{day}</p>
                    </div>
                ))}
            </div>
            <div className="date-container">{children}</div>
        </div>
    );
};

export default CalendarLayout;

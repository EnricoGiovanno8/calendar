import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import "./CalendarLayout.css";

interface CalendarLayoutProps {
    children: ReactNode;
}

const CalendarLayout: FC<CalendarLayoutProps> = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const days = useMemo(() => {
        const dayArr = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        if (windowWidth <= 991) {
            return dayArr.map((day) => day.slice(0, 3));
        }

        return dayArr;
    }, [windowWidth]);

    return (
        <div className="container">
            <div className="header-container">
                {days.map((day, index) => (
                    <div key={"day-header-" + index} className="header-item">
                        <p className="header-text">{day}</p>
                    </div>
                ))}
                {children}
            </div>
        </div>
    );
};

export default CalendarLayout;

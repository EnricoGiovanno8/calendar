import { FC } from "react";
import CalendarLayout from "./components/CalendarLayout/CalendarLayout";
import "./App.css";
import Title from "./components/Title/Title";
import DateCard from "./components/DateCard/DateCard";

const App: FC = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const arrs = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className="app-container">
            <Title month={month} year={currentDate.getFullYear()} />
            <CalendarLayout>
                {arrs.map((date, index) => (
                    <DateCard key={"date-card-" + index} date={date} />
                ))}
            </CalendarLayout>
        </div>
    );
};

export default App;

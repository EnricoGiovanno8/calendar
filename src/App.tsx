import { FC } from "react";
import CalendarLayout from "./components/CalendarLayout/CalendarLayout";
import "./App.css";
import Title from "./components/Title/Title";
import DateCard from "./components/DateCard/DateCard";

const App: FC = () => {
    const currentDate = new Date();
    const monthString = currentDate.toLocaleString("default", {
        month: "long",
    });

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const nextMonth = new Date(year, month + 1, 1);

    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(nextMonth.getTime() - 1);

    const dateArray = Array.from(
        { length: lastDateOfMonth.getDate() },
        (_, index) => index + 1
    );

    return (
        <div className="app-container">
            <Title month={monthString} year={year} />
            <CalendarLayout>
                {Array.from({ length: firstDateOfMonth.getDay() }).map(
                    (_, index) => (
                        <div key={"skip-card-" + index}></div>
                    )
                )}
                {dateArray.map((date, index) => (
                    <DateCard key={"date-card-" + index} date={date} month={month} year={year} />
                ))}
            </CalendarLayout>
        </div>
    );
};

export default App;

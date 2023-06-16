import Event from "../Event/Event";
import Modal from "../Modal/Modal";
import "./DateCard.css";
import { FC, useCallback, useEffect, useState } from "react";

export interface EventData {
    name: string;
    time: string;
    invitees: string[];
}

interface DateCardProps {
    date: number;
    month: number;
    year: number;
}

const DateCard: FC<DateCardProps> = ({ date, month, year }) => {
    const [events, setEvents] = useState<EventData[]>([]);
    useEffect(() => {
        const savedEventsExist = localStorage.getItem(
            `event-${date}-${month}-${year}`
        );

        if (savedEventsExist) {
            const savedEvents: EventData[] = JSON.parse(savedEventsExist);
            if (savedEvents.length > 0) {
                setEvents(savedEvents);
            }
        }
    }, [date, month, year]);

    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

    const onClickDate = () => {
        // User can only add 3 events in one day
        if (events.length < 3) {
            return setAddModalVisible(!addModalVisible);
        }

        return alert("User can only add 3 events in one day!");
    };

    const saveEventsInBrowser = useCallback(
        (string: string) => {
            localStorage.setItem(`event-${date}-${month}-${year}`, string);
        },
        [date, month, year]
    );

    const removeEventsInBrowser = useCallback(() => {
        localStorage.removeItem(`event-${date}-${month}-${year}`);
    }, [date, month, year]);

    useEffect(() => {
        if (events.length > 0) {
            const eventsString = JSON.stringify(events);
            saveEventsInBrowser(eventsString);
        } else {
            removeEventsInBrowser();
        }
    }, [events, removeEventsInBrowser, saveEventsInBrowser]);

    const onSubmit = (eventData: EventData) => {
        setEvents([...events, eventData]);
        setAddModalVisible(false);
    };

    return (
        <>
            <div className="card-container" onClick={onClickDate}>
                <p className="date">{date}</p>
                {events.map((eventData, index) => (
                    <Event
                        key={"event-" + index}
                        eventData={eventData}
                        index={index}
                        totalEvents={events.length}
                    />
                ))}
            </div>
            <Modal
                isOpen={addModalVisible}
                mode="Add"
                onCancel={() => setAddModalVisible(false)}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default DateCard;

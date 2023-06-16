import { FC, useState } from "react";
import { EventData } from "../DateCard/DateCard";
import "./Event.css";
import Modal from "../Modal/Modal";

interface EventProps {
    eventData: EventData;
    index: number;
    totalEvents: number;
    onEdit: (index: number, data: EventData) => void;
    onDelete: (index: number) => void;
}

const Event: FC<EventProps> = ({
    eventData,
    index,
    totalEvents,
    onEdit,
    onDelete,
}) => {
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

    const containerClassName = () => {
        if (index === 0 && totalEvents === 1) {
            return "first-event-container round";
        }

        if (index === 0 && totalEvents > 1) {
            return "first-event-container top-round";
        }

        if (index === 1 && totalEvents === 2) {
            return "second-event-container bottom-round";
        }

        if (index === 1 && totalEvents === 3) {
            return "second-event-container";
        }

        return "third-event-container bottom-round";
    };

    const onSubmit = (eventData: EventData) => {
        onEdit(index, eventData);
        setEditModalVisible(false);
    };

    const onDeleteEvent = () => {
        if (window.confirm(`Delete ${eventData.name}?`)) {
            onDelete(index);
            setEditModalVisible(false);
        }
    };

    return (
        <>
            <div
                className={containerClassName()}
                onClick={(e) => {
                    e.stopPropagation();
                    setEditModalVisible(true);
                }}>
                <div className="title-container">
                    <p className="event-name">{eventData.name}</p>
                    <div className="time-container">
                        <p className="event-time">{eventData.time}</p>
                    </div>
                </div>
                {eventData.invitees.map((invitee, index) => (
                    <p key={"invitee-" + index} className="invitee">
                        {invitee}
                    </p>
                ))}
            </div>
            <Modal
                isOpen={editModalVisible}
                mode="Edit"
                onCancel={() => setEditModalVisible(false)}
                onSubmit={onSubmit}
                onDelete={onDeleteEvent}
                event={eventData}
            />
        </>
    );
};

export default Event;

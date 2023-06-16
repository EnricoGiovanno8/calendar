import { FC, useEffect, useMemo, useState } from "react";
import { EventData } from "../DateCard/DateCard";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    mode: "Add" | "Edit";
    onCancel: () => void;
    onSubmit: (eventData: EventData) => void;
    event?: EventData;
}

const Modal: FC<ModalProps> = ({ isOpen, mode, onCancel, onSubmit, event }) => {
    const [name, setName] = useState<string>("");
    const [hour, setHour] = useState<string>("1");
    const [minute, setMinute] = useState<string>("0");
    const [amPm, setAmPm] = useState<string>("AM");
    const [invitee, setInvitee] = useState<string>("");
    const [invitees, setInvitees] = useState<string[]>([]);

    useEffect(() => {
        if (mode === "Edit" && event) {
            const formattedHour = () => {
                if (event.time[0] === "0") {
                    return event.time[1];
                }

                return event.time.slice(0, 2);
            };
            const formattedMinute = () => {
                if (event.time[3] === "0") {
                    return event.time[4];
                }

                return event.time.slice(3, 5);
            };

            setName(event.name);
            setHour(formattedHour());
            setMinute(formattedMinute());
            setAmPm(event.time.slice(6, 9));
            setInvitees(event.invitees);
        }
    }, [event, mode]);

    const allowSubmit = useMemo(() => {
        if (name) {
            return true;
        }

        return false;
    }, [name]);

    const onDeleteInvitee = (index: number) => {
        setInvitees([
            ...invitees.slice(0, index),
            ...invitees.slice(index + 1),
        ]);
    };

    const resetForm = () => {
        setName("");
        setHour("1");
        setMinute("0");
        setAmPm("AM");
        setInvitee("");
        setInvitees([]);
    };

    const onCancelAdd = () => {
        if (mode === "Add") {
            resetForm();
        }
        onCancel();
    };

    const handleSubmit = () => {
        const time = () => {
            let hourData = hour;
            let minuteData = minute;

            if (hourData.length === 1) {
                hourData = "0" + hourData;
            }

            if (minuteData.length === 1) {
                minuteData = "0" + minuteData;
            }

            return `${hourData}:${minuteData} ${amPm}`;
        };

        const data: EventData = {
            name,
            time: time(),
            invitees,
        };

        onSubmit(data);
        resetForm();
    };

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal">
                    <div>
                        <p className="modal-title">
                            {mode === "Add" ? "Add New Event" : "Edit Event"}
                        </p>
                    </div>

                    <label className="label">Event Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="label">Time:</label>
                    <div className="time-input-group">
                        <select
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <option key={"hour-" + index} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <p className="text">:</p>
                        <select
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}>
                            {Array.from({ length: 60 }).map((_, index) => (
                                <option key={"minute-" + index} value={index}>
                                    {index}
                                </option>
                            ))}
                        </select>
                        <select
                            value={amPm}
                            onChange={(e) => setAmPm(e.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>

                    <label className="label">Invitees:</label>
                    <div className="invitees-container">
                        {invitees.map((text, index) => (
                            <div
                                key={"added-invitee" + index}
                                className="invitee-wrapper">
                                <p className="invitee-email">{text}</p>
                                <p
                                    className="delete-invitee"
                                    onClick={() => onDeleteInvitee(index)}>
                                    ⓧ
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="invitee-input-wrapper">
                        <input
                            type="email"
                            value={invitee}
                            onChange={(e) => setInvitee(e.target.value)}
                        />
                        <button
                            className="add-button"
                            onClick={() => {
                                invitee && setInvitees([...invitees, invitee]);
                                setInvitee("");
                            }}>
                            <p className="button-label-primary">＋</p>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button className="cancel-button" onClick={onCancelAdd}>
                            <p className="button-label-outline">Cancel</p>
                        </button>
                        <button
                            className="submit-button"
                            disabled={!allowSubmit}
                            onClick={handleSubmit}>
                            <p className="button-label-primary">Submit</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

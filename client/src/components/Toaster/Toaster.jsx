import React, {useEffect, useState} from "react";
import "./Toaster.css"


const Toaster = ({ type = "success", title = "", message = "", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null; // unmount automatically after hiding

    return (
        <div className={`toast-bar ${type} visible`} role="status">
            <div className="toast-content">
                <strong className="toast-title">{title}</strong>
                <span className="toast-message">{message}</span>
            </div>
            <button className="toast-close" onClick={() => setVisible(false)}>✕</button>
        </div>
    );
};

export default Toaster;

import React, { useState, useEffect } from 'react';

const SystemStatusBadge = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    };

    return (
        <div className="system-status-badge glass">
            <div className="status-dot"></div>
            <div className="status-info">
                <span className="status-label">SYSTEMS ONLINE</span>
                <span className="status-time">{formatTime(time)}</span>
            </div>
        </div>
    );
};

export default SystemStatusBadge;

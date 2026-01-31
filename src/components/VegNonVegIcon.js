const VegIcon = () => (
    <div className="veg-icon">
        <svg width="18" height="18" viewBox="0 0 18 18">
            <rect x="1" y="1" width="16" height="16" rx="2" fill="none" stroke="#0f8a3c" strokeWidth="2" />
            <circle cx="9" cy="9" r="4" fill="#0f8a3c" />
        </svg>
    </div>
);

const NonVegIcon = () => (
    <div className="non-veg-icon">
        <svg width="18" height="18" viewBox="0 0 18 18">
            <rect x="1" y="1" width="16" height="16" rx="2" fill="none" stroke="#b11226" strokeWidth="2" />
            <circle cx="9" cy="9" r="4" fill="#b11226" />
        </svg>
    </div>

);


export { VegIcon, NonVegIcon };
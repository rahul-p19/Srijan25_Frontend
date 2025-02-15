// common.jsx
export function BasicButton({ IconElement, type, text, className, onClick, style, disabled=false }) {
    const handleClick = (e) => {
        if (!onClick || typeof onClick !== "function") {
            console.warn("OnClick not implemented");
            return;
        }
        onClick(e);
    };

    return (
        <button
            type={type || "button"}
            className={`py-1 px-4 font-bold border rounded-md shadow-md ${className}`} 
            onClick={handleClick}
            style={style}
            disabled={disabled}
        >
            {IconElement && <IconElement className="mr-2" />}
            <span>{text}</span>
        </button>
    );
}

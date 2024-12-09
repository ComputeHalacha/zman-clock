import './index.tsx.scss';

type closeButtonProps = { onClick: Function, className?: string };
export default function CloseButton({onClick, className}: closeButtonProps) {
    return (
        <div className={`close-button ${className}`} onClick={() => onClick()}>
            <div className="left-right"></div>
            <div className="right-left"></div>
        </div>
    );
};


import './index.tsx.scss';

type closeButtonProps = { onClick: Function }
export default function CloseButton({onClick}: closeButtonProps) {
    return (
        <div className="close-button" onClick={() => onClick()}>
            <div className="left-right"></div>
            <div className="right-left"></div>
        </div>
    );
};


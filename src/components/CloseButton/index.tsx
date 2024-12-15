import React from "react";
import "./index.tsx.scss";

type closeButtonProps = { onClick: (event: React.MouseEvent<HTMLDivElement>) => void; className?: string };
export default function CloseButton({ onClick, className }: closeButtonProps) {
  return (
    <div className={`close-button ${className}`} onClick={(e) => onClick(e)}>
      <div className="left-right"></div>
      <div className="right-left"></div>
    </div>
  );
}

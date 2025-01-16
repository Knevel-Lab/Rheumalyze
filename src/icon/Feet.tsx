import React from "react";

const FeetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            fill="currentColor"
            {...props}
            width={props.width ?? 12}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
        >
            {/* <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M416 0C352.3 0 256 32 256 32l0 128c48 0 76 16 104 32s56 32 104 32c56.4 0 176-16 176-96S512 0 416 0zM128 96c0 35.3 28.7 64 64 64l32 0 0-128-32 0c-35.3 0-64 28.7-64 64zM288 512c96 0 224-48 224-128s-119.6-96-176-96c-48 0-76 16-104 32s-56 32-104 32l0 128s96.3 32 160 32zM0 416c0 35.3 28.7 64 64 64l32 0 0-128-32 0c-35.3 0-64 28.7-64 64z" />
        </svg>
    );
};

export default FeetIcon;

"use client"

import { useRouter } from "next/navigation";
import React from "react";


type BackButton = React.ComponentProps<"button">

const BackButton = ({...props}: BackButton) => {


    const router = useRouter()
    return (
             <button
             {...props}
          onClick={() => router.back()}
          style={{
            color: "#545F7D",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          ← Back to Users
        </button>
    );
}
 
export default BackButton;
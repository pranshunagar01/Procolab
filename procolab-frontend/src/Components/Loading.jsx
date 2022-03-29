import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Loading.css";

export default function Loading() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
      isLoading && <div className="boxes" style={{position: 'absolute', top: '50%', left: '45%', zIndex: '2'}}>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

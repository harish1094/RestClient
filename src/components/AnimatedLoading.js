import React from "react";
import "../css/animated-loading.css";

/**
 * Customized Loading component
 *
 * This component can be used to show full page loading
 * 
 * Component Renders the Overlayed component with Animated dots.
 *
 *  @returns ```<AnimatedLoader/>``` 
 */
const AnimatedLoader = () => {
    return (
        <div className="overlay-container">
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default AnimatedLoader;
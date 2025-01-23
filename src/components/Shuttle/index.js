import React, { useState } from "react";
import "./shuttle.scss";

const Shuttle = ({ launch }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    // Get the time ago from the launch year
    const getTimeAgo = (year) => {
        const currentYear = new Date().getFullYear();
        const difference = year - currentYear;

        if (difference === 0) {
            return "Launching this year";
        } else if (difference > 0) {
            return `In ${difference} year${difference > 1 ? "s" : ""}`;
        } else {
            return `${Math.abs(difference)} year${
                Math.abs(difference) > 1 ? "s" : ""
            } ago`;
        }
    };

    // Get the launch status
    const getLaunchStatus = (launch) => {
        if (launch.upcoming) {
            return { status: "Upcoming", className: "launchStatus upcoming" };
        } else if (launch.launch_success) {
            return { status: "Success", className: "launchStatus success" };
        } else {
            return { status: "Failed", className: "launchStatus failed" };
        }
    };

    return (
        <div className="shuttle">
            <h2 className="launchName">
                {launch.mission_name}
                <span className={getLaunchStatus(launch).className}>
                    {getLaunchStatus(launch).status}
                </span>
            </h2>
            {detailsVisible && (
                <div className="details">
                    <span>{getTimeAgo(launch.launch_year)}</span>
                    {(launch.links.article_link || launch.links.video_link) && (
                        <span> | </span>
                    )}
                    {launch.links.article_link && (
                        <>
                            <span>
                                <a href={launch.links.article_link}>Article</a>
                            </span>
                            {launch.links.video_link && <span> | </span>}
                        </>
                    )}
                    {launch.links.video_link && (
                        <span>
                            <a href={launch.links.video_link}>Video</a>
                        </span>
                    )}

                    <div className="launch-info">
                        <div className="launch-image">
                            {launch.links.mission_patch ? (
                                <img
                                    src={launch.links.mission_patch}
                                    alt="Mission Patch"
                                    width={100}
                                />
                            ) : (
                                <span>No image yet</span>
                            )}
                        </div>
                        <div className="launch-details">
                            {launch.details ? (
                                <p>{launch.details}</p>
                            ) : (
                                <span>No details yet</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <button type="button" className="btn" onClick={toggleDetails}>
                {detailsVisible ? "HIDE" : "VIEW"}
            </button>
        </div>
    );
};

export default Shuttle;

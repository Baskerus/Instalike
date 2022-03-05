import React, { useState, useEffect } from "react";

function PostTime({ timestamp }) {
  const [postTime, setPostTime] = useState();
  const [time, setTime] = useState(Date.now());

  // Fix this with a component?
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);

    // Calculates post age
    if (timestamp) {
      let postDate = timestamp.toDate();
      let currentDate = Math.round(new Date().getTime() / 1000);
      postDate = Math.round(postDate.getTime() / 1000);
      let dateDiff = currentDate - postDate;

      let h = Math.floor(dateDiff / 3600);
      let m = Math.floor((dateDiff % 3600) / 60);
      /*       let s = Math.floor((dateDiff % 3600) % 60); */

      let hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
      let mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
      // Decided not to use seconds vvv
      // let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

      // Displays the time since post was uploaded
      if (dateDiff < 3600) {
        if (mDisplay < 1) {
          setPostTime("Just a moment ago.");
        } else setPostTime(mDisplay + " ago");
      } else if (h < 24) {
        setPostTime(hDisplay + " ago");
      } else if (h <= 720) {
        let daysAgo = Math.round(h / 24);
        setPostTime(daysAgo + ` day${daysAgo > 1 ? "s" : ""} ago`);
      } else if (h > 720) {
        let options = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        setPostTime(timestamp.toDate().toLocaleDateString("en-GB", options));
      }

      return () => {
        setPostTime();
        setTime(Date.now());
      };
    }
    return () => {
      clearInterval(interval);
    };
  }, [timestamp]);

  return <div className="text-xs text-neutral-400">{postTime}</div>;
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx PROBLEMS WITH LOW BANDWIDTH MOBILE CONNECTION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

export default PostTime;

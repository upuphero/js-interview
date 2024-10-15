import React, { useState, useEffect } from "react";
// Import React and its hooks, `useState` for managing state and `useEffect` for side effects.

function CountdownTimer() {
  // A functional component called `CountdownTimer`.

  const [hours, setHours] = useState("");
  // State variable to store the hours input by the user. Initially empty ('' means no value entered).

  const [minutes, setMinutes] = useState("");
  // State variable to store the minutes input by the user. Initially empty.

  const [seconds, setSeconds] = useState("");
  // State variable to store the seconds input by the user. Initially empty.

  const [timeLeft, setTimeLeft] = useState(null);
  // `timeLeft` keeps track of the total time remaining in seconds. Initially `null` (not started yet).

  const [isRunning, setIsRunning] = useState(false);
  // Boolean state that indicates whether the timer is currently running. Initially `false` (not running).

  const [isPaused, setIsPaused] = useState(false);
  // Boolean state that indicates whether the timer is paused. Initially `false` (not paused).

  // useEffect hook: runs side effects. This one runs the countdown interval when the timer is running and not paused.
  useEffect(() => {
    let timer = null;
    if (isRunning && !isPaused) {
      // If the timer is running and not paused, set up an interval to decrease `timeLeft` every second.
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1; // Decrement `timeLeft` by 1 second.
          } else {
            // If `timeLeft` reaches zero, clear the interval and notify the user.
            clearInterval(timer);
            notifyCompletion();
            return 0; // Ensure the time doesn't go below 0.
          }
        });
      }, 1000); // Run the interval every 1000 milliseconds (1 second).
    }
    return () => clearInterval(timer); // Cleanup: clear the interval when the component unmounts or dependencies change.
  }, [isRunning, isPaused]); // Dependencies: run the effect only when `isRunning` or `isPaused` changes.

  // Function to notify the user when the countdown completes
  const notifyCompletion = () => {
    if (Notification.permission === "granted") {
      // If notification permissions are granted, show a notification.
      new Notification("Countdown Complete!");
    } else {
      // If permission is denied, show an alert instead.
      alert("Countdown Complete!");
    }
  };

  // This function handles starting or resuming the timer
  const handleStart = () => {
    if (timeLeft === null) {
      // If `timeLeft` is null, this is the first time the timer is started. We need to calculate total seconds.
      const totalSeconds =
        parseInt(hours || 0) * 3600 + // Convert hours to seconds. If hours input is empty, treat it as 0.
        parseInt(minutes || 0) * 60 + // Convert minutes to seconds. If empty, treat it as 0.
        parseInt(seconds || 0); // Add seconds directly.
      setTimeLeft(totalSeconds); // Store the total time in seconds in the `timeLeft` state.
    }
    setIsRunning(true); // Mark the timer as running.
    setIsPaused(false); // Make sure it's not paused when starting or resuming.
  };

  // Function to pause the timer
  const handlePause = () => {
    setIsPaused(true); // Set `isPaused` to true to pause the timer.
    setIsRunning(false); // Set `isRunning` to false, which effectively stops the timer.
  };

  // Function to reset the timer to its initial state
  const handleReset = () => {
    setHours(""); // Clear the hours input.
    setMinutes(""); // Clear the minutes input.
    setSeconds(""); // Clear the seconds input.
    setTimeLeft(null); // Reset the `timeLeft` state to null, so the input fields are shown again.
    setIsRunning(false); // Stop the timer.
    setIsPaused(false); // Make sure the timer is not paused.
  };

  // Function to format the time left into a displayable string (HH:MM:SS).
  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, "0"); // Calculate hours and pad it to 2 digits (e.g., 01).
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0"); // Calculate minutes and pad it to 2 digits.
    const secs = String(time % 60).padStart(2, "0"); // Calculate remaining seconds and pad it to 2 digits.
    return `${hrs}:${mins}:${secs}`; // Return the formatted string (HH:MM:SS).
  };

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>

      {timeLeft === null ? (
        // If the timer hasn't started, show the input fields for hours, minutes, and seconds.
        <div>
          <input
            type="number"
            placeholder="HH"
            value={hours}
            onChange={(e) => setHours(e.target.value)} // Update the hours input state when the user types.
          />
          :
          <input
            type="number"
            placeholder="MM"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)} // Update the minutes input state when the user types.
          />
          :
          <input
            type="number"
            placeholder="SS"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)} // Update the seconds input state when the user types.
          />
          <button onClick={handleStart}>Start</button>
          {/* Start button to trigger `handleStart` function. */}
        </div>
      ) : (
        // If the timer is running or paused, display the time left and the buttons for pause and reset.
        <div>
          <span>{formatTime(timeLeft)}</span>
          {/* Display the formatted time left (HH:MM:SS). */}

          <button onClick={isPaused ? handleStart : handlePause}>
            {/* Pause button switches to "Resume" when paused. */}
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button onClick={handleReset}>Reset</button>
          {/* Reset button to trigger `handleReset`. */}
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
// Export the `CountdownTimer` component so it can be used in other parts of the app.

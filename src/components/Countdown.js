import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = ({ seconds,isRunning}) => {
  seconds = seconds+1;
  var minutes = Math.ceil(seconds / 60);
  function getTimeSegmentElements(segmentElement) {
    const segmentDisplay = segmentElement.querySelector(".segment-display");
    const segmentDisplayTop = segmentDisplay.querySelector(
      ".segment-display__top"
    );
    const segmentDisplayBottom = segmentDisplay.querySelector(
      ".segment-display__bottom"
    );

    const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
    const segmentOverlayTop = segmentOverlay.querySelector(
      ".segment-overlay__top"
    );
    const segmentOverlayBottom = segmentOverlay.querySelector(
      ".segment-overlay__bottom"
    );

    return {
      segmentDisplayTop,
      segmentDisplayBottom,
      segmentOverlay,
      segmentOverlayTop,
      segmentOverlayBottom,
    };
  }

  function updateSegmentValues(displayElement, overlayElement, value) {
    displayElement.textContent = value;
    overlayElement.textContent = value;
  }

  function updateTimeSegment(segmentElement, timeValue) {
    const segmentElements = getTimeSegmentElements(segmentElement);

    if (
      parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue
    ) {
      return;
    }

    segmentElements.segmentOverlay.classList.add("flip");

    updateSegmentValues(
      segmentElements.segmentDisplayTop,
      segmentElements.segmentOverlayBottom,
      timeValue
    );

    function finishAnimation() {
      segmentElements.segmentOverlay.classList.remove("flip");
      updateSegmentValues(
        segmentElements.segmentDisplayBottom,
        segmentElements.segmentOverlayTop,
        timeValue
      );

      this.removeEventListener("animationend", finishAnimation);
    }

    segmentElements.segmentOverlay.addEventListener(
      "animationend",
      finishAnimation
    );
  }

  function updateTimeSection(sectionID, timeValue) {
    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const sectionElement = document.getElementById(sectionID);
    const timeSegments = sectionElement.querySelectorAll(".time-segment");

    updateTimeSegment(timeSegments[0], firstNumber);
    updateTimeSegment(timeSegments[1], secondNumber);
  }

  function getTimeRemaining(targetDateTime) {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
      return {
        complete,
        seconds: 0,
        minutes: 0,
        hours: 0,
      };
    }

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
    const hours = Math.floor(secondsRemaining / 60 / 60);
    const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
    const seconds = secondsRemaining % 60;

    return {
      complete,
      seconds,
      minutes,
      hours,
    };
  }

  function updateAllSegments() {
    seconds=seconds-1;
    updateTimeSection("seconds", seconds % 60);
    if (minutes != Math.floor(seconds / 60)) {
      minutes=minutes-1;
      updateTimeSection("minutes", minutes);
    }
    return seconds;
  }
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        const isComplete = updateAllSegments();
        if (isComplete == 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
    } else {
      clearInterval(timer);
      updateAllSegments();
    }
    return () => clearInterval(timer);
  }, [isRunning]);


  return (
    <div class="countdown">
      <div class="time-section" id="minutes">
        <div class="time-group">
          <div class="time-segment">
            <div class="segment-display">
              <div class="segment-display__top"></div>
              <div class="segment-display__bottom"></div>
              <div class="segment-overlay">
                <div class="segment-overlay__top"></div>
                <div class="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div class="time-segment">
            <div class="segment-display">
              <div class="segment-display__top"></div>
              <div class="segment-display__bottom"></div>
              <div class="segment-overlay">
                <div class="segment-overlay__top"></div>
                <div class="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="time-section" id="seconds">
        <div class="time-group">
          <div class="time-segment">
            <div class="segment-display">
              <div class="segment-display__top"></div>
              <div class="segment-display__bottom"></div>
              <div class="segment-overlay">
                <div class="segment-overlay__top"></div>
                <div class="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div class="time-segment">
            <div class="segment-display">
              <div class="segment-display__top"></div>
              <div class="segment-display__bottom"></div>
              <div class="segment-overlay">
                <div class="segment-overlay__top"></div>
                <div class="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Countdown;
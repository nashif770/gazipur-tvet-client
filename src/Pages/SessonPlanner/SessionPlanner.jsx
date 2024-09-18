import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, eachDayOfInterval } from "date-fns";
import * as XLSX from "xlsx";

const SessionPlanner = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [generatedDates, setGeneratedDates] = useState([]);
  const [exceptionDates, setExceptionDates] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [datesSummary, setDatesSummary] = useState(null);
  const [fileData, setFileData] = useState(null);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const generateDates = () => {
    if (startDate && endDate) {
      const daysArray = eachDayOfInterval({
        start: startDate,
        end: endDate,
      }).map((date) => ({
        date: format(date, "yyyy-MM-dd"),
        day: format(date, "EEEE"),
        isExceptionDay: false,
      }));
      setGeneratedDates(daysArray);
    }
  };

  const handleExceptionSelection = (date) => {
    if (exceptionDates.includes(date)) {
      setExceptionDates(exceptionDates.filter((d) => d !== date));
    } else {
      setExceptionDates([...exceptionDates, date]);
    }
  };

  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const applyExceptionDays = () => {
    const updatedDates = generatedDates.map((dateObj) => {
      const isExceptionDay = exceptionDates.includes(dateObj.date);
      return { ...dateObj, isExceptionDay };
    });

    setGeneratedDates(updatedDates);

    // Create a unified summary object that includes all dates
    const datesSummary = updatedDates.map((date) => ({
      date: date.date,
      day: date.day,
      isExceptionDay: date.isExceptionDay,
    }));

    setDatesSummary(datesSummary);
    console.log("Dates Summary:", datesSummary); // Debugging the dates summary
  };
  // const applyExceptionDays = () => {
  //   const updatedDates = generatedDates.map((dateObj) => {
  //     const isExceptionDay = exceptionDates.includes(dateObj.date);
  //     return { ...dateObj, isExceptionDay };
  //   });

  //   setGeneratedDates(updatedDates);

  //   const regularDates = updatedDates.filter((date) => !date.isExceptionDay);
  //   const exceptionDatesSummary = updatedDates.filter(
  //     (date) => date.isExceptionDay
  //   );

  //   const summary = {
  //     regularDates,
  //     exceptionDates: exceptionDatesSummary,
  //   };

  //   setDatesSummary(summary);
  //   console.log("Dates Summary:", summary); // Debugging the dates summary
  // };

  const updateExceptionDatesBasedOnDays = () => {
    const newExceptionDates = generatedDates
      .filter((dateObj) => selectedDays.includes(dateObj.day))
      .map((dateObj) => dateObj.date);
    setExceptionDates([...new Set([...exceptionDates, ...newExceptionDates])]);
  };

  const getBackgroundColor = (isExceptionDay) => {
    return isExceptionDay ? "bg-yellow-200" : "bg-white";
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const dataObjects = jsonData.slice(1).map((row) => {
            const rowData = {};
            row.forEach((cell, index) => {
              rowData[headers[index]] = cell;
            });
            return rowData;
          });
          setFileData(dataObjects);
          // console.log("Excel Data:", dataObjects); // Log extracted data
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // const mergeData = () => {
  //   if (datesSummary && fileData) {
  //     console.log("dates", datesSummary);
  //     console.log("lessons", fileData);
  //     const mergedData = generatedDates.map((dateObj, index) => {
  //       console.log("Merge Data during map", dateObj);
  //     });

  //     console.log("Merged Data:", mergedData); // Log the merged data
  //   }
  // };

  const mergeData = () => {
    console.log("dateSummary", datesSummary, "fileData", fileData);
    const mergedData = [];

    if (datesSummary && fileData) {
      console.log("Merged Data:", mergedData); // Log the merged data
    }
  };

  return (
    <div className="max-w-8xl mx-auto bg-white p-32 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Lesson Plan Configuration</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Select Dates and Manage Exceptions:
        </h2>
        <div className="mb-4">
          <label className="block mb-2">
            Start Date:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mb-2 p-2 border rounded w-full"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a start date"
            />
          </label>
          <label className="block mb-2">
            End Date:
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="mb-2 p-2 border rounded w-full"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select an end date"
              minDate={startDate}
            />
          </label>
          <button
            onClick={generateDates}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Generate Dates
          </button>
        </div>

        {generatedDates.length > 0 && (
          <>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Select Days for Exception:
              </h3>
              <div className="mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDaySelection(day)}
                      className="mr-2"
                    />
                    <span>{day}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={updateExceptionDatesBasedOnDays}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
              >
                Add Selected Days to Exception List
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Select Dates for Exception:
              </h3>
              <ul>
                {generatedDates.map((item, index) => (
                  <li
                    key={index}
                    className={`mb-2 flex items-center ${getBackgroundColor(
                      item.isExceptionDay
                    )}`}
                  >
                    <input
                      type="checkbox"
                      checked={exceptionDates.includes(item.date)}
                      onChange={() => handleExceptionSelection(item.date)}
                      className="mr-2"
                    />
                    {item.date} - {item.day}
                  </li>
                ))}
              </ul>

              <button
                onClick={applyExceptionDays}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Apply Exception Days
              </button>
            </div>
          </>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upload Excel File:</h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mb-4"
          />
        </div>

        <div className="mt-8">
          <button
            onClick={mergeData}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Merge Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPlanner;

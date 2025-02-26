import React from "react";

const Videos = () => {
  // Video Data
  const videoCategories = [
    {
      title: "MS Word - Job 1",
      videos: [
        { name: "Set 1", url: "https://www.youtube.com/embed/Kv7bMZNcDp0" },
        { name: "Set 2", url: "https://www.youtube.com/embed/mlUdvGXfWew" },
        { name: "Set 3", url: "https://www.youtube.com/embed/wyPT9rIgMzQ" },
        { name: "Set 4", url: "https://www.youtube.com/embed/Xs91VQs-vRg" },
        { name: "Set 5", url: "https://www.youtube.com/embed/MsX6qXvMi5k" },
        { name: "Set 6", url: "https://www.youtube.com/embed/pi6Dk8TK6wc" },
      ],
    },
    {
      title: "MS Excel - Job 2",
      videos: [
        { name: "Set 1", url: "https://www.youtube.com/embed/29wHqMJh03A?si=3F10qb0eghy4dgWz" },
        { name: "Set 2", url: "https://www.youtube.com/embed/DY1lL7gFO0Y?si=lYpvaOU-W9YRsnBc" },
        { name: "Set 3", url: "https://www.youtube.com/embed/TjbHEtplo_I?si=laJ5Xn3EYBHdwidY" },
        { name: "Set 4", url: "https://www.youtube.com/embed/7O_oMh0mtXI?si=agqM7OR2ePGwGNxb" },
        { name: "Set 5", url: "https://www.youtube.com/embed/eNkRVYzuvNY" },
      ],
    },
    {
      title: "MS PowerPoint - Job 3",
      videos: [
        { name: "Set 1", url: "https://www.youtube.com/embed/4YPq6F3gFB4" },
        { name: "Set 2", url: "https://www.youtube.com/embed/tRmy2xEXFkM" },
        { name: "Set 3", url: "https://www.youtube.com/embed/jUhc5cYGxts" },
        { name: "Set 4", url: "https://www.youtube.com/embed/YEPf0anvEvY" },
        { name: "Set 5", url: "https://www.youtube.com/embed/4o8m_yiBvS4" },
      ],
    },
    {
      title: "Zoom Meeting - Job 4(B)",
      videos: [{ name: "Zoom Basics", url: "https://www.youtube.com/embed/mcjoZMmK4n0" }],
    },
    {
      title: "Google Form - Job 4(A)",
      videos: [{ name: "Google Forms Tutorial", url: "https://www.youtube.com/embed/lemx0LW7ABY" }],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Video Library</h1>

      {videoCategories.map((category, index) => (
        <div key={index} className="w-full max-w-6xl mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category.title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.videos.map((video, vidIndex) => (
              <div key={vidIndex} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <iframe
                  className="w-full h-56 rounded-lg"
                  src={video.url}
                  title={video.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <p className="text-center mt-2 font-semibold">{video.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;

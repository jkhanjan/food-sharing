import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";
import { foodService } from "../../services/activityServices";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await foodService.getAllFoods();
        setVideos(data.foodItems);
        setError("");
      } catch (err) {
        setError(err.message);
        console.error("Failed to load videos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  async function handleLike(item) {
    try {
      const { isLiked, newCount } = await foodService.toogleLikes(item._id);

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount:
                  newCount || (isLiked ? v.likeCount + 1 : v.likeCount - 1),
              }
            : v
        )
      );
    } catch (err) {
      console.error("Failed to like video:", err);
    }
  }

  // Handle save/unsave
  async function handleSave(item) {
    try {
      const { isSaved, newCount } = await foodService.getSavedFood(item._id);

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount:
                  newCount || (isSaved ? v.savesCount + 1 : v.savesCount - 1),
              }
            : v
        )
      );
    } catch (err) {
      console.error("Failed to save video:", err);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <ReelFeed
      items={videos}
      onLike={handleLike}
      onSave={handleSave}
      emptyMessage="No videos available."
    />
  );
};

export default Home;

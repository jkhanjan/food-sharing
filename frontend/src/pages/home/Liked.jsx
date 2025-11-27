import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Liked = () => {
  const [liked, setLiked] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/like", { withCredentials: true })
      .then((res) => {
        const response = res.data;
        const likedFood = response.likedFood.map((item) => ({
          _id: item.food._id,
          video: item?.food.video,
          description: item?.food?.description,
          likeCount: item?.food.likeCount,
          savesCount: item?.food.savesCount,
        }));
        setLiked(likedFood);
        console.log(likedFood, "likedFood");
      });
  }, []);

  return (
    <div>
      <p>Liked</p>
      <section className="profile-grid" aria-label="Videos">
        {liked &&
          liked.map((v) => (
            <div key={v.id} className="profile-grid-item">
              <video className="profile-grid-video" src={v.video} muted></video>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Liked;

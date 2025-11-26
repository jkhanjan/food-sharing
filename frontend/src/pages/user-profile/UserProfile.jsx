import React, { useEffect, useState } from "react";
import axios from "axios";
import Saved from "../home/Saved";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUserDetails() {
      const response = await axios.get(
        `http://localhost:3000/api/user-profile/me`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    }

    getUserDetails();
  }, []);
  console.log(user, "user");

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img className="profile-avatar" src={user?.profilePic} alt="" />

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">
              {user?.fullName}
            </h1>
            <p className="profile-pill profile-address" title="Address">
              {user?.email}
            </p>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

        <Saved />
    </main>
  );
};

export default UserProfile;

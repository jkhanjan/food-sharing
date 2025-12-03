import Liked from "../home/Liked";
import { useAuth } from "../../context/AuthContext";
const UserProfile = () => {
  const { user } = useAuth();
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
      <Liked />
    </main>
  );
};

export default UserProfile;

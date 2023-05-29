import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../../components/card/Card";

import "./Profile.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";
import PageMenu from "../../components/pageMenu/PageMenu";

const Profile = () => {
  // useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    address: user?.address || {},
  };
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    if (user === {}) {
      dispatch(getUser());
    }
  }, [dispatch, user]);
  // console.log(user);
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        address: user.address || {},
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: profile.name,
        phone: profile.phone,
        address: {
          address: profile.address,
          state: profile.state,
          country: profile.country,
        },
      };
      console.log(userData);

      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && user && (
                <>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address?.address}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>State:</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.address?.state}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Country:</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.address?.country}
                        onChange={handleInputChange}
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return (
    <span style={{ color: "#ff7722" }}>Hi, {shortenText(username, 9)} |</span>
  );
};

export default Profile;

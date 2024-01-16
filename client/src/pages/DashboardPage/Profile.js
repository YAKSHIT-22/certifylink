import React, { useEffect, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import { useAuthStore } from "../../store/masterStore";
import { publicApi } from "../../utils/app.utils";
import toast from "react-hot-toast";

const Profile = () => {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false);
  let { user, setUser } = useAuthStore(state => state);
  useEffect(() => {
    setForm({
      name: user?.name,
      age: user?.age,
      email: user?.email,
      phone: user?.phone,
      bio: user?.bio,
      gender: user?.gender
    })
  }, [user])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileBase(file);
  };
  const setFileBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({ ...form, img: reader.result })
    };
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    publicApi.put("/api/v1/user/update", form)
      .then((res) => {
        setUser(res.data.user);
        setForm({ ...form, img: undefined })
        toast.success("User profile updated successfully🚀");
        e.target.reset();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  };
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-full h-full px-2 flex-col">
          <div className="w-full h-28 border lg:flex hidden border-[#222222] bg-[#181818]"></div>
          <form onSubmit={onSubmit} className="flex w-full lg:max-w-3xl items-center justify-center lg:mt-[-4.25rem]  gap-2 flex-col bg-[#222222] border-[#181818] py-4 px-4 lg:p-4 rounded-md">
            <div className="flex items-center justify-center w-full flex-col">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm font-normal text-white">My Profile</h3>
                <div className="flex flex-col gap-2">
                  <label className="py-1 px-4 flex items-center justify-center bg-[#181818] border-[#222222] text-sm text-white rounded-md">
                    {!form.img &&
                      "Upload Image"
                    }
                    <input hidden type="file" onChange={handleImageChange} multiple={false} id="img" name="img" accept="image/*" />
                    {
                      form.img && <button disabled={loading} type="submit" className="text-xs text-white bg-[#ff0000] w-full px-2 py-1 rounded-md">Save</button>
                    }
                  </label>
                  <span className="text-xs text-white">
                    *upload images upto 10MB
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center p-2">
                <img
                  src={user?.img}
                  alt=""
                  className="w-[4.25rem] h-[4.25rem] object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full text-white flex-col px-6 py-4 md:py-3 lg:py-4  bg-[#181818] border-[#222222] rounded-sm gap-2">
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Name
                </label>
                <input
                  type="text"
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                  placeholder="Your name"
                  name="name"
                  onChange={handleInputChange}
                  value={form.name || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Age
                </label>
                <input
                  type="number"
                  className="flex outline:none bg-transparent text-sm w-full pl-3 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                  placeholder="Your Age"
                  name="age"
                  onChange={handleInputChange}
                  value={form.age || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                  placeholder="Your Phone Number"
                  name="phone"
                  onChange={handleInputChange}
                  value={form.phone || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Gender
                </label>
                <select
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                  name="gender"
                  onChange={handleInputChange}
                  value={form.gender || ""}
                  required
                >
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option className="text-black" value="Male">Male</option>
                  <option className="text-black" value="Female">Female</option>
                  <option className="text-black" value="Other">Other</option>
                </select>
              </div>
              <div className="flex items-start justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full pt-2 items-center justify-start">
                  Bio
                </label>
                <textarea
                  type="text"
                  rows={2}
                  maxLength={100}
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                  placeholder="Your Bio"
                  name="bio"
                  onChange={handleInputChange}
                  value={form.bio || ""}
                  required
                />
              </div>
              <div className="flex items-center w-full justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center text-xs justify-center bg-[#FFC947] text-white font-semibold px-6 rounded-md py-2 md:py-1 lg:py-2 border-2 border-transparent hover:border-2 hover:border-[#FFC947] hover:text-[#FFC947] hover:bg-transparent transition-all duration-500"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Profile;

import Button from "../components/Elements/Button";
import Navbar from "../components/Fragments/Navbar";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem("jwtToken");

      try {
        const response = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setProfileData(data.data);
        setFirstName(data.data.first_name || "");
        setLastName(data.data.last_name || "");
        setEmail(data.data.email || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedData = await response.json();
      setProfileData(updatedData.data);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
      } else {
        alert("Please upload a valid image (JPEG or PNG).");
      }
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return alert("Please select an image to upload.");
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    const token = sessionStorage.getItem("jwtToken");

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedData = await response.json();
      setProfileData(updatedData.data);
      alert("Profile image updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const profileImage =
    profileData?.profile_image ===
    "https://minio.nutech-integrasi.com/take-home-test/null"
      ? "public/images/profile Photo.png"
      : profileData?.profile_image;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center w-auto p-12">
        <div className="w-full max-w-2xl px-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage || "public/images/Profile Photo.png"}
              alt="Profile avatar"
              className="rounded-full w-24 h-24 mb-4"
            />
            <h1 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h1>
          </div>
          <form
            className="space-y-4 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProfile();
            }}
          >
            <div>
              <label className="block text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-envelope text-gray-400 mr-2"></i>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="flex-grow outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Nama Depan</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-user text-gray-400 mr-2"></i>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-grow outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Nama Belakang</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-user text-gray-400 mr-2"></i>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex-grow outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">
                Upload Profile Image
              </label>
              <input
                type="file"
                accept=".jpeg,.png"
                onChange={handleFileChange}
                className="border rounded-md p-2 w-full"
              />
              <Button
                variant="w-full bg-blue-500 text-white py-2 rounded-md mt-2"
                type="button"
                onClick={handleImageUpload}
              >
                Upload Image
              </Button>
            </div>
            <Button
              variant="w-full bg-red-500 text-white py-2 rounded-md"
              type="button"
              onClick={handleUpdateProfile}
            >
              Simpan
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;

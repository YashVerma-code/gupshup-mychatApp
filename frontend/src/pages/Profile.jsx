import React, { useEffect, useState } from "react";
import {
  Camera,
  User,
  Mail,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Profile() {
  const { isUpdatingProfile, authUser, setIsUpdatingProfile, UploadProfile } =
    useAuthStore();
  const [selectedImg, setSelectedImg] = useState(authUser?.profilePic);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSelectedImg(authUser?.profilePic);
  }, [authUser]);
  let base64Img;

  // console.log("Auth User in profile: ", authUser);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
     
      const reader = new FileReader();
      reader.onload = async (e) => {
        base64Img = reader.result;
        setSelectedImg(base64Img);
        console.log("Image : ", base64Img);
      };
      reader.readAsDataURL(file);
    } else return;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await UploadProfile({ profilePic: selectedImg });
    } catch (error) {
      console.log("Error occured",error);
      toast.error("Error",error.data);
    } finally {
      setIsSaving(false);
    }
    setIsUpdatingProfile(false);
  };

  const handleCancel = () => {
    setSelectedImg(null);
    setIsUpdatingProfile(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center p-4 ">
      <div className="w-full h-full flex flex-wrap justify-center items-center relative top-24 mb-10">
        <div className="h-full w-2/3 sm:w-3/4 md:w-5/6 lg:w-1/2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold last-of-type:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-white">
              Manage your account information and preferences
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden ">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>

            {/* Profile Content */}
            <div className="relative px-6 pb-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-6">
                <div className="relative mb-4 sm:mb-0">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                    {(
                      isUpdatingProfile
                        ? selectedImg || authUser?.profilePic
                        : authUser?.profilePic
                    ) ? (
                      <img
                        src={selectedImg || authUser.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>

                  {isUpdatingProfile && (
                    <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex-1 flex justify-end space-x-3">
                  {!isUpdatingProfile ? (
                    <button
                      onClick={() => setIsUpdatingProfile(true)}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2 text-indigo-600" />
                    Full Name
                  </label>

                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                    {authUser?.fullName.toUpperCase()}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                    Email Address
                  </label>

                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                    {authUser?.email}
                  </div>
                </div>

                {/* Active Status */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    Status
                  </label>

                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-green-700 font-medium">Active</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    Member Since
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                    {formatDate(authUser?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Account Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your account has been active for{" "}
                      {Math.floor(
                        (new Date() - new Date(authUser?.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

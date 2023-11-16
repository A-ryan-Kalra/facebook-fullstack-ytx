import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEdit";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        coverImage,
        bio,
      });

      mutateFetchedUser();
      toast.success("Bio updated");

      editModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    editModal,
    mutateFetchedUser,
    username,
    profileImage,
    coverImage,
    bio,
    isLoading,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        label="Upload profile image"
        disabled={isLoading}
        value={profileImage}
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        label="Upload cover image"
        disabled={isLoading}
        value={coverImage}
        onChange={(image) => setCoverImage(image)}
      />
      <input
        type="text"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      submit={onSubmit}
      body={bodyContent}
      disabled={isLoading}
      type="Save"
      label="Edit your profile"
    />
  );
};

export default EditModal;

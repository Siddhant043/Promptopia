"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/profile";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = pathname.split("/profile/")[1];
  const username = searchParams.get("name");

  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (id) fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s profile page`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;

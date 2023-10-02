"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { debounceSearch } from "@utils/debounceSearch";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toString().trim());
  };

  const fetchPosts = async () => {
    if (searchText !== "") {
      const response = await fetch(`/api/prompt`, {
        method: "POST",
        body: JSON.stringify({
          search: searchText,
        }),
      });
      const data = await response.json();
      setPosts(data);
    } else {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }
  };
  const debouncedFetchPosts = debounceSearch(() => {
    fetchPosts();
    setDebounceTimer(null); // Clear the debounce timer
  }, 300);

  const handleTagClick = (tagValue) => {
    setSearchText(tagValue);
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set a new debounce timer
    const timer = setTimeout(() => {
      debouncedFetchPosts();
    }, 300);

    // Store the timer ID
    setDebounceTimer(timer);

    // Clean up the previous timer when the component unmounts
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;

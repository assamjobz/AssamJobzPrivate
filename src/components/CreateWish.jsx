
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CirclePicker } from 'react-color';
import EmojiPicker from 'emoji-picker-react';
import { format } from 'date-fns';

const BIRTHDAY_TEMPLATES = [
  "Wishing you a day filled with happiness and a year filled with joy!",
  "Hope your special day brings you all that your heart desires!",
  "Here's to another year of laughing together!",
  "May your birthday be as special as you are!",
];

const GIFT_SUGGESTIONS = [
  { name: "Custom Photo Album", emoji: "📸" },
  { name: "Birthday Cake", emoji: "🎂" },
  { name: "Gift Card", emoji: "💳" },
  { name: "Flowers", emoji: "💐" },
];

function CreateWish() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("#FF6B6B");
  const [selectedMusic, setSelectedMusic] = useState("birthday-song");
  const [photo, setPhoto] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [birthdayDate, setBirthdayDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showGiftSuggestions, setShowGiftSuggestions] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleTemplateSelect = (template) => {
    setMessage(template);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name",
        variant: "destructive",
      });
      return;
    }

    const wishData = {
      name: encodeURIComponent(name),
      message: encodeURIComponent(message),
      theme,
      music: selectedMusic,
      photo,
      birthdayDate,
    };

    const wishUrl = `${window.location.origin}/wish/${btoa(JSON.stringify(wishData))}`;
    navigator.clipboard.writeText(wishUrl);
    toast({
      title: "Success!",
      description: "Birthday wish link copied to clipboard!",
    });
    navigate(`/wish/${btoa(JSON.stringify(wishData))}`);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen py-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Create Birthday Wish
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter birthday person's name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday message..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-2 bottom-2 text-white hover:text-white/80"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute right-0 bottom-full z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                Message Templates
              </label>
              <div className="grid gap-2">
                {BIRTHDAY_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className="text-left p-2 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                Birthday Date
              </label>
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-white text-sm font-medium mb-2">
              Choose Theme Color
            </label>
            <CirclePicker
              color={theme}
              onChange={(color) => setTheme(color.hex)}
              className="flex justify-center"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-white text-sm font-medium mb-2">
              Choose Music
            </label>
            <select
              value={selectedMusic}
              onChange={(e) => setSelectedMusic(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="birthday-song">Happy Birthday Song</option>
              <option value="party-music">Party Music</option>
              <option value="classical">Classical Celebration</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-white text-sm font-medium mb-2">
              Upload Photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowGiftSuggestions(!showGiftSuggestions)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              View Gift Suggestions
            </button>
            {showGiftSuggestions && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {GIFT_SUGGESTIONS.map((gift, index) => (
                  <div
                    key={index}
                    className="p-2 rounded bg-white/10 text-white text-center"
                  >
                    <div className="text-2xl">{gift.emoji}</div>
                    <div className="text-sm">{gift.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-purple-600 hover:bg-white/90 transform hover:scale-105 transition-all duration-200"
          >
            Generate Wish Link
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateWish;

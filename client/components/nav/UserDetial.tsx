"use client";

import React from "react";
import { AtSign, Mail } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserDetailProps {
  isUser: boolean;
  data?: {
    _id?: string;
    name?: string | null;
    username?: string;
    email?: string | null;
    image?: string | null;
  };
}

const UserDetail: React.FC<UserDetailProps> = ({ isUser, data }) => {
  if (!isUser) return null;

  return (
    <div className="absolute top-16 right-5 w-64 rounded-lg bg-white dark:bg-neutral-900 text-white shadow-lg border border-neutral-300 dark:border-neutral-800  z-50">
      <div className="p-4 space-y-4">
        {/* Avatar */}
        {/* <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <User className="h-8 w-8 text-neutral-400" />
          </div>
        </div> */}

        {/* User Info */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            {data?.name || "Guest"}
          </h3>

          {data?.username && (
            <div className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
              <AtSign className="h-3.5 w-3.5" />
              <span>{data.username}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
            <Mail className="h-3.5 w-3.5" />
            <span>{data?.email || "N/A"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <a
            href="/saved-thumbnails"
            className="block w-full text-center rounded-md bg-neutral-800 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 hover:bg-neutral-700 transition px-4 py-2 text-sm font-medium"
          >
            View Saved Thumbnails
          </a>

          <button
            onClick={() => signOut()}
            className="w-full rounded-md shadow-lg border-t bg-white dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 text-neutral-900 hover:bg-neutral-100 transition px-4 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

"use client";

import { useUser } from "@clerk/nextjs";

function ProfileUser() {
  const { user } = useUser();
  const imageUrl = user?.imageUrl;

  const loadingImage = (
    <div className="mb-[5px] h-9 w-9 rounded-full bg-slate-200"></div>
  );

  const loadingUserName = (
    <span className="h-4 w-[100px] bg-slate-100 font-semibold"></span>
  );
  const loadingUserEmail = (
    <span className="h-2 w-[130px] bg-slate-100 text-[11px] text-slate-500"></span>
  );

  return (
    <div className="flex items-center gap-3">
      {!user ? (
        loadingImage
      ) : (
        <img
          src={imageUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="mb-[5px] h-9 w-9 rounded-full"
        />
      )}

      <div
        className={`flex flex-col text-sm max-md:hidden ${!user ? "gap-1" : ""}`}
      >
        {!user ? (
          loadingUserName
        ) : (
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        )}

        {!user ? (
          loadingUserEmail
        ) : (
          <span className="text-[11px] text-slate-500">
            {user?.emailAddresses[0].emailAddress}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProfileUser;

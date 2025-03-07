
export const SkeletonPostsLoading = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-[--second-DarkMidnight] rounded-lg p-4 mb-6 animate-pulse">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                    </div> 
                </div>
                <div className="h-8 w-24 bg-gray-700 rounded"></div>
            </div>

            <div className="mb-4">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            </div>
            <div className="flex items-center">
                <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
            </div>
       </div>
      ))}
    </>
);


export const SkeletonNewPost = () => (
    <>
    <div className="h-4 bg-gray-700 rounded w-28 mb-2"></div>
    {[...Array(5)].map((_, index) => (
    <div key={index} className="flex gap-2 animate-pulse">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
    </div>
    ))}
    </>
);


{/* Profile skeleton */}
export const ProfileSkeleton = () => {
    return (
      <div className="px-4">
        <div className="relative">
          <div className="absolute -top-16">
            {/* Profile image skeleton */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13] bg-gray-700 animate-pulse" />
          </div>
          <div className="flex justify-end py-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
          </div>
        </div>
        <div className="mt-8">
          <div className="space-y-1">
            <div className="h-7 w-48 bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
            <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="mt-3">
            {/* Posts count skeleton */}
            <div className="h-5 w-24 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  };
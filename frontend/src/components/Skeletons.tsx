export const BlogsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 felx justify-center mx-28">
      <div className="mx-96">
        <div className="flex justify-start ml-8">
          <div className="flex justify-start">
            <div className="bg-gray-500 h-14 w-14 rounded-full mr-2"></div>
            <div className="bg-gray-500 h-12 w-40 rounded mt-1"></div>
          </div>
        </div>
        <div className="bg-gray-500 h-8 w-full rounded m-8"></div>
        <div className="bg-gray-500 h-4 w-full rounded m-8"></div>
        <div className="bg-gray-500 h-4 w-full rounded m-8"></div>
      </div>
    </div>
  );
};

export const AppbarSkeleton = () => {
  return (
    <div className="animate-pulse mx-96 mb-16 mt-10">
      <div className="flex justify-between items-center">
        <div className="bg-gray-500 h-12 w-40 rounded"></div>
        <div className="flex">
          <div className="bg-gray-500 h-8 w-20 rounded mt-3 mx-4"></div>
          <div className="bg-gray-500 h-8 w-20 rounded mt-3 mx-8"></div>
          <div className="bg-gray-500 h-14 w-14 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const BlogSkeleton = () => {
  return (
    <div className="animate-pulse mt-10 flex justify-center mx-80 p-4">
      <div className="w-full">
        <div className="bg-white p-6">
          <div className="text-3xl font-bold mb-4 bg-gray-500 h-14 w-full rounded"></div>
          <div className="text-3xl font-bold mb-4 bg-gray-500 h-4 w-60 rounded"></div>
          <div className="text-3xl font-bold mb-4 bg-gray-500 h-4 w-full rounded"></div>
          <div className="text-3xl font-bold mb-4 bg-gray-500 h-4 w-full rounded"></div>
        </div>
      </div>
      <div className="w-96">
        <div className="bg-gray-500 h-8 w-36 rounded p-6 mt-6"></div>
        <div className="flex justify-start align-center">
          <div className="bg-gray-500 h-8 w-8 rounded-full mt-4 ml-2"></div>
          <div className="bg-gray-500 h-8 w-36 rounded mt-4 ml-2"></div>
        </div>
        <div className="bg-gray-500 h-6 w-64 rounded mt-4 ml-2"></div>
        <div className="bg-gray-500 h-6 w-64 rounded mt-4 ml-2"></div>
      </div>
    </div>
  );
};

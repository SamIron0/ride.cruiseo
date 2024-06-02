export function GridSkeleton() {
  return (
    <div
      className="
          py-[198px]
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-7
        "
    >
      {[...Array(9)].map((_, index) => (
        <div key={index} className="col-span-1 cursor-pointer group">
          <div className="flex flex-col gap-2 w-full">
            <div
              className="
                  aspect-square 
                  relative 
                  overflow-hidden 
                  rounded-xl
                  w-full
                  h-[130px]
                  border-[1px]
                  border-[#232325]
                  bg-background
                "
            >
              <div className="w-full h-full bg-background rounded-xl" />
            </div>

            <div className="flex flex-col gap-2">
              <p className="block text-sm font-sans antialiased font-semibold leading-relaxed text-inherit">
                <div className="h-4 bg-gray-200 rounded-md" />
              </p>
              <p className="block text-sm font-sans antialiased font-light leading-relaxed text-inherit">
                <div className="h-4 bg-gray-200 rounded-md" />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

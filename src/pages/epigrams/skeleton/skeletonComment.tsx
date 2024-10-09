export default function SkeletonComment() {
  return (
    <div className='animate-pulse'>
      <div className='flex w-fit border-t-1 border-solid border-zinc-300 px-24 pb-24 pt-16 md:pt-24 xl:pt-35'>
        <div className='mb-auto mr-16 h-48 w-48 rounded-full bg-zinc-200'></div>
        <div>
          <div className='mb-8 h-18 w-114 rounded-lg bg-zinc-200 md:mb-12 md:h-24 md:w-131 xl:mb-16 xl:h-26 xl:w-148'></div>
          <div className='h-30 w-248 rounded-lg bg-zinc-200 md:h-40 md:w-272 xl:h-64 xl:w-528'></div>
        </div>
      </div>
    </div>
  );
}

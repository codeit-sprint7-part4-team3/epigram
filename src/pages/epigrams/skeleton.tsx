export function SkeletonCard() {
  return (
    <div className='flex-center'>
      <div className='mb-10 animate-pulse'>
        <div className='mb-8 h-314 w-120 rounded-2xl bg-zinc-200 md:h-146 md:w-384 xl:h-148 xl:w-640'></div>
        <div className='ml-auto h-24 w-111 rounded-2xl bg-zinc-200 md:h-26 md:w-126 xl:h-40 xl:w-189'></div>
      </div>
    </div>
  );
}

export function SkeletonComment() {
  return (
    <div className='flex-center animate-pulse'>
      <div className='flex w-fit border-t-1 border-solid border-zinc-300 pt-35'>
        <div className='mb-auto mr-16 h-48 w-48 rounded-full bg-zinc-200'></div>
        <div>
          <div className='mb-16 h-26 w-148 rounded-lg bg-zinc-200'></div>
          <div className='h-64 w-528 rounded-lg bg-zinc-200'></div>
        </div>
      </div>
    </div>
  );
}

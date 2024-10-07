export default function SkeletonCard() {
  return (
    <div className='flex-center bg-background-100'>
      <div className='animate-pulse'>
        <div className='h-180 w-294 rounded-2xl bg-zinc-200 xl:h-259 xl:w-585'></div>
        <div className='flex gap-x-5'>
          <div className='ml-auto mt-8 h-26 w-97 rounded-xl bg-zinc-200 xl:h-40 xl:w-146'></div>
        </div>
      </div>
    </div>
  );
}

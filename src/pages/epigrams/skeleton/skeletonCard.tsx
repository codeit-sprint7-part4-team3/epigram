export default function SkeletonCard() {
  return (
    <div className='flex'>
      <div className='mb-10 animate-pulse'>
        <div className='mb-8 h-120 w-314 rounded-2xl bg-zinc-200 md:h-130 md:w-384 xl:h-148 xl:w-640'></div>
        <div className='ml-auto h-24 w-111 rounded-2xl bg-zinc-200 md:h-26 md:w-126 xl:h-40 xl:w-189'></div>
      </div>
    </div>
  );
}

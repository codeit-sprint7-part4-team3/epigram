import { useRouter } from 'next/router';
import React from 'react';

export default function SectionContainer({
  title,
  children,
}: SectionContainerProps) {
  const router = useRouter();
  const { pathname } = router;
  const xlGap = pathname === '/MyPage' ? 'xl:gap-48' : 'xl:gap-40';

  const childrenArray = React.Children.toArray(children);

  const [firstChild, ...restChildren] = childrenArray;

  const addOn =
    React.isValidElement(firstChild) &&
    typeof firstChild.type === 'function' &&
    (firstChild.type as any).name === 'TitleAddOn'
      ? firstChild
      : null;

  return (
    <section
      className={`flex flex-col justify-between items-center gap-24 ${xlGap} w-312 md:w-384 xl:w-640`}
    >
      <div className='flex justify-between items-center w-full'>
        <h2 className='font-primary text-16 leading-26 font-semibold xl:text-24 xl:leading-32'>
          {title}
        </h2>
        {addOn}
      </div>
      {addOn ? restChildren : childrenArray}
    </section>
  );
}

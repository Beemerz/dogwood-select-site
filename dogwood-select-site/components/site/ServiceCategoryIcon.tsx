import Image from 'next/image';

type IconName = 'landscape' | 'wash' | 'curb' | 'outdoor' | 'property';

const iconSources: Record<IconName, string> = {
  landscape: '/service-icons/landscape-care.png',
  wash: '/service-icons/wash-restore.png',
  curb: '/service-icons/curb-appeal.png',
  outdoor: '/service-icons/outdoor-living.png',
  property: '/service-icons/property-support.png',
};

export default function ServiceCategoryIcon({
  name,
  className = '',
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <span className={`service-icon ${className}`.trim()} aria-hidden="true">
      <Image
        src={iconSources[name]}
        alt=""
        width={88}
        height={88}
        unoptimized
        className="h-full w-full rounded-[10px] object-contain"
      />
    </span>
  );
}

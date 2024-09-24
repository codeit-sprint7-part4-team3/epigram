interface UserIconProps {
  imageSource: string | null;
  styles?: string;
}

export default function UserIcon({ imageSource, styles }: UserIconProps) {
  return <img className={styles} src={imageSource || ''} alt='User Icon' />;
}

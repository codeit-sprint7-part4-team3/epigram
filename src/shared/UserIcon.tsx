interface UserIconProps {
  imageSource: string;
  styles?: string;
}
export default function UserIcon({ imageSource, styles }: UserIconProps) {
  return <img className={styles} src={imageSource}></img>;
}

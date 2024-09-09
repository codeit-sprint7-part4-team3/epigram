interface SectionContainerProps {
  title: string;
  children: ReactNode;
}

interface TitleAddOnProps {
  type: 'date' | 'filterAndButtonSet' | 'deleteAll';
  filterEvent?: () => void;
  buttonSetLeftEvent?: () => void;
  buttonSetRightEvent?: () => void;
  deleteAllEvent?: () => void;
}

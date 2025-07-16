interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

interface CodeLanguageCounterType {
  language: string;
  count: number;
}

interface DarkModeType {
  id: number;
  icon: React.ReactNode;
  isSelected: boolean;
}

interface SingleTagType {
  _id: string;
  clerkUserId: string;
  name: string;
}

interface SingleNoteType {
  _id: string;
  clerkUserId: string;
  title: string;
  isFavorite: boolean;
  tags: SingleTagType[];
  description: string;
  code: string;
  language: string;
  creationDate: string;
  isTrash: boolean;
}

interface SingleCodeLanguageType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

export interface CodeLanguageCounterType {
  language: string;
  count: number;
}

export interface DarkModeType {
  id: number;
  icon: React.ReactNode;
  isSelected: boolean;
}

export interface SingleTagType {
  _id: string;
  clerkUserId: string;
  name: string;
}

export interface SingleNoteType {
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

export interface SingleCodeLanguageType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

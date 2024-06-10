// * Connection types /
export type RecordTypeString<T extends string> = Record<T, string>;
// export type RecordTypeString<U extends string> = { [K in U]: string };
export type RecordTypeNumber<T extends string> = Record<T, number>;
export type RecordTypeBoolean<T extends string> = Record<T, boolean>;

type sharedType = "id" | "createdAt" | "updatedAt";
export type ConnectionsSharedType = RecordTypeString<sharedType>;

export type image = "id" | "url";
export type Image = RecordTypeString<image>;

type user = "name" | "alias" | "email" | "image" | "birth" | "phone" | "bio" | "resume";
export type User = RecordTypeString<user> & ConnectionsSharedType;
export interface UserProps {
  user: User;
}

type hobby = "name" | "description" | "imageUrl";
export type Hobby = RecordTypeString<hobby> & ConnectionsSharedType;
export interface HobbyProps {
  hoby: Hobby;
}

type education = "school" | "registered" | "graduated" | "notes" | "siteUrl" | "imageUrl";
export type Education = RecordTypeString<education> & ConnectionsSharedType;
export interface EducationProps {
  education: Education;
}

type career = "name" | "provider" | "entity" | "position" | "department" | "description" | "siteUrl" | "imageUrl";
export type Career = RecordTypeString<career> & ConnectionsSharedType;
export interface CareerProps {
  career: Career;
}

type socmed = "siteName" | "siteUrl" | "imageUrl";
export type Socmed = RecordTypeString<socmed> & ConnectionsSharedType;
export interface SocmedProps {
  socmed: Socmed;
}

type address = "country" | "province" | "zipcode" | "city" | "regency" | "district" | "subdistrict" | "village";
export type Address = RecordTypeString<address> & ConnectionsSharedType;
export interface AddressProps {
  address: Address;
}

type shortPost = "title" | "subtitle" | "imageUrl" | "description";
export type ShortPost = RecordTypeString<shortPost> & {};

export type ImageTypes = {
  image: Image;
};

type billboard = "id" | "label" | "imageUrl";
export type Billboard = RecordTypeString<billboard> & ConnectionsSharedType;
export interface BillboardProps {
  billboard: Billboard;
}
export type BillboardTypes = BillboardProps;

type category = "id" | "name" | "imageUrl";
export type Category = RecordTypeString<category> & { billboard: Billboard } & ConnectionsSharedType;
export interface CategoryProps {
  category: Category;
}
export type CategoryTypes = CategoryProps;

type match = "id" | "name" | "imageUrl";
export type Match = RecordTypeString<match> & { value: Category } & ConnectionsSharedType;
export interface MatchProps {
  match: Match;
}
export type MatchTypes = MatchProps;

type equal = "id" | "name" | "imageUrl";
export type Equal = RecordTypeString<equal> & { value: Category } & ConnectionsSharedType;

type clients = "url" | "name" | "imageUrl";
export type Clients = RecordTypeString<clients>;
export interface EqualProps {
  equal: Equal;
}
export type EqualTypes = EqualProps;

type params = "slug" | "title" | "subtitle" | "notes";
export type Params = RecordTypeString<params> & { contents: Content[]; isNew?: boolean } & ConnectionsSharedType;
export interface ParamsProps {
  params: Params;
}
export type ParamsPageTypes = {
  data: Params | undefined;
};
export type Content = RecordTypeString<"id" | "section"> & ConnectionsSharedType;
export interface ContentsProps {
  contents: Content[] | undefined;
}

type blog = "title" | "description";
export type Blog = RecordTypeString<blog> & {
  images?: Image[];
  category?: Category;
  match: Match;
  equal?: Equal;
} & ConnectionsSharedType;
export interface BlogProps {
  blog: Blog;
}
export type BlogPageTypes = {
  data: Blog | undefined;
};

type event_B = "isNew" | "isFeatured" | "isArchived";
type event_N = "price" | "quantity";
export type Event = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  notes?: string | null;
  images?: Image[];
  blog?: Blog;
  category?: Category;
  match: Match;
  equal?: Equal;
} & RecordTypeBoolean<event_B> &
  RecordTypeNumber<event_N> &
  ConnectionsSharedType;

export type Events =
  | ({
      slug: string;
      title: string;
      notes?: string | null;
      images?: { url: string }[] | null;
      blog?: { id?: string | null; title: string | null } | null;
      equalId?: string | null;
      matchId?: string | null;
      categoryId?: string | null;
    } & RecordTypeBoolean<event_B> &
      RecordTypeNumber<event_N> &
      ConnectionsSharedType)
  | null;

export interface Props {
  event: Event;
}

export type PageEventIdTypes = {
  event: Event | undefined;
};

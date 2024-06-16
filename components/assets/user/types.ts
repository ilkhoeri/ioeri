export type RecordTypeString<T extends string> = Record<T, string>;
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


export type ImageTypes = {
  image: Image;
};

type billboard = "id" | "label" | "imageUrl";
export type Billboard = RecordTypeString<billboard> & ConnectionsSharedType;
export interface BillboardProps {
  billboard: Billboard;
}
export type BillboardTypes = BillboardProps;


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
} & ConnectionsSharedType;
export interface BlogProps {
  blog: Blog;
}
export type BlogPageTypes = {
  data: Blog | undefined;
};

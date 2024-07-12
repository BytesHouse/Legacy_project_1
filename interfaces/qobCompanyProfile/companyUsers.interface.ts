
export interface CompanyUsersInterface {
    id: number;
    displayName: string;
    firstName: string;
    lastName: string;
    gender?: any;
    position: string;
    department: string;
    imageId: string;
    headerImageId?: any;
    preferredLanguage: string;
    spokenLanguages: string[];
}
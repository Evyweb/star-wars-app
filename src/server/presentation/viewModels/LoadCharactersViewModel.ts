export interface LoadCharactersViewModel {
    loadingMessage: string;
    errorMessage: string;
    initialData: {
        characters: {
            id: string;
            name: string;
            description: string;
            loadedFrom: string;
        }[]
    }
}
import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";
import {
    GetCharactersUseCaseResponse
} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export const GetCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: GetCharactersViewModel = {
        characters: []
    };

    return {
        present({characters}: GetCharactersUseCaseResponse): void {
            viewModel.characters = characters.map(character => ({
                id: character.id,
                name: `[UPDATED VALUE] ${character.name}`,
                species: character.species,
                homeworld: character.homeworld
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}
import {createContainer, InjectionTokens} from "@evyweb/ioctopus";
import {InMemoryCharacterRepository} from "@/src/server/infrastructure/InMemoryCharacterRepository";
import {GetCharactersUseCase} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCase";
import {UuidIdentityProvider} from "@/src/server/infrastructure/UuidIdentityProvider";
import {CreateCharacterUseCase} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {IGetCharactersUseCase} from "@/src/server/application/ports/IGetCharactersUseCase";
import {IIdentityProvider} from "@/src/server/application/ports/IIdentityProvider";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/ICreateCharacterUseCase";
import {
    CreateCharacterController,
    ICreateCharacterController
} from "@/src/server/presentation/controllers/CreateCharacterController";
import {
    GetCharactersController,
    IGetCharactersController
} from "@/src/server/presentation/controllers/GetCharactersController";

const DI_SYMBOLS: InjectionTokens = {
    CHARACTER_REPOSITORY: Symbol('CHARACTER_REPOSITORY'),
    GET_CHARACTERS_USE_CASE: Symbol('GET_CHARACTERS_USE_CASE'),
    IDENTITY_PROVIDER: Symbol('IDENTITY_PROVIDER'),
    CREATE_CHARACTER_USE_CASE: Symbol('CREATE_CHARACTER_USE_CASE'),
    CREATE_CHARACTER_CONTROLLER: Symbol('CREATE_CHARACTER_CONTROLLER'),
    GET_CHARACTERS_CONTROLLER: Symbol('GET_CHARACTERS_CONTROLLER'),
}

type DI_RETURN_TYPES = {
    CHARACTER_REPOSITORY: ICharacterRepository,
    GET_CHARACTERS_USE_CASE: IGetCharactersUseCase,
    IDENTITY_PROVIDER: IIdentityProvider,
    CREATE_CHARACTER_USE_CASE: ICreateCharacterUseCase,
    CREATE_CHARACTER_CONTROLLER: ICreateCharacterController,
    GET_CHARACTERS_CONTROLLER: IGetCharactersController,
}

const container = createContainer();

container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toHigherOrderFunction(InMemoryCharacterRepository);
container.bind(DI_SYMBOLS.GET_CHARACTERS_USE_CASE).toHigherOrderFunction(GetCharactersUseCase, {
    characterRepository: DI_SYMBOLS.CHARACTER_REPOSITORY
});
container.bind(DI_SYMBOLS.IDENTITY_PROVIDER).toHigherOrderFunction(UuidIdentityProvider);
container.bind(DI_SYMBOLS.CREATE_CHARACTER_USE_CASE).toHigherOrderFunction(CreateCharacterUseCase, {
    characterRepository: DI_SYMBOLS.CHARACTER_REPOSITORY,
    identityProvider: DI_SYMBOLS.IDENTITY_PROVIDER
});
container.bind(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER).toHigherOrderFunction(CreateCharacterController, {
    createCharacterUseCase: DI_SYMBOLS.CREATE_CHARACTER_USE_CASE
});
container.bind(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER).toHigherOrderFunction(GetCharactersController, {
    getCharactersUseCase: DI_SYMBOLS.GET_CHARACTERS_USE_CASE
});

export function inject<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): K extends keyof DI_RETURN_TYPES ? DI_RETURN_TYPES[K] : never {
    return container.get(DI_SYMBOLS[symbol]);
}
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default function generateRandomName() {
    const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
    });

    return shortName
}
import type { CardProperties } from "./types/types";

const generateDeck = (): CardProperties[] => {
    const suits = [
        {
            label: "Hearts",
            icon: "♥"
        },
        {
            label: "Diamonds",
            icon: "♦"
        },
        {
            label: "Spades",
            icon: "♣"
        },
        {
            label: "Clubs",
            icon: "♠"
        },
    ]
    const ranks = ["Ace", "King", "Queen", "Jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
    const newDeck: CardProperties[] = [];
    suits.forEach((suit) => {
        ranks.forEach((rank => {
            newDeck.push({
                id: `${rank}-${suit.icon}`,
                ...{ suit },
                ...{ rank },
                label: `${rank} of ${suit.icon}`
            });
        }))
    })
    return newDeck;
}

const shuffleDeck = (array: CardProperties[]): CardProperties[] => {
    const copy = []
    let n = array.length
    let i: number;

    // While there remain elements to shuffle…
    while (n) {
        // Pick a remaining element...
        i = Math.floor(Math.random() * n--);
        // And move it to the new array.
        // array splice to remove item from index i
        // reiterates through array now with the previous iteration removed.
        copy.push(array.splice(i, 1)[0]);

    }
    return copy;
}

export {
    generateDeck, shuffleDeck
}
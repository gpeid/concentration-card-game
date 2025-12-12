export interface CardProperties {
    id: string;
    // Add other card properties based on your generateDeck() output
    suit?: { label: string; icon: string };
    rank?: string;
    label?: string
}

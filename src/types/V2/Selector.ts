interface Selector {
    "@type": string;
    value?: string;
    item?: Selector;
    default?: Selector;
};

export { Selector };

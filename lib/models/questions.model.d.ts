interface Questions {
    type: string;
    name: string;
    gitpod?: any;
    message?: string;
    validate?: any;
    default?: any;
    choices?: Choices[];
}
interface Choices {
    name: string;
    value: Templates;
}

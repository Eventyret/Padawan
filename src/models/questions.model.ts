interface Questions {
type: string;
name: string;
message?: string;
validate?: any;
default?: any;
choices?: Choices[];
gitpod?: boolean;
}

interface Choices {
	name: string;
	value: Templates
}
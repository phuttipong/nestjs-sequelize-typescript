export default class DomainError extends Error {
    [key: string]: any;

    constructor(message: string, extensions?: Record<string, any>) {
        super(message);
        if (!this.name) {
            Object.defineProperty(this, 'name', { value: 'DomainError' });
        }
        if (extensions) {
            Object.keys(extensions)
                .filter(
                    keyName =>
                        keyName !== 'message' && keyName !== 'extensions',
                )
                .forEach(key => {
                    this[key] = extensions[key];
                });
        }
    }

    public toLogError() {
        if (Object.keys(this).length > 0) {
            return `${this.message} Because : ${JSON.stringify(this)}`;
        }
        return `${this.message} Because : ${this.stack}`;
    }
}

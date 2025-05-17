class DataValidator {
    static str(value, fileName) {
        if (typeof value !== "string") throw new Error(`${fileName} must be a string`);
        if (value.length < 3) throw new Error(`${fileName} must be at least 3 characters long`);
        if (value.trim() === "") throw new Error(`${fileName} cannot be empty`);
        if (!/^[a-zA-Z]+$/.test(value)) throw new Error(`${fileName} must contain only letters`);
    }
    static email(value) {
        if (typeof value !== "string") throw new Error("Email must be a string");
        if (value.trim() === "") throw new Error("Email cannot be empty");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Invalid email format");
    }
    static password(value) {
        if (typeof value !== "string") throw new Error("Password must be a string");
        if (value.length < 6) throw new Error("Password must be at least 6 characters long");
        if (value.trim() === "") throw new Error("Password cannot be empty");
        // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)) throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
    }
    static number(value, fileName) {
        if (value == null) throw new Error(`${fileName} is required`);
        if (typeof value !== "number") throw new Error(`${fileName} must be a number`);
        if (isNaN(value)) throw new Error(`${fileName} must be a valid number`);
        if (value < 0) throw new Error(`${fileName} must be a positive number`);

    }
}

export default DataValidator;